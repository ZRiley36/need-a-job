import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
    }

    // Decode the image URL - handle both encoded and already-decoded URLs
    let decodedUrl: string;
    try {
      decodedUrl = decodeURIComponent(imageUrl);
      // If it's already a full URL starting with https, use it
      if (!decodedUrl.startsWith('http')) {
        decodedUrl = imageUrl;
      }
    } catch {
      // If decoding fails, use the URL as-is
      decodedUrl = imageUrl;
    }

    // Ensure it's a valid URL
    if (!decodedUrl.startsWith('http://') && !decodedUrl.startsWith('https://')) {
      console.error('Invalid image URL:', decodedUrl);
      throw new Error('Invalid image URL format');
    }

    console.log('Fetching image from:', decodedUrl);

    // Fetch the image from Goodreads with more realistic browser headers
    const imageResponse = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.goodreads.com/',
        'Origin': 'https://www.goodreads.com',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-site',
        'Cache-Control': 'no-cache',
      },
      // Don't follow redirects automatically
      redirect: 'follow',
    });

    if (!imageResponse.ok) {
      console.error(`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`);
      throw new Error(`Failed to fetch image: ${imageResponse.status}`);
    }

    // Get the image data
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error proxying Goodreads image:', error);
    // Return a placeholder image instead of JSON error
    const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="150"><rect width="100" height="150" fill="#333"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-size="12">No Cover</text></svg>`;
    return new NextResponse(placeholderSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache',
      },
    });
  }
}

