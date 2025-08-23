'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export default function TableOfContents({ content, className }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // 解析HTML内容，提取标题并生成ID
  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    const items: TocItem[] = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const title = heading.textContent?.trim() || ''
      
      // 生成更可靠的ID
      let id = heading.id
      if (!id && title) {
        id = title
          .toLowerCase()
          .replace(/[^\w\s\u4e00-\u9fff]/g, '') // 保留中文字符和字母数字
          .replace(/\s+/g, '-')
          .substring(0, 50) || `heading-${index}`
      } else if (!id) {
        id = `heading-${index}`
      }
      
      return {
        id,
        title,
        level
      }
    })
    
    setTocItems(items)
  }, [content])

  // 监听滚动，高亮当前阅读位置
  const handleScroll = useCallback(() => {
    if (tocItems.length === 0) return
    
    const headings: Element[] = []
    
    // 更可靠地查找标题元素
    tocItems.forEach(item => {
      // 首先尝试通过ID查找
      let element = document.getElementById(item.id)
      
      // 如果ID找不到，通过文本内容查找
      if (!element) {
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        element = Array.from(allHeadings).find(h => 
          h.textContent?.trim() === item.title
        ) as Element
      }
      
      if (element) {
        headings.push(element)
      }
    })
    
    let currentId = ''
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
    // 找到当前视窗中的标题
    for (let i = headings.length - 1; i >= 0; i--) {
      const heading = headings[i]
      if (heading) {
        const elementTop = heading.getBoundingClientRect().top + scrollTop
        if (scrollTop >= elementTop - 150) {
          const tocItem = tocItems.find(item => 
            heading.id === item.id || 
            heading.textContent?.trim() === item.title
          )
          if (tocItem) {
            currentId = tocItem.id
            break
          }
        }
      }
    }
    
    setActiveId(currentId)
  }, [tocItems])

  useEffect(() => {
    // 延迟执行以确保DOM已渲染
    const timer = setTimeout(() => {
      handleScroll()
    }, 100)

    const throttledHandleScroll = () => {
      clearTimeout(timer)
      setTimeout(handleScroll, 50)
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', throttledHandleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  // 点击目录项跳转
  const handleTocClick = (id: string, title: string) => {
    // 首先尝试通过ID查找
    let element = document.getElementById(id)
    
    // 如果通过ID找不到，尝试通过文本内容查找
    if (!element) {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      element = Array.from(headings).find(h => 
        h.textContent?.trim() === title
      ) as HTMLElement
    }
    
    if (element) {
      const headerOffset = 120 // 增加偏移量，考虑固定头部
      const elementPosition = element.offsetTop
      const offsetPosition = Math.max(0, elementPosition - headerOffset)

      // 设置活跃状态
      setActiveId(id)

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <Card className={cn('sticky top-24', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">目录</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={`${item.id}-${item.title}`}
              onClick={() => handleTocClick(item.id, item.title)}
              className={cn(
                'block w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors hover:bg-muted/60',
                'border-l-2 border-transparent hover:border-primary/50',
                {
                  'pl-4': item.level === 2,
                  'pl-6': item.level === 3,
                  'pl-8': item.level === 4,
                  'pl-10': item.level === 5,
                  'pl-12': item.level === 6,
                  'text-primary bg-muted border-primary': activeId === item.id,
                  'text-muted-foreground': activeId !== item.id
                }
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}