// Mark this file as server-only to prevent client-side imports
'use server';

import { readdir, readFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import matter from "gray-matter";
import path from "node:path";
import { cache } from "react";
import { PostContent, PostMetadata } from "../types/blog";
import { sortByDate } from "../utils/date";

const POSTS_DIRECTORY = path.join(process.cwd(), "app/posts");

function validatePostMetadata(metadata: any): metadata is PostMetadata {
  return (
    typeof metadata === "object" &&
    typeof metadata.title === "string" &&
    typeof metadata.date === "string" &&
    typeof metadata.slug === "string" &&
    (!metadata.subtitle || typeof metadata.subtitle === "string")
  );
}

function validatePostContent(content: any): content is PostContent {
  return (
    typeof content === "object" &&
    typeof content.content === "string" &&
    typeof content.data === "object" &&
    typeof content.data.title === "string" &&
    typeof content.data.date === "string" &&
    (!content.data.subtitle || typeof content.data.subtitle === "string")
  );
}

function createSlug(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function formatDate(date: string): string {
  return new Date(date).toISOString().split("T")[0];
}


export const getPostMetadata = cache(async () => {
  if (!existsSync(POSTS_DIRECTORY)) {
    mkdirSync(POSTS_DIRECTORY, { recursive: true });
  }

  try {
    const files = await readdir(POSTS_DIRECTORY);
    const postsPromises = files
      .filter((file: string) => file.endsWith(".md"))
      .map(async (file: string) => {
        const filePath = path.join(POSTS_DIRECTORY, file);
        const slug = createSlug(file);

        try {
          const fileContent = await readFile(filePath, "utf8");
          const matterResult = matter(fileContent);

          const metadata = {
            ...matterResult.data,
            date: formatDate(matterResult.data.date),
            slug,
          };

          if (!validatePostMetadata(metadata)) {
            console.error(`Invalid metadata in ${file}`);
            return null;
          }

          return metadata;
        } catch (error) {
          console.error(`Error reading ${file}:`, error);
          return null;
        }
      });

    const posts = await Promise.all(postsPromises);
    // Use a proper type guard to filter out null posts
    return sortByDate(posts.filter((post): post is PostMetadata => post !== null));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
});

export const getPostContent = cache(async (slug: string) => {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);

  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = await readFile(filePath, "utf8");
    const matterResult = matter(fileContent);

    if (!validatePostContent(matterResult)) {
      console.error(`Invalid content in ${slug}.md`);
      return null;
    }

    return matterResult.content;
  } catch (error) {
    console.error(`Error reading ${slug}.md:`, error);
    return null;
  }
});
