// hooks/usePresidentStats.ts
import { useState, useEffect } from 'react';
import { President } from '../models/presidents';
import { usePrefetch } from './usePrefetch';

export const usePresidentStats = (president: President) => {
    const { prefetchedData, setPrefetchedData } = usePrefetch();
    const prefetched = prefetchedData[president.id];

    const [hot, setHot] = useState<number | null>(prefetched?.hot ?? null);
    const [not, setNot] = useState<number | null>(prefetched?.not ?? null);
    const [isLoading, setIsLoading] = useState<boolean>(!prefetched);

    // Load stats from API if not already available from prefetch
    useEffect(() => {
        if (prefetched) {
            // Use prefetched data immediately and clear it
            setHot(prefetched.hot);
            setNot(prefetched.not);
            setIsLoading(false);
            setPrefetchedData(prev => {
                const { [president.id]: _, ...rest } = prev;
                return rest;
            });
            return;
        }

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