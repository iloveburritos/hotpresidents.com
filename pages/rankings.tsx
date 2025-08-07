// pages/rankings.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

interface PresidentRanking {
    id: string;
    name: string;
    shortname: string;
    imageURL: string;
    hot: number;
    not: number;
    delta: number;
}

const RankingsPage: React.FC = () => {
    const [rankings, setRankings] = useState<PresidentRanking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await fetch('/api/rankings');
                if (!response.ok) {
                    throw new Error('Failed to fetch rankings');
                }
                const data = await response.json();
                setRankings(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, []);

    const formatDelta = (delta: number) => {
        const sign = delta >= 0 ? '+' : '';
        const label = delta >= 0 ? 'HOT' : 'NOT';
        return `${sign}${delta} ${label}`;
    };

    const getDeltaColor = (delta: number) => {
        if (delta > 0) return 'text-red-600'; // Hot
        if (delta < 0) return 'text-blue-600'; // Not
        return 'text-gray-600'; // Neutral
    };

    if (loading) {
        return (
            <Layout pageTitle="Rankings - Hot or Not Presidents" pageDescription="See how all the presidents rank in the hotness contest">
                <Head>
                    <title>Rankings - Hot or Not Presidents</title>
                </Head>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-xl">Loading rankings...</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout pageTitle="Rankings - Hot or Not Presidents" pageDescription="See how all the presidents rank in the hotness contest">
                <Head>
                    <title>Rankings - Hot or Not Presidents</title>
                </Head>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-xl text-red-600">Error: {error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout pageTitle="Rankings - Hot or Not Presidents" pageDescription="See how all the presidents rank in the hotness contest">
            <Head>
                <title>Rankings - Hot or Not Presidents</title>
            </Head>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Presidential Rankings</h1>
                    <p className="text-lg text-gray-600">Who&apos;s the hottest POTUS of them all?</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b">
                        <div className="grid grid-cols-12 gap-4 items-center font-semibold text-gray-700">
                            <div className="col-span-1 text-center">#</div>
                            <div className="col-span-2"></div>
                            <div className="col-span-6">President</div>
                            <div className="col-span-3 text-center">Net Score</div>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {rankings.map((president, index) => (
                            <div key={president.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-1 text-center">
                                        <span className="text-lg font-bold text-gray-600">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <Image 
                                            src={president.imageURL}
                                            alt={president.name}
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 object-cover rounded-full mx-auto"
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <h3 className="font-semibold text-lg text-gray-800">
                                            {president.name}
                                        </h3>
                                    </div>
                                    <div className="col-span-3 text-center">
                                        <span className={`text-xl font-bold ${getDeltaColor(president.delta)}`}>
                                            {formatDelta(president.delta)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="text-center mt-8">
                    <Link 
                        href="/"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Start Voting
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default RankingsPage;