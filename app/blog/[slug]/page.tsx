import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { getPostContent, getPostMetadata } from '../../../lib/posts';
import { PostMetadata } from '../../../types/blog';
import ReadingProgress from './ReadingProgress';
import { Metadata } from 'next';

const RelatedPosts = dynamic(() => import('./RelatedPosts'), {
  loading: () => (
    <div className="grid md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse h-40 bg-gray-800/50 rounded-2xl" />
      ))}
    </div>
  ),
});

const MarkdownContent = dynamic(() => import('./MarkdownContent'), {
  loading: () => (
    <div className="animate-pulse space-y-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 bg-gray-800/50 rounded w-full" />
          <div className="h-4 bg-gray-800/50 rounded w-5/6" />
          <div className="h-4 bg-gray-800/50 rounded w-4/6" />
        </div>
      ))}
    </div>
  ),
});

const TableOfContents = dynamic(() => import('./TableOfContents'));

const ShareButtons = dynamic(() => import('./ShareButtons'));

const NewsletterSignup = dynamic(() => import('../../../components/NewsletterSignup'));

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const SITE_URL = 'https://www.bikashjaiswal.com';

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const allPosts = await getPostMetadata();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const description = post.subtitle || `Read ${post.title} on Bikash Jaiswal's blog`;

  return {
    title: post.title,
    description,
    authors: [{ name: post.author || 'Bikash Jaiswal' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Bikash Jaiswal'],
      url: `${SITE_URL}/blog/${slug}`,
      siteName: 'Bikash Jaiswal',
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export const generateStaticParams = async () => {
  const posts = await getPostMetadata();
  return posts.map((post: PostMetadata) => ({
    slug: post.slug,
  }));
};

export default async function PostDetails({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [content, allPosts] = await Promise.all([getPostContent(slug), getPostMetadata()]);

  if (!content) {
    notFound();
  }

  const post = allPosts.find((p: PostMetadata) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(content);
  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <ReadingProgress readingTime={readingTime} />
      
      <article className="relative">
        {/* Hero Section */}
        <div className="relative mb-12">
          {post.coverImage && (
            <div className="absolute inset-0 h-[400px] md:h-[500px]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-gray-900" />
            </div>
          )}
          
          <div className="relative max-w-4xl mx-auto px-4 pt-8 pb-12">
            <nav className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:border-violet-500/50 transition-all text-sm group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} />
                <span>Back to Blog</span>
              </Link>
            </nav>

            <header className="space-y-6">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-violet-500/20 backdrop-blur-sm text-violet-300 rounded-full text-xs font-medium border border-violet-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {post.title}
              </h1>
              
              {post.subtitle && (
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
                  {post.subtitle}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                    <FiUser size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{post.author || 'Bikash Jaiswal'}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiCalendar size={12} />
                        <time dateTime={post.date}>{formattedDate}</time>
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={12} />
                        {readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-auto">
                  <ShareButtons title={post.title} url={`${SITE_URL}/blog/${slug}`} />
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-12">
            <div className="flex-1 min-w-0">
              <div className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:scroll-mt-24
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:scroll-mt-24
                prose-p:text-gray-300 prose-p:leading-[1.8] prose-p:mb-6
                prose-a:text-violet-400 prose-a:no-underline prose-a:border-b prose-a:border-violet-400/30 hover:prose-a:border-violet-400 prose-a:transition-colors
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-violet-300 prose-code:bg-gray-800/80 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:font-normal
                prose-pre:bg-gray-900/80 prose-pre:backdrop-blur-sm prose-pre:border prose-pre:border-gray-700/50 prose-pre:rounded-xl prose-pre:shadow-2xl
                prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-violet-500/10 prose-blockquote:to-transparent prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-300
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:marker:text-violet-400 prose-li:my-2
                prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-10
                prose-hr:border-gray-800 prose-hr:my-12
              ">
                <MarkdownContent content={content} />
              </div>
            </div>
            
            <TableOfContents content={content} />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto px-4 mt-16">
          <NewsletterSignup variant="card" />
        </div>

        {/* Footer Section */}
        <footer className="max-w-4xl mx-auto px-4 mt-20">
          <div className="pt-12 border-t border-gray-800/50">
            <RelatedPosts posts={allPosts} currentSlug={slug} />
            
            <div className="flex items-center justify-between py-8 mt-8 border-t border-gray-800/50">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-violet-500/50 transition-all group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
                <span>View all posts</span>
              </Link>
              
              <ShareButtons title={post.title} url={`${SITE_URL}/blog/${slug}`} />
            </div>
          </div>
        </footer>
      </article>
    </>
  );
}
