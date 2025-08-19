'use client'

import { trackEvent } from '@/components/GoogleAnalytics'
import { ReactNode } from 'react'

interface AnalyticsLinkProps {
  href: string
  children: ReactNode
  eventAction?: string
  eventCategory?: string
  eventLabel?: string
  className?: string
  [key: string]: unknown
}

export default function AnalyticsLink({
  href,
  children,
  eventAction = 'click',
  eventCategory = 'navigation',
  eventLabel,
  className,
  ...props
}: AnalyticsLinkProps) {
  const handleClick = () => {
    trackEvent(eventAction, eventCategory, eventLabel || href)
  }

  // 判断是否是外部链接
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  
  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}