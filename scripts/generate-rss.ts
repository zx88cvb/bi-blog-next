import fs from 'fs'
import path from 'path'
import { generateRSSFeed } from '../src/lib/rss'

async function generateStaticRSS() {
  try {
    console.log('正在生成RSS feed...')
    const rssXml = await generateRSSFeed()
    
    // 确保 public 目录存在
    const publicDir = path.join(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }
    
    // 写入RSS文件
    const rssPath = path.join(publicDir, 'feed.xml')
    fs.writeFileSync(rssPath, rssXml, 'utf8')
    
    console.log(`✅ RSS feed 已生成: ${rssPath}`)
    console.log(`📄 包含 ${(rssXml.match(/<item>/g) || []).length} 篇文章`)
  } catch (error) {
    console.error('❌ RSS feed 生成失败:', error)
    process.exit(1)
  }
}

generateStaticRSS()