import HeroSection from '../components/HeroSection';
import ProofSection from '../components/ProofSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import WhatImBuildingSection from '../components/WhatImBuildingSection';
import SectionHeader from '../components/ui/SectionHeader';
import { Suspense } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getPostMetadata } from '../lib/posts';
import { BlogPostPreview } from '../components/BlogPostPreview';
import { PostMetadata } from '../types/blog';

export default async function Home(): Promise<React.ReactElement> {
  const allPosts = await getPostMetadata();
  const recentPosts = allPosts.slice(0, 2);

  return (
    <main className="flex flex-col">
      <HeroSection />
      <CapabilitiesSection />
      <ProofSection />
      
      <section className="py-24">
        <div className="container-narrow">
          <SectionHeader
            kicker="Writing"
            title="Recent thoughts."
            link={{
              href: '/blog',
              label: 'All articles',
            }}
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <Suspense fallback={<div>Loading recent articles...</div>}>
              {recentPosts.length > 0 ? (
                recentPosts.map((post: PostMetadata) => (
                  <BlogPostPreview key={post.slug} post={post} />
                ))
              ) : (
                <div className="py-6 text-gray-400">
                  No articles available yet.
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </section>

      <WhatImBuildingSection />
    </main>
  );
}
