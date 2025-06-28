// hooks/usePresidentStats.ts
import { useState, useEffect } from 'react';
import { President } from '../models/presidents';

export const usePresidentStats = (president: President) => {
    const [hot, setHot] = useState<number>(0);
    const [not, setNot] = useState<number>(0);

    // Load initial stats
    useEffect(() => {
        const loadInitialStats = async () => {
            try {
                const response = await fetch(`/api/stats?id=${president.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setHot(data.hot || 0);
                    setNot(data.not || 0);
                }
            } catch (error) {
                console.error('Error loading initial stats:', error);
            }
        };

        if (president.id) {
            loadInitialStats();
        }
    }, [president.id]);

    // Optimistic vote update function
    const optimisticVote = (voteType: 'hot' | 'not') => {
        if (voteType === 'hot') {
            setHot(prev => prev + 1);
        } else {
            setNot(prev => prev + 1);
        }
    };

    // Revert optimistic update if server request fails
    const revertVote = (voteType: 'hot' | 'not') => {
        if (voteType === 'hot') {
            setHot(prev => prev - 1);
        } else {
            setNot(prev => prev - 1);
        }
    };

    return { 
        hot, 
        not, 
        optimisticVote, 
        revertVote 
    };
};