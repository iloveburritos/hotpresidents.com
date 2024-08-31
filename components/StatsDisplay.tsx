// components/StatsDisplay.tsx
import React, { useState, useEffect } from 'react';
import { President } from '../models/presidents';
import { usePrefetch } from '../contexts/PrefetchStats';

interface StatsDisplayProps {
    president: President;
    onNextClick: () => void;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ president, onNextClick }) => {
    const [hot, setHot] = useState<number>(0);
    const [not, setNot] = useState<number>(0);
    const { prefetchedData } = usePrefetch();

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
                    setHot(data.hot);
                    setNot(data.not);
                } else {
                    console.error(`Failed to fetch stats for president ${president.id}`);
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        if (prefetchedData[president.id]) {
            setHot(prefetchedData[president.id].hot);
            setNot(prefetchedData[president.id].not);
        } else {
            fetchStats();
        }
    }, [president.id, prefetchedData]);

    return (
        <div id="subtext-container">
            <h3>Score:</h3>
            <div id="score-container">
                <div className="button-inner">
                    <h4 className="score">🔥<br />{hot}</h4>
                    <h4 className="score">🤮<br />{not}</h4>
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