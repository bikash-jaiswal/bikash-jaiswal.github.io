import { PostMetadata } from '../types/blog';

const SITE_URL = 'https://www.bikashjaiswal.com';
const SITE_TITLE = 'Bikash Jaiswal';
const SITE_DESCRIPTION = 'Articles and insights on software development, technology, investing, and entrepreneurship.';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRssFeed(posts: PostMetadata[]): string {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const itemsXml = sortedPosts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const categories = post.tags
        ?.map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join('\n        ') || '';

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.subtitle || post.title)}</description>
      ${categories}
      ${post.author ? `<author>${escapeXml(post.author)}</author>` : ''}
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.ico</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  return rss;
}

export function generateAtomFeed(posts: PostMetadata[]): string {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const entriesXml = sortedPosts
    .map((post) => {
      const postUrl = `${SITE_URL}/blog/${post.slug}`;
      const updated = new Date(post.date).toISOString();
      const categories = post.tags
        ?.map((tag) => `<category term="${escapeXml(tag)}"/>`)
        .join('\n      ') || '';

      return `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${postUrl}"/>
    <id>${postUrl}</id>
    <updated>${updated}</updated>
    <summary>${escapeXml(post.subtitle || post.title)}</summary>
    ${categories}
    ${post.author ? `<author><name>${escapeXml(post.author)}</name></author>` : ''}
  </entry>`;
    })
    .join('\n');

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)}</title>
  <link href="${SITE_URL}"/>
  <link href="${SITE_URL}/atom.xml" rel="self"/>
  <id>${SITE_URL}/</id>
  <updated>${new Date().toISOString()}</updated>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <author>
    <name>Bikash Jaiswal</name>
  </author>
  ${entriesXml}
</feed>`;

  return atom;
}
