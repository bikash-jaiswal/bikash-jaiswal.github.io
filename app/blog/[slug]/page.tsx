import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { FaArrowLeft } from "react-icons/fa";
import { getPostContent, getPostMetadata } from "../../services/posts";
import { PostMetadata } from "../../types/blog";

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  const posts = await getPostMetadata();
  return posts.map((post: PostMetadata) => ({
    slug: post.slug,
  }));
};

export default async function PostDetails({ params }: Props) {
  const [content, allPosts] = await Promise.all([
    getPostContent(params.slug),
    getPostMetadata()
  ]);
  const post = allPosts.find((p: PostMetadata) => p.slug === params.slug);

  if (!content || !post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-400 hover:text-blue-500 transition-colors"
          aria-label="Back to blog posts"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-violet-400 mb-2">{post.title}</h1>
          <div className="flex items-center justify-between">
            <time className="text-gray-400" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          {post.subtitle && (
            <p className="text-xl text-gray-300 mt-4">{post.subtitle}</p>
          )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
