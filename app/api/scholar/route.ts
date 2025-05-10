import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Cache file path
const CACHE_FILE = path.join(process.cwd(), 'scholar-cache.json');

interface CacheData {
  citationCount: string;
  lastUpdated: number;
}

// Read cache from file
function readCache(): CacheData | null {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
}

// Write cache to file
function writeCache(citationCount: string) {
  try {
    const cacheData: CacheData = {
      citationCount,
      lastUpdated: Date.now()
    };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
  } catch (error) {
    console.error('Error writing cache:', error);
  }
}

// Check if cache is valid (less than 24 hours old)
function isCacheValid(lastUpdated: number): boolean {
  const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  return Date.now() - lastUpdated < ONE_DAY;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check cache first
    const cache = readCache();
    if (cache && isCacheValid(cache.lastUpdated)) {
      return NextResponse.json({ citations: cache.citationCount });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Set a realistic user agent
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
      
      // Navigate to your Google Scholar profile
      await page.goto('https://scholar.google.com/citations?user=WGbVYzsAAAAJ&hl=en', {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Wait for the citation count to load
      await page.waitForSelector('#gsc_rsb_st', { timeout: 10000 });
      
      // Extract the citation count
      const citationCount = await page.evaluate(() => {
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

      if (citationCount) {
        // Update cache
        writeCache(citationCount);
        return NextResponse.json({ citations: citationCount });
      }

      // If we couldn't find the citation count but have a cached value, return that
      if (cache?.citationCount) {
        return NextResponse.json({ citations: cache.citationCount });
      }

      throw new Error('Could not fetch citation count');
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error('Error fetching citation count:', error);
    // Return cached value even if expired, if available
    const cache = readCache();
    if (cache?.citationCount) {
      return NextResponse.json({ citations: cache.citationCount });
    }
    return NextResponse.json({ error: 'Failed to fetch citation count' }, { status: 500 });
  }
} 