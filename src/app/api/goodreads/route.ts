import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    // Use the review list page which shows books in a table format
    const goodreadsUrl = 'https://www.goodreads.com/review/list/113257878?ref=nav_mybooks';
    
    // Fetch the Goodreads review list page
    const response = await fetch(goodreadsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Goodreads page: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const books: Array<{ title: string; coverUrl: string; author: string; link: string }> = [];
    const seenUrls = new Set<string>();

    // Parse the table rows - each row represents a book
    $('table#books tbody tr').each((index, element) => {
      if (books.length >= 5) return false; // Stop after 5 books
      
      const $row = $(element);
      
      // Find the cover image
      const $img = $row.find('td.cover img').first();
      let coverUrl = $img.attr('src') || $img.attr('data-src') || '';
      
      // Handle lazy-loaded images
      if (!coverUrl && $img.attr('data-lazy')) {
        coverUrl = $img.attr('data-lazy') || '';
      }
      
      if (!coverUrl || coverUrl.includes('nophoto') || seenUrls.has(coverUrl)) {
        return; // Skip if no cover or duplicate
      }
      
      seenUrls.add(coverUrl);
      
      // Ensure absolute URL for cover image
      if (coverUrl.startsWith('//')) {
        coverUrl = `https:${coverUrl}`;
      } else if (!coverUrl.startsWith('http')) {
        coverUrl = `https:${coverUrl}`;
      }
      
      // Clean up the URL - use original size to avoid 403 errors
      coverUrl = coverUrl.trim();
      
      // Find the title link
      const $titleLink = $row.find('td.title a[href*="/book/show/"]').first();
      const link = $titleLink.attr('href') || '';
      const title = $titleLink.attr('title') || $titleLink.text().trim() || '';
      
      // Find the author
      const $authorLink = $row.find('td.author a').first();
      const author = $authorLink.text().trim() || '';
      
      if (coverUrl && title) {
        books.push({
          title: title,
          coverUrl: coverUrl, // Use direct URL first
          author: author,
          link: link.startsWith('http') ? link : `https://www.goodreads.com${link}`,
        });
      }
    });
    
    // If we didn't get enough from the table, try alternative selectors
    if (books.length < 5) {
      $('tr[itemtype="http://schema.org/Book"]').each((index, element) => {
        if (books.length >= 5) return false;
        
        const $row = $(element);
        const $img = $row.find('img.bookCover, img[src*="book"]').first();
        let coverUrl = $img.attr('src') || $img.attr('data-src') || '';
        
        if (coverUrl && !coverUrl.includes('nophoto') && !seenUrls.has(coverUrl)) {
          seenUrls.add(coverUrl);
          
          // Ensure absolute URL
          if (coverUrl.startsWith('//')) {
            coverUrl = `https:${coverUrl}`;
          } else if (!coverUrl.startsWith('http')) {
            coverUrl = `https:${coverUrl}`;
          }
          
          // Use original size to avoid 403 errors
          coverUrl = coverUrl.trim();
          
          const $link = $row.find('a[href*="/book/show/"]').first();
          const link = $link.attr('href') || '';
          const title = $link.attr('title') || $link.text().trim() || '';
          const author = $row.find('a.authorName, .authorName').first().text().trim() || '';
          
          if (coverUrl && title) {
            books.push({
              title: title,
              coverUrl: coverUrl, // Use direct URL first
              author: author,
              link: link.startsWith('http') ? link : `https://www.goodreads.com${link}`,
            });
          }
        }
      });
    }

    // Return the books (up to 5)
    return NextResponse.json({ books: books.slice(0, 5) });
  } catch (error) {
    console.error('Error fetching Goodreads data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book data', books: [] },
      { status: 500 }
    );
  }
}

