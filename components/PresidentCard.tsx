// components/PresidentCard.tsx
import React, { useState } from 'react'
import { President } from '../models/presidents'
import PreloadImage from './PreloadImage'

interface PresidentCardProps {
  president: President
  nextPresidentImage?: string
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president, nextPresidentImage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [president.imageURL, ...(president.alternativeImages || [])]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div id="container">
      <div id="img-container" onClick={nextImage}>
        <PreloadImage
          src={images[currentImageIndex]}
          preloadSrc={nextPresidentImage}
          alt={`Photo of ${president.name}`}
          width={300}
          height={400}
          layout="responsive"
        />
      </div>
      <div id="subtext-container">
        <h2>{president.name}</h2>
        <p>{president.office}: {president.yearsInOffice}</p>
        <p>{president.quote || "Oh Notus - no quote available"}</p>
      </div>
    </div>
  )
}

export default PresidentCard