import { getAllPosts, PostData } from '@/lib/posts'
import PostsClient from '@/components/PostsClient'
import Breadcrumb from '@/components/Breadcrumb'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '技术文章列表 - Bi Blog | 前端后端全栈开发经验分享',
  description: '浏览全部技术文章，涵盖前端开发、后端架构、全栈项目、编程技巧与独立开发经验分享',
  keywords: '技术博客, 前端开发, 后端开发, 全栈, 编程, 技术文章, 项目实践',
  openGraph: {
    title: '技术文章列表 - Bi Blog | 前端后端全栈开发经验分享',
    description: '浏览全部技术文章，涵盖前端开发、后端架构、全栈项目、编程技巧与独立开发经验分享',
    type: 'website',
    url: '/posts',
    siteName: 'Bi Blog',
    locale: 'zh_CN',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Bi Blog - 技术文章列表',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '技术文章列表 - Bi Blog | 前端后端全栈开发经验分享',
    description: '浏览全部技术文章，涵盖前端开发、后端架构、全栈项目、编程技巧与独立开发经验分享',
    images: ['/logo.png'],
  },
}

// 将 PostData 转换为客户端组件需要的格式
const convertToDisplayFormat = (post: PostData) => ({
  id: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  author: post.author,
  publishDate: post.date,
  tags: post.tags,
  slug: post.slug,
  readTime: `${Math.floor(Math.random() * 10) + 5} 分钟`, // 临时计算
})

export default async function PostsPage() {
  const allPosts = await getAllPosts()
  const posts = allPosts.map(convertToDisplayFormat)
  
  // 面包屑导航数据
  const breadcrumbItems = [
    { label: '文章' }
  ]
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <PostsClient posts={posts} />
    </div>
  )
}