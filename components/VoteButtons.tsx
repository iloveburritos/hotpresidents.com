// components/VoteButtons.tsx
import React, { useCallback } from 'react';
import { President } from '../models/presidents';
import { usePrefetch } from '../hooks/usePrefetch';

interface VoteButtonsProps {
    president: President;
    onVoteSuccess: (voteType: 'hot' | 'not') => void;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ president, onVoteSuccess }) => {
    const { setPrefetchedData } = usePrefetch();

    const handleVote = useCallback(async (voteType: 'hot' | 'not') => {
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

            // Update prefetched stats after vote
            const statsResponse = await fetch(`/api/stats?id=${president.id}`);
            if (statsResponse.ok) {
                const updatedStats = await statsResponse.json();
                setPrefetchedData(prev => ({
                    ...prev,
                    [president.id]: updatedStats
                }));
            }

            onVoteSuccess(voteType);
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    }, [president.id, onVoteSuccess, setPrefetchedData]);

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