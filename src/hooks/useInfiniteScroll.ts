'use client'

import { useState, useEffect, useCallback } from 'react'

export interface UseInfiniteScrollProps<T> {
  initialData: T[]
  fetchMore: (page: number) => Promise<T[]>
  pageSize: number
  disabled?: boolean // 新增：是否禁用无限滚动
}

export function useInfiniteScroll<T>({ 
  initialData, 
  fetchMore, 
  pageSize,
  disabled = false
}: UseInfiniteScrollProps<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || disabled) return

    setLoading(true)
    try {
      const newData = await fetchMore(page + 1)
      if (newData.length === 0 || newData.length < pageSize) {
        setHasMore(false)
      }
      setData(prev => [...prev, ...newData])
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('Error loading more data:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page, fetchMore, pageSize, disabled])

  useEffect(() => {
    if (disabled) return

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore, disabled])

  return { data, loading, hasMore, loadMore }
}