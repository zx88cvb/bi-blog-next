import { NextRequest, NextResponse } from 'next/server';
import { getAllPostSlugs } from '@/lib/posts';

const INDEXNOW_KEY = '963011ef5f7746e2b680d9492f292702';
const BASE_URL = 'https://haydenbi.com';


// Generate all URLs that need to be indexed
async function generateUrls(): Promise<string[]> {
  const urls: string[] = [];

  // Add base URL
  urls.push(BASE_URL);

  // Add main pages
  urls.push(`${BASE_URL}/posts`);
  urls.push(`${BASE_URL}/about`);
  urls.push(`${BASE_URL}/friends`);
  urls.push(`${BASE_URL}/milestones`);

  // Dynamically get all blog posts
  try {
    const postSlugs = await getAllPostSlugs();
    postSlugs.forEach(slug => {
      urls.push(`${BASE_URL}/posts/${slug}`);
    });
  } catch (error) {
    console.error('Error fetching post slugs:', error);
  }

  // Add RSS feed
  urls.push(`${BASE_URL}/feed.xml`);

  return [...new Set(urls)]; // Remove duplicates
}

// Submit URLs to IndexNow
async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'haydenbi.com',
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls
      })
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Split URLs into batches (IndexNow recommends max 10,000 URLs per request)
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export async function GET() {
  try {
    const urls = await generateUrls();

    return NextResponse.json({
      totalUrls: urls.length,
      urls: urls,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`
    });
  } catch (error) {
    console.error('Failed to generate URLs:', error);
    return NextResponse.json(
      { error: 'Failed to generate URLs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key } = body;
    
    if (key !== 'submit-all-pages') {
      return NextResponse.json(
        { error: 'Invalid key' },
        { status: 401 }
      );
    }
    
    const urls = await generateUrls();
    const batches = chunkArray(urls, 100); // Submit in batches of 100
    const results = [];
    let successfulBatches = 0;
    
    for (const batch of batches) {
      const result = await submitToIndexNow(batch);
      results.push({
        urls: batch,
        success: result.success,
        error: result.error
      });
      
      if (result.success) {
        successfulBatches++;
      }
      
      // Add small delay between batches to be respectful
      if (batches.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return NextResponse.json({
      totalUrls: urls.length,
      totalBatches: batches.length,
      successfulBatches,
      results
    });
    
  } catch (error) {
    console.error('Failed to submit to IndexNow:', error);
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow' },
      { status: 500 }
    );
  }
}