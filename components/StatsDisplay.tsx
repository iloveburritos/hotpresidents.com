// components/StatsDisplay.tsx
import React from 'react';
import { President } from '../models/presidents';
import { usePresidentStats } from '../hooks/usePresidentStats';

interface StatsDisplayProps {
    president: President;
    onNextClick: () => void;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ president, onNextClick }) => {
    const { hot, not, isLoading } = usePresidentStats(president);

    return (
        <div id="subtext-container">
            <h3>Score:</h3>
            <div id="score-container">
                <div className="button-inner">
                    <h4 className="score">🔥<br />{isLoading ? '...' : hot}</h4>
                    <h4 className="score">🤮<br />{isLoading ? '...' : not}</h4>
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