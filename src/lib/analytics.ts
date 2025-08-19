// 事件追踪工具函数
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
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