// components/PresidentCard.tsx
import React from 'react';
import { President } from '../models/presidents';
import Image from 'next/image';

interface PresidentCardProps {
    president: President;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president }) => {
    return (
        <div id="container">
            <div id="img-container" className="relative aspect-square w-full max-w-[500px] min-w-[300px] min-h-[300px]">
                <Image 
                    src={president.imageURL}
                    alt={`Photo of ${president.name}`}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority={true}
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 500px"
                    loading="eager"
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