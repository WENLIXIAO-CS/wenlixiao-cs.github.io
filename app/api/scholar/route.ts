import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { kv } from '@vercel/kv'; // Import Vercel KV client

// Define a key for Vercel KV
const KV_KEY = 'scholar_citations_WGbVYzsAAAAJ'; // Using your Google Scholar user ID in the key

interface CacheData {
  citationCount: string;
  lastUpdated: number;
}

// Read cache from Vercel KV
async function readCache(): Promise<CacheData | null> {
  try {
    const data = await kv.get<CacheData>(KV_KEY);
    return data;
  } catch (error) {
    console.error('Error reading cache from Vercel KV:', error);
  }
  return null;
}

// Write cache to Vercel KV
async function writeCache(citationCount: string): Promise<void> {
  try {
    const cacheData: CacheData = {
      citationCount,
      lastUpdated: Date.now()
    };
    await kv.set(KV_KEY, cacheData);
    // You might want to set an expiration for the KV key itself if desired,
    // though the lastUpdated check handles application-level expiration.
    // Example: await kv.set(KV_KEY, cacheData, { ex: 24 * 60 * 60 }); // Expires in 24 hours
  } catch (error) {
    console.error('Error writing cache to Vercel KV:', error);
  }
}

// Check if cache is valid (less than 24 hours old)
function isCacheValid(lastUpdated: number): boolean {
  const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return Date.now() - lastUpdated < ONE_DAY;
}

export const dynamic = 'force-dynamic'; // Ensures the function is re-executed on each request

export async function GET() {
  try {
    // Check cache first
    const cache = await readCache();
    if (cache && isCacheValid(cache.lastUpdated)) {
      return NextResponse.json({ citations: cache.citationCount });
    }

    // If cache is invalid or not found, proceed to fetch from Google Scholar
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    let newCitationCount: string | null = null;

    try {
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
      await page.goto('https://scholar.google.com/citations?user=WGbVYzsAAAAJ&hl=en', {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      await page.waitForSelector('#gsc_rsb_st', { timeout: 10000 });
      
      newCitationCount = await page.evaluate(() => {
        const stats = document.querySelector('#gsc_rsb_st');
        if (!stats) return null;
        const rows = stats.querySelectorAll('tr');
        for (const row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells[0]?.textContent?.includes('Citations')) {
            return cells[1]?.textContent?.trim() || null;
          }
        }
        return null;
      });

      if (newCitationCount) {
        await writeCache(newCitationCount);
        return NextResponse.json({ citations: newCitationCount });
      }
    } catch (scrapeError) {
        console.error('Error during Puppeteer scraping:', scrapeError);
        // Do not throw here yet, try to return cache if available
    } finally {
      await browser.close();
    }

    // If scraping failed or returned no count, but we have a cached value (even stale), return it.
    if (cache?.citationCount) {
      console.warn('Scraping failed or no new count, returning stale cache.');
      return NextResponse.json({ citations: cache.citationCount });
    }
    
    // If scraping failed AND there's no cache at all.
    throw new Error('Could not fetch citation count and no cache available');

  } catch (error) {
    console.error('Overall error in GET /api/scholar:', error);
    // Final fallback: try to read cache one last time in case of non-scraping errors before failing
    const lastResortCache = await readCache();
    if (lastResortCache?.citationCount) {
      return NextResponse.json({ citations: lastResortCache.citationCount });
    }
    return NextResponse.json({ error: 'Failed to fetch citation count' }, { status: 500 });
  }
} 