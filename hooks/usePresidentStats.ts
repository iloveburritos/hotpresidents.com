// hooks/usePresidentStats.ts
import { useState, useEffect } from 'react';
import { President } from '../models/presidents';

export const usePresidentStats = (president: President) => {
    const [hot, setHot] = useState<number>(0);
    const [not, setNot] = useState<number>(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`/api/stats?id=${president.id}`, {
                    cache: 'no-cache' // Ensure fresh data
                });
                if (response.ok) {
                    const data = await response.json();
                    setHot(data.hot || 0);
                    setNot(data.not || 0);
                }
            } catch (error) {
                console.error('Error fetching president stats:', error);
            }
        };

        if (president.id) {
            fetchStats();
        }
    }, [president.id]);

    return { hot, not };
};