// components/PreloadImage.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

interface PreloadImageProps extends Omit<ImageProps, 'src'> {
  src: string
  preloadSrc?: string
}

export default function PreloadImage({ src, preloadSrc, ...props }: PreloadImageProps) {
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

  return <Image src={imageSrc} {...props} />
}