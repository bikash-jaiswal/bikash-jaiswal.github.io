import Link from "next/link";
import React from "react";
import fs from "fs";
import matter from "gray-matter";

const getPostMetadata = () => {
  const folder = "app/posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`app/posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      author: matterResult.data.author,
      slug: fileName.replace(".md", ""),
    };
  });

  return posts;
};

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
