// pages/stats/[shortname].tsx
import React, {useEffect} from 'react';
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
    nextPresident: President;
}

const StatsPage: React.FC<StatsPageProps> = ({ president, nextPresident }) => {
    const {setPrefetchedData} = usePrefetch(); 

    useEffect(() => {
        const prefetchNextStats = async () => {
          const res = await fetch(`/api/stats?id=${nextPresident.id}`)
          const data = await res.json()
          setPrefetchedData(prevData => ({
            ...prevData,
            [nextPresident.id]: data
          }))
        }
    
        prefetchNextStats()
      }, [nextPresident.id, setPrefetchedData])

    useEffect(() => {
        const img = new Image();
        img.src = nextPresident.imageURL}, [nextPresident]);

    const router = useRouter();
    useEffect(() => {
        router.prefetch(`/vote/${nextPresident.shortname}`)
      }, [nextPresident.shortname, router])

    const handleNextClick = () => {
        router.push(`/vote/${nextPresident.shortname}`);
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

    const nextPresident = fetchRandomPresident(president.id);

    return {
        props: {
            president,
            nextPresident,
        },
    };
};

export default StatsPage;
