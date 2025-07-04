// hooks/usePresidentStats.ts
import { useState, useEffect } from 'react';
import { President } from '../models/presidents';

export const usePresidentStats = (president: President) => {
    const [hot, setHot] = useState<number | null>(null);
    const [not, setNot] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load initial stats
    useEffect(() => {
        const loadInitialStats = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/stats?id=${president.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setHot(data.hot || 0);
                    setNot(data.not || 0);
                }
            } catch (error) {
                console.error('Error loading initial stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (president.id) {
            loadInitialStats();
        }
    }, [president.id]);

    // Optimistic vote update function
    const optimisticVote = (voteType: 'hot' | 'not') => {
        if (voteType === 'hot') {
            setHot(prev => (prev ?? 0) + 1);
        } else {
            setNot(prev => (prev ?? 0) + 1);
        }
    };

    // Revert optimistic update if server request fails
    const revertVote = (voteType: 'hot' | 'not') => {
        if (voteType === 'hot') {
            setHot(prev => (prev ?? 0) - 1);
        } else {
            setNot(prev => (prev ?? 0) - 1);
        }
    };

    return { 
        hot, 
        not, 
        isLoading,
        optimisticVote, 
        revertVote 
    };
};