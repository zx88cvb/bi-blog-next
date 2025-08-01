import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
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
    const words = content.length / 5 // 假设平均每个单词5个字符
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} 分钟`
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
    }))

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link href="/posts" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回文章列表
          </Link>
        </Button>

        {/* Article Header */}
        <Card className="mb-12">
          <CardHeader className="pb-8">
            <div className="space-y-4">
              <CardTitle className="text-4xl leading-tight">
                {post.title}
              </CardTitle>
              
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
          </CardHeader>
          
          {/* <CardContent className="pt-0">
            <CardDescription className="text-xl leading-relaxed">
              {post.excerpt}
            </CardDescription>
          </CardContent> */}

          <CardContent className="pt-0">
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <div 
                className="text-foreground leading-relaxed markdown-content"
                dangerouslySetInnerHTML={{
                  __html: post.content || ''
                }}
              />
            </div>
          </CardContent>
        </Card>

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
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              相关文章
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <Link href={`/posts/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// 生成静态路径
export async function generateStaticParams() {
  const posts = await getAllPostSlugs()
  return posts.map(slug => ({
    slug: slug
  }))
}