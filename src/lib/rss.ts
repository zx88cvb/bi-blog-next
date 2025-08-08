import RSS from 'rss'
import { getAllPosts } from './posts'

export interface RSSConfig {
  title: string
  description: string
  site_url: string
  feed_url: string
  author: string
  language?: string
  pubDate?: Date
}

const defaultConfig: RSSConfig = {
  title: 'Bi\'s Blog',
  description: '个人博客，分享技术与生活',
  site_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
  feed_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/rss`,
  author: 'Bi',
  language: 'zh-CN',
  pubDate: new Date()
}

export async function generateRSSFeed(config: Partial<RSSConfig> = {}): Promise<string> {
  const finalConfig = { ...defaultConfig, ...config }
  
  const feed = new RSS({
    title: finalConfig.title,
    description: finalConfig.description,
    feed_url: finalConfig.feed_url,
    site_url: finalConfig.site_url,
    author: finalConfig.author,
    language: finalConfig.language,
    pubDate: finalConfig.pubDate,
    ttl: 60 // TTL in minutes
  })

  try {
    const posts = await getAllPosts()
    
    posts.forEach((post) => {
      feed.item({
        title: post.title,
        description: post.excerpt,
        url: `${finalConfig.site_url}/posts/${post.slug}`,
        author: post.author,
        date: new Date(post.date),
        categories: post.tags
      })
    })

    return feed.xml()
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    throw new Error('Failed to generate RSS feed')
  }
}