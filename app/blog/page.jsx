import Link from "next/link";
import React from "react";
import getPostMetadata from "../Component/getPostMetaData";


const BlogPage = () => {
  const postMetadata = getPostMetadata();
  const sortedPosts = postMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));

  const postPreviews = sortedPosts.map((post) => (
    <article key={post.slug} className="text-white" >
      <div>
        <Link href={`/blog/${post.slug}`}>
          <div className="mb-6">
            <div className="flex items-center justify-between gap-40">
              <h4 className="font-semibold">{post.title}</h4>
              <p className="text-lg">{post.date}</p>
            </div>
          </div>
          <p className="text-grey-500">{post.subtitle}</p>
        </Link>
      </div>
    </article>
  ));
  return (
    <div className="">
      <div className="font-bold text-white p-4 text-center">Recent Blogs</div>
      <section class="flex justify-around">
        <div class="p-4">
          {postPreviews}
        </div>
      </section>

    </div>
  )
};

export default BlogPage;
