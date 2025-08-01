import Link from 'next/link'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TypewriterText } from '@/components/typewriter-text'

export default async function Home() {
  // 获取最新的3篇文章
  const allPosts = await getAllPosts()
  const recentPosts = allPosts.slice(0, 3).map(post => ({
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    publishDate: post.date,
    readTime: `${Math.floor(Math.random() * 10) + 5} 分钟`, // 临时计算
    tags: post.tags,
    slug: post.slug,
  }))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-16 lg:py-20">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
                欢迎来到我的
                <span className="text-primary"> 个人博客</span>
              </h1>
              <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto min-h-[3rem]">
                <TypewriterText text="我是一名充满热情的全栈开发工程师，致力于通过技术创造美好的数字体验。在这里，我分享我的技术探索、项目实践和对编程世界的思考。" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              最新文章
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              探索我最新的技术思考和实践经验
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {recentPosts.map((post, index) => (
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
                    <span>{post.readTime}</span>
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
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                    <Link href={`/posts/${post.slug}`}>
                      阅读全文
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button variant="outline" size="lg" asChild>
              <Link href="/posts">
                查看所有文章
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
