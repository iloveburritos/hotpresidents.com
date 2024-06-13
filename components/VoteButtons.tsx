// components/VoteButtons.tsx
import React from 'react';
import { President } from '../models/presidents';
import { usePrefetch } from '../contexts/PrefetchStats';

interface VoteButtonsProps {
    president: President;
    onVoteSuccess: (voteType: 'hot' | 'not') => void;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ president, onVoteSuccess }) => {
    const { setPrefetchedData, prefetchedData } = usePrefetch();

    const handleVote = async (voteType: 'hot' | 'not') => {
        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: president.id, voteType }),
            });

            if (response.ok) {
                setPrefetchedData((prev) => {
                    const updatedStats = {
                        ...prev,
                        [president.id]: {
                            ...prev[president.id],
                            hot: voteType === 'hot' ? prev[president.id].hot + 1 : prev[president.id].hot,
                            not: voteType === 'not' ? prev[president.id].not + 1 : prev[president.id].not,
                        },
                    };
                    return updatedStats;
                });
                onVoteSuccess(voteType);
            } else {
                console.error(`Failed to vote ${voteType} for president ${president.id}`);
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

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

export default VoteButtons;
