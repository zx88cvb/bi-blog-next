import { getAllPosts, PostData } from '@/lib/posts'
import PostsClient from '@/components/PostsClient'

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
  
  return <PostsClient posts={posts} />
}