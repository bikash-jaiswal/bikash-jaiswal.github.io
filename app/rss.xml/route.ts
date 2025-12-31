import { getPostMetadata } from '../../lib/posts';
import { generateRssFeed } from '../../lib/rss';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getPostMetadata();
  const feed = generateRssFeed(posts);

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
