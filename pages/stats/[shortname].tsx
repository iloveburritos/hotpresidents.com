// pages/stats/[shortname].tsx
import React, {useEffect, useState} from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import PresidentCard from '../../components/PresidentCard';
import StatsDisplay from '../../components/StatsDisplay';
import { fetchPresidents, fetchPresidentShortname, fetchRandomPresident } from '../../lib/presidents';
import { President } from '../../models/presidents';
import { useRouter } from 'next/router';
import { usePrefetch } from '@/hooks/usePrefetch';

interface StatsPageProps {
    president: President;
}

const StatsPage: React.FC<StatsPageProps> = ({ president }) => {
    const {setPrefetchedData} = usePrefetch(); 
    const router = useRouter();
    const [nextPresident, setNextPresident] = useState<President | null>(null);

    useEffect(() => {
        const next = fetchRandomPresident(president.id);
        setNextPresident(next);
    }, [president.id]);

    useEffect(() => {
        if (!nextPresident) return;

        const prefetchNextStats = async () => {
          const res = await fetch(`/api/stats?id=${nextPresident.id}`);
          const data = await res.json();
          setPrefetchedData(prev => ({
            ...prev,
            [nextPresident.id]: data
          }));
        };
    
        prefetchNextStats();
    }, [nextPresident, setPrefetchedData]);

    useEffect(() => {
        if (nextPresident?.imageURL) {
            const img = new Image();
            img.src = nextPresident.imageURL;
        }
    }, [nextPresident]);

    useEffect(() => {
        if (nextPresident?.shortname) {
            router.prefetch(`/vote/${nextPresident.shortname}`);
        }
    }, [nextPresident, router]);

    const handleNextClick = () => {
        if (nextPresident?.shortname) {
            router.push(`/vote/${nextPresident.shortname}`);
        }
    };

    return (
        <Layout>
            {president && (
                <>
                    <PresidentCard president={president} />
                    <StatsDisplay president={president} onNextClick={handleNextClick} />
                </>
            )}
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const presidents = fetchPresidents();
    const paths = presidents.map((president) => ({
        params: { shortname: president.shortname },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const shortname = context.params?.shortname as string;
    const president = fetchPresidentShortname(shortname);

    if (!president) {
        return { notFound: true };
    }

    return {
        props: {
            president,
        },
    };
};

export default StatsPage;
