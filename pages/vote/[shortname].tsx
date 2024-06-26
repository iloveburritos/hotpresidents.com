// pages/vote/[shortname].tsx
import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import PresidentCard from '../../components/PresidentCard';
import VoteButtons from '../../components/VoteButtons';
import { fetchPresidents, fetchPresidentShortname } from '../../lib/presidents';
import { President } from '../../models/presidents';
import { useRouter } from 'next/router';
import { usePrefetch } from '../../contexts/PrefetchStats';

interface VotePageProps {
    president: President;
}

const VotePage: React.FC<VotePageProps> = ({ president }) => {
    const router = useRouter();
    const { setPrefetchedData, prefetchedData } = usePrefetch();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`/api/stats?id=${president.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPrefetchedData(prev => ({ ...prev, [president.id]: data }));
                } else {
                    console.error(`Failed to fetch stats for president ${president.id}`);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        if (president) {
            fetchStats();
        }
    }, [president, setPrefetchedData]);

    const handleVoteSuccess = () => {
        router.push(`/stats/${president.shortname}`);
    };

    return (
        <Layout>
            {president && (
                <>
                    <PresidentCard president={president} />
                    <VoteButtons president={president} onVoteSuccess={handleVoteSuccess} />
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
    const presidentFromFile = fetchPresidentShortname(shortname);

    if (!presidentFromFile) {
        return { notFound: true };
    }

    return {
        props: {
            president: presidentFromFile,
        },
    };
};

export default VotePage;
