import { getAllPosts, PostData } from '@/lib/posts'
import PostsClient from '@/components/PostsClient'
import Breadcrumb from '@/components/Breadcrumb'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '文章列表 | Bi Blog',
  description: '浏览所有技术文章，包含前端开发、编程技巧、技术见解等内容',
  keywords: '技术博客, 前端开发, 编程, 技术文章',
  openGraph: {
    title: '文章列表 | Bi Blog',
    description: '浏览所有技术文章，包含前端开发、编程技巧、技术见解等内容',
    type: 'website',
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