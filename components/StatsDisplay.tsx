// components/StatsDisplay.tsx
import React from 'react';
import { President } from '../models/presidents';
import useSWR from 'swr';

interface StatsDisplayProps {
    president: President;
    onNextClick: () => void;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const StatsDisplay: React.FC<StatsDisplayProps> = React.memo(({ president, onNextClick }) => {
    const { data, error } = useSWR(`/api/stats?id=${president.id}`, fetcher);

    if (error) return <div>Failed to load stats</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div id="subtext-container">
            <h3>Score:</h3>
            <div id="score-container">
                <div className="button-inner">
                    <h4 className="score">🔥<br />{data.hot}</h4>
                    <h4 className="score">🤮<br />{data.not}</h4>
                </div>
            </div>
            <div id="next-container">
                <div className="next-inner">
                    <button className="next-btn" onClick={onNextClick}>👉</button>
                </div>
            </div>
        </div>
    );
});

export default StatsDisplay;