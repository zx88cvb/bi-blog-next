import { NextResponse } from 'next/server'
import { generateRSSFeed } from '@/lib/rss'

export async function GET() {
  try {
    const rssXml = await generateRSSFeed()
    
    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('RSS generation error:', error)
    return new NextResponse('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
}