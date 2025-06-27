// components/StatsDisplay.tsx
import React, { useState, useEffect } from 'react';
import { President } from '../models/presidents';
import { usePrefetch } from '../hooks/usePrefetch';
import { usePresidentStats } from '../hooks/usePresidentStats';

interface StatsDisplayProps {
    president: President;
    onNextClick: () => void;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ president, onNextClick }) => {
    const { prefetchedData } = usePrefetch();
    const [stats, setStats] = useState<{ hot: number; not: number } | null>(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Always fetch fresh data to ensure we get the latest votes
                const response = await fetch(`/api/stats?id=${president.id}`, {
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error loading stats:', error);
                // Fallback to prefetched data if fetch fails
                if (prefetchedData[president.id]) {
                    setStats(prefetchedData[president.id]);
                }
            }
        };
        loadStats();
    }, [president.id, prefetchedData]);

    return (
        <div id="subtext-container">
            <h3>Score:</h3>
            <div id="score-container">
                <div className="button-inner">
                    <h4 className="score">🔥<br />{stats?.hot ?? '...'}</h4>
                    <h4 className="score">🤮<br />{stats?.not ?? '...'}</h4>
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