// components/PresidentCard.tsx
import React from 'react';
import Image from 'next/image';
import { President } from '../models/presidents';

interface PresidentCardProps {
    president: President;
    isLoading: boolean;
}

const PresidentCard: React.FC<PresidentCardProps> = React.memo(({ president, isLoading }) => {
    return (
        <div id="container">
            <div id="img-container" className={isLoading ? 'animate-pulse' : ''}>
                {isLoading ? (
                    <div className="w-[500px] h-[500px] bg-gray-200 rounded-lg"></div>
                ) : (
                    <Image 
                        src={president.imageURL} 
                        alt={`Photo of ${president.name}`} 
                        width={500} 
                        height={500} 
                        priority
                        className="rounded-lg"
                    />
                )}
            </div>
            <div id="subtext-container">
                <h2>{president.name}</h2>
                <p>{president.office}: {president.yearsInOffice}</p>
                <p>{president.quote || "Oh Notus - no quote available"}</p>
            </div>
        </div>
    );
});

export default PresidentCard;