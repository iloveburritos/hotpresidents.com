// pages/stats/[shortname].tsx
import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import PresidentCard from '../../components/PresidentCard';
import StatsDisplay from '../../components/StatsDisplay';
import { fetchPresidents, fetchPresidentShortname, fetchRandomPresident } from '../../lib/presidents';
import { President } from '../../models/presidents';
import { useRouter } from 'next/router';

interface StatsPageProps {
    president: President;
    nextPresident: President;
}

const StatsPage: React.FC<StatsPageProps> = ({ president, nextPresident }) => {
    const router = useRouter();

    useEffect(() => {
        const img = new Image();
        img.src = nextPresident.imageURL;
        router.prefetch(`/vote/${nextPresident.shortname}`);
    }, [nextPresident, router]);

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