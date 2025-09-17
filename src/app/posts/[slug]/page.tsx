import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Breadcrumb from '@/components/Breadcrumb'
import PostAnalytics from '@/components/PostAnalytics'
import TableOfContents from '@/components/TableOfContents'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: '文章未找到',
      description: '您要查找的文章不存在',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  const postUrl = `${baseUrl}/posts/${slug}`
  const imageUrl = `${baseUrl}/logo.png`

  return {
    title: `${post.title} | Bi Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Bi Blog',
      locale: 'zh_CN',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: '@HaydenBi',
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  // 计算阅读时间（基于内容长度的简单估算）
  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200
    // 假设平均每个单词5个字符
    const words = content.length / 5
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} 分钟`
  }

  // 为文章内容中的标题添加id属性
  const addHeadingIds = (content: string): string => {
    return content.replace(/<h([1-6])([^>]*)>([^<]+)<\/h[1-6]>/g, (match, level, attrs, text) => {
      // 生成id（移除特殊字符，转换为小写，用连字符连接）
      const id = text
        .trim()
        .toLowerCase()
        .replace(/[^\w\s\u4e00-\u9fff]/g, '') // 保留中文字符
        .replace(/\s+/g, '-')
        .substring(0, 50) // 限制长度
      
      // 检查是否已经有id属性
      if (attrs.includes('id=')) {
        return match
      }
      
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`
    })
  }

  // 获取相关文章（排除当前文章）
  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3)
    .map(p => ({
      id: p.slug,
      title: p.title,
      slug: p.slug,
      date: p.date,
      excerpt: p.excerpt,
    }))

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  const postUrl = `${baseUrl}/posts/${slug}`
  
  // 面包屑导航数据
  const breadcrumbItems = [
    { label: '文章', href: '/posts' },
    { label: post.title }
  ]
  
  // 生成JSON-LD结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}/logo.png`,
    author: {
      '@type': 'Person',
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bi Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
    keywords: post.tags.join(', '),
    articleBody: post.content?.replace(/<[^>]*>/g, '') || '', // 移除HTML标签
  }

  return (
    <>
      {/* Google Analytics 事件追踪 */}
      <PostAnalytics
        postTitle={post.title}
        postSlug={slug}
        author={post.author}
        tags={post.tags}
        readTime={calculateReadTime(post.content || '')}
      />
      
      {/* JSON-LD结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 面包屑导航 */}
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link href="/posts" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回文章列表
          </Link>
        </Button>

        {/* Article Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl leading-tight font-bold text-foreground">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/author-avatar.jpg" alt={post.author} />
                <AvatarFallback className="text-xs">
                  {post.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{post.author}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {calculateReadTime(post.content || '')}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 文章内容和目录的两列布局 */}
        <div className="lg:flex lg:gap-8 mb-12">
          {/* 文章内容 */}
          <div className="lg:flex-1 min-w-0">
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none overflow-hidden">
              <div 
                className="text-foreground leading-relaxed markdown-content"
                dangerouslySetInnerHTML={{
                  __html: addHeadingIds(post.content || '')
                }}
              />
            </div>
          </div>
          
          {/* 目录 - 独立的背景 */}
          <div className="lg:w-64 lg:flex-shrink-0 mt-8 lg:mt-0">
            <TableOfContents content={post.content || ''} />
          </div>
        </div>

        {/* Article Content */}
        {/* <Card className="mb-12">
          <CardContent className="pt-8">
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <div 
                className="text-foreground leading-relaxed markdown-content"
                dangerouslySetInnerHTML={{
                  __html: post.content || ''
                }}
              />
            </div>
          </CardContent>
        </Card> */}

        {/* Related Posts */}
        <div className="lg:max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            相关文章
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <CardHeader className="pb-3 flex-grow">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors mb-2">
                    <Link href={`/posts/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </CardTitle>
                  {relatedPost.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="pt-0 mt-auto">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(relatedPost.date)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {relatedPosts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">暂无相关文章</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  )
}

// 生成静态路径
export async function generateStaticParams() {
  const posts = await getAllPostSlugs()
  return posts.map(slug => ({
    slug: slug
  }))
}