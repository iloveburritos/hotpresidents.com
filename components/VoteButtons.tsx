// components/VoteButtons.tsx
import React, { useCallback } from 'react';
import { President } from '../models/presidents';
import { usePrefetch } from '../hooks/usePrefetch';

interface VoteButtonsProps {
    president: President;
    onVoteSuccess: (voteType: 'hot' | 'not') => void;
    onOptimisticVote: (voteType: 'hot' | 'not') => void;
    onRevertVote: (voteType: 'hot' | 'not') => void;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
    president,
    onVoteSuccess,
    onOptimisticVote,
    onRevertVote
}) => {
    const { setPrefetchedData } = usePrefetch();

    const handleVote = useCallback(async (voteType: 'hot' | 'not') => {
        // Immediately update UI optimistically
        onOptimisticVote(voteType);

        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: president.id, voteType }),
            });

            if (!response.ok) {
                throw new Error(`Failed to vote ${voteType} for president ${president.id}`);
            }

            // Store updated stats from vote response for instant stats page load
            const data = await response.json();
            if (data.hot !== undefined) {
                setPrefetchedData(prev => ({
                    ...prev,
                    [president.id]: { hot: data.hot, not: data.not },
                }));
            }

            onVoteSuccess(voteType);
        } catch (error) {
            console.error('Error submitting vote:', error);
            // Revert optimistic update if server request fails
            onRevertVote(voteType);
        }
    }, [president.id, onVoteSuccess, onOptimisticVote, onRevertVote, setPrefetchedData]);

    return (
        <>
            <div id="subtext-container">
                <h3>Hotus or Notus?</h3>
            </div>
            <div id="button-container">
                <div className="button-inner">
                    <button className="btn" onClick={() => handleVote('hot')}>🔥</button>
                    <button className="btn" onClick={() => handleVote('not')}>🤮</button>
                </div>
            </div>
        </>
    );
};

export default React.memo(VoteButtons);