// components/PresidentCard.tsx
import React from 'react';
import { President } from '../models/presidents';
import Image from 'next/image';

interface PresidentCardProps {
    president: President;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div id="img-container" className="relative w-full max-w-[500px] min-w-[300px] h-[300px]">
                <Image
                    src={president.imageURL}
                    alt={`Photo of ${president.name}`}
                    fill
                    priority
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, 500px"
                />
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