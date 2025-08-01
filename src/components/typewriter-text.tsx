'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
}

export function TypewriterText({ text, speed = 80 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, index))
      index++
      if (index > text.length) {
        clearInterval(timer)
      }
    }, speed)
    
    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <>
      {displayedText}
      <span className="animate-pulse">|</span>
    </>
  )
}