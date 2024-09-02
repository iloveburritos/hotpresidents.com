// components/PresidentCard.tsx
import React, { useState } from 'react';
import { President } from '../models/presidents';
import Image from 'next/image'

interface PresidentCardProps {
    president: President;
    nextPresidentImage?: string;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president, nextPresidentImage }) => {
        const [currentImageIndex, setCurrentImageIndex] = useState(0)
        const images = [president.imageURL, ...(president.alternativeImages || [])]
      
        const nextImage = () => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }
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