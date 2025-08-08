import { Feed } from 'feed'
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

// rss基础配置
const defaultConfig: RSSConfig = {
  title: 'Bi\'s Blog',
  description: '个人博客，分享技术与生活',
  site_url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
  feed_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/api/feed`,
  author: 'Bi',
  language: 'zh-CN',
  pubDate: new Date()
}

export async function generateRSSFeed(config: Partial<RSSConfig> = {}): Promise<string> {
  const finalConfig = { ...defaultConfig, ...config }
  
  const feed = new Feed({
    title: finalConfig.title,
    description: finalConfig.description,
    id: finalConfig.site_url,
    link: finalConfig.site_url,
    language: finalConfig.language,
    image: `${finalConfig.site_url}/logo.png`,
    favicon: `${finalConfig.site_url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${finalConfig.author}`,
    updated: finalConfig.pubDate,
    generator: 'Next.js',
    feedLinks: {
      rss2: finalConfig.feed_url,
    },
    author: {
      name: finalConfig.author,
      email: 'zx88cvb@gmail.com',
      link: finalConfig.site_url,
    },
  })

  try {
    const posts = await getAllPosts()
    
    posts.forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${finalConfig.site_url}/posts/${post.slug}`,
        link: `${finalConfig.site_url}/posts/${post.slug}`,
        description: post.excerpt,
        content: post.excerpt,
        author: [
          {
            name: post.author,
            email: 'zx88cvb@gmail.com',
            link: finalConfig.site_url,
          },
        ],
        date: new Date(post.date),
        category: post.tags.map(tag => ({ name: tag })),
      })
    })

    return feed.rss2()
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    throw new Error('Failed to generate RSS feed')
  }
}