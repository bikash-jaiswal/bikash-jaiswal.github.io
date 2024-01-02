import Link from "next/link";
import React from "react";
import getPostMetadata from "../Component/getPostMetaData";


const BlogPage = (props) => {
  const postMetadata = getPostMetadata();
  const blogNum = props.blogNum
  const sortedPosts = postMetadata.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const blogSize = typeof blogNum !== "undefined" ? Number(blogNum) : sortedPosts.length;

  const postPreviews = sortedPosts.slice(0, blogSize).map((post) => (
    <article key={post.slug} className="text-white">
      <div>
        <Link href={`/blog/${post.slug}`}>
          <div className="mb-6 border p-4 block w-full hover:border-blue-500 focus:border-blue-500 focus:outline-none">
            <div className="flex items-center justify-between gap-40">
              <h4 className="text-sm">{post.title}</h4>
              <p className="text-xs w-20">{post.date}</p>
            </div>
             <p className="text-xs text-gray-500">{post.subtitle}</p>
          </div>
         
        </Link>
      </div>
    </article>
  ));

  return (
    <div>
      <div className="font-bold text-white p-2 text-center">Recent Blogs</div>
      <section className="flex flex-col justify-around mx-4 p-2">
        <div className="">{postPreviews}</div>
        {typeof blogNum !== "undefined" && (
          <Link href="/blog">
            <button className="text-white p-2 w-40 border-solid border-2 border-white hover:bg-violet-600">
              Read More
            </button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
