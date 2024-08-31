// components/PreloadImage.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface PreloadImageProps {
  src: string
  preloadSrc?: string
  alt: string
}

export default function PreloadImage({ src, preloadSrc, alt }: PreloadImageProps) {
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setImageSrc(src)
  }, [src])

  useEffect(() => {
    if (preloadSrc) {
      const img = new window.Image()
      img.src = preloadSrc
    }
  }, [preloadSrc])

  return (
    <div className="relative w-full pt-[75%]">
      <Image
        src={imageSrc}
        alt={alt}
        layout="fill"
        objectFit="contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}