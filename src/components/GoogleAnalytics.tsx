'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

interface GoogleAnalyticsProps {
  gaId: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  useEffect(() => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV)
    console.log("gaId", gaId)
    // 只在生产环境加载
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    // 初始化 dataLayer
    window.dataLayer = window.dataLayer || []
    
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    
    window.gtag = gtag
    
    gtag('js', new Date())
    gtag('config', gaId, {
      // 隐私友好配置
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
      // 尊重用户隐私设置
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })
  }, [gaId])

  // 只在生产环境渲染
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  )
}

// 导出工具函数用于事件追踪
export const gtag = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

// 常用事件追踪函数
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// 页面浏览追踪
export const trackPageView = (url: string, title: string) => {
  gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
    page_title: title,
    page_location: url,
  })
}