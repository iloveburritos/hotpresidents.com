// components/VoteButtons.tsx
import React, { useCallback } from 'react';
import { President } from '../models/presidents';

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

            onVoteSuccess(voteType);
        } catch (error) {
            console.error('Error submitting vote:', error);
            // Revert optimistic update if server request fails
            onRevertVote(voteType);
        }
    }, [president.id, onVoteSuccess, onOptimisticVote, onRevertVote]);

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