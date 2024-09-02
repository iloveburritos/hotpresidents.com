// components/PresidentCard.tsx
import React from 'react';
import { President } from '../models/presidents';

interface PresidentCardProps {
    president: President;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president }) => {
    return (
        <div id="container" >
            <div id="img-container">
                <img src={president.imageURL} alt={`Photo of ${president.name}`} />
            </div>
            <div id="subtext-container">
                <h2>{president.name}</h2>
                <p>{president.office}: {president.yearsInOffice}</p>
                <p>{president.quote || "Oh Notus - no quote available"}</p>
            </div>
        </div>
    );
};

export default PresidentCard;