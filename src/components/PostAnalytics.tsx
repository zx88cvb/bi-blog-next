'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface PostAnalyticsProps {
  postTitle: string
  postSlug: string
  author: string
  tags: string[]
  readTime: string
}

export default function PostAnalytics({ 
  postTitle, 
  postSlug, 
  author, 
  tags, 
  readTime 
}: PostAnalyticsProps) {
  useEffect(() => {
    // 追踪文章浏览
    trackEvent('view_article', 'engagement', postTitle)
    
    // 追踪文章分类
    tags.forEach(tag => {
      trackEvent('view_tag', 'content', tag)
    })

    // 追踪作者文章浏览
    trackEvent('view_author_article', 'content', author)

    // 模拟阅读完成追踪
    const readTimeMinutes = parseInt(readTime) || 5
    const readTimeout = setTimeout(() => {
      trackEvent('read_complete', 'engagement', postTitle, readTimeMinutes)
    }, Math.min(readTimeMinutes * 60 * 1000, 300000)) // 最多5分钟

    // 追踪页面停留时间
    const startTime = Date.now()
    
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      trackEvent('time_on_page', 'engagement', postTitle, timeSpent)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearTimeout(readTimeout)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [postTitle, postSlug, author, tags, readTime])

  return null
}