// components/StatsDisplay.tsx
import React, { useState, useEffect } from 'react';
import { President } from '../models/presidents';
import { usePrefetch } from '../contexts/PrefetchStats';

interface StatsDisplayProps {
    president: President;
    onNextClick: () => void;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ president, onNextClick }) => {
    const { prefetchedData, setPrefetchedData } = usePrefetch();
    const [hot, setHot] = useState<number | undefined>(undefined);
    const [not, setNot] = useState<number | undefined>(undefined);

    useEffect(() => {
        // Check if we already have prefetched data
        const prefetchStats = prefetchedData[president.id];

        if (prefetchStats) {
            setHot(prefetchStats.hot);
            setNot(prefetchStats.not);
        } else {
            // If not, fetch the data from the API
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
                        setHot(data.hot);
                        setNot(data.not);

                        // Store the fetched data to prevent future unnecessary API calls
                        setPrefetchedData(prev => ({
                            ...prev,
                            [president.id]: data
                        }));
                    } else {
                        console.error(`Failed to fetch stats for president ${president.id}`);
                    }
                } catch (error) {
                    console.error('Error fetching stats:', error);
                }
            };

            fetchStats();
        }
    }, [president.id, prefetchedData, setPrefetchedData]);

    return (
        <div id="subtext-container">
            <h3>Score:</h3>
            <div id="score-container">
                <div className="button-inner">
                    <h4 className="score">🔥<br />{hot !== undefined ? hot : '...'}</h4>
                    <h4 className="score">🤮<br />{not !== undefined ? not : '...'}</h4>
                </div>
            </div>

            <div id="next-container">
                <div className="next-inner">
                    <button className="next-btn" onClick={onNextClick}>👉</button>
                </div>
            </div>
        </div>
    );
};

export default StatsDisplay;