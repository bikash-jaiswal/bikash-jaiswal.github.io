import Link from "next/link";
import React from "react";
import getPostMetadata from "../Component/getPostMetaData";


const BlogPage = () => {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <article key={post.slug} className="text-white" >
      <div>
        <Link href={`/blog/${post.slug}`}>
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <h4 className="font-semibold">{post.title}</h4>
            <p className="text-xs font-light">{post.date}</p>
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
    <div className="p-4"> {postPreviews}</div>
  </div>
  )};

export default BlogPage;
