// components/PresidentCard.tsx
import React, { useState } from 'react'
import Image from 'next/image'
import { President } from '../models/presidents'

interface PresidentCardProps {
  president: President
  nextPresidentImage?: string
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president, nextPresidentImage}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [president.imageURL, ...(president.alternativeImages || [])]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div 
        onClick={nextImage} 
        className="cursor-pointer mb-4 bg-gray-100 rounded-lg overflow-hidden relative aspect-[4/3]"
      >
        <Image
          src={images[currentImageIndex]}
          alt={`Photo of ${president.name}`}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{president.name}</h2>
        <p className="text-lg mb-2">{president.office}: {president.yearsInOffice}</p>
        <p className="text-md italic">{president.quote || "Oh Notus - no quote available"}</p>
      </div>
    </div>
  )
}

export default PresidentCard