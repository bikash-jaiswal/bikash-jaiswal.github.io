import React from "react";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import matter from "gray-matter";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import getPostMetadata from "../../Component/getPostMetaData";

const getPostContent = (slug) => {
  const folder = "app/posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterContent = matter(content);
  return matterContent;
};

export const generateStaticParams = async() => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const postDetails = ({ params }) => {
  const postid = params.slug;
  const post = getPostContent(postid);
  return (
    <div className="mt-8 text-white">
      <Link href="/" className="flex items-center text-blue-600 ">
        <FaArrowLeft className="mr-2" />
        <p className="text-lg ">Back to Home</p>
      </Link>
       <div className="my-12 text-center  text-white ">
        <h1 className="text-2xl text-white ">{post.data.title}</h1>
        <p className="mt-2">{post.data.date}</p>
      </div>
      <article className="min-w-full prose-img:mx-auto prose p-4 dark:prose-invert text-white font-normal">
        <ReactMarkdown remarkPlugins={[gfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default postDetails;
