'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Tag, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface PostDisplayProps {
  posts: Array<{
    id: string
    title: string
    excerpt: string
    author: string
    publishDate: string
    tags: string[]
    slug: string
    readTime: string
  }>
}

export default function PostsClient({ posts }: PostDisplayProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  // 获取所有标签
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

  // 过滤文章
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  // 分页计算
  const totalPages = Math.ceil(filteredPosts.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const currentPosts = filteredPosts.slice(startIndex, startIndex + pageSize)

  // 重置页码当过滤条件改变时
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">文章列表</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            分享技术问题以及日常生活的碎碎念
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={!selectedTag ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagChange(null)}
            >
              全部
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => handleTagChange(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6 mb-8">
          {currentPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishDate)}
                  <Separator orientation="vertical" className="h-4" />
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                
                <CardTitle className="text-2xl line-clamp-2 leading-relaxed group-hover:text-primary transition-colors">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-3 mb-4 text-base">
                  {post.excerpt}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                  <Link href={`/posts/${post.slug}`}>
                    阅读全文 →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {currentPosts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground text-lg">
                {searchTerm || selectedTag ? '没有找到匹配的文章' : '暂无文章'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let page
                    if (totalPages <= 5) {
                      page = i + 1
                    } else if (currentPage <= 3) {
                      page = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i
                    } else {
                      page = currentPage - 2 + i
                    }
                    
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-center mt-2 text-sm text-muted-foreground">
                第 {currentPage} 页，共 {totalPages} 页 ({filteredPosts.length} 篇文章)
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}