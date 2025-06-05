import { readdir, readFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import matter from "gray-matter";
import path from "path";
import { cache } from "react";
import { PostContent, PostMetadata } from "../types/blog";
import { sortByDate } from "../utils/date";
import logger from "../utils/logger";

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
  logger.startTimer('getPostMetadata');

  if (!existsSync(POSTS_DIRECTORY)) {
    mkdirSync(POSTS_DIRECTORY, { recursive: true });
    logger.info(`Created posts directory: ${POSTS_DIRECTORY}`);
  }

  try {
    const files = await readdir(POSTS_DIRECTORY);
    logger.debug(`Found ${files.length} files in posts directory`);
    
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
    logger.debug(`Processed ${posts.length} markdown files`);
    
    // Use a proper type guard to filter out null posts
    const result = sortByDate(posts.filter((post): post is PostMetadata => post !== null));
    logger.info(`Returning ${result.length} valid posts`);
    logger.endTimer('getPostMetadata');
    return result;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    logger.error("Error reading posts directory:", error);
    return [];
  }
});

// Add memory cache for post contents
const postContentCache: Record<string, string | null> = {};

export const getPostContent = cache(async (slug: string) => {
  logger.startTimer(`getPostContent:${slug}`);

  // Return from cache if available
  if (slug in postContentCache) {
    logger.debug(`Cache hit for post: ${slug}`);
    logger.endTimer(`getPostContent:${slug}`);
    return postContentCache[slug];
  }
  
  logger.debug(`Cache miss for post: ${slug}`);
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);

  if (!existsSync(filePath)) {
    logger.warn(`Post not found: ${slug}`);
    postContentCache[slug] = null;
    logger.endTimer(`getPostContent:${slug}`);
    return null;
  }

  try {
    const fileContent = await readFile(filePath, "utf8");
    logger.debug(`Read ${fileContent.length} bytes from ${slug}.md`);
    
    const matterResult = matter(fileContent);
    
    if (!validatePostContent(matterResult)) {
      logger.error(`Invalid content in ${slug}.md`);
      postContentCache[slug] = null;
      logger.endTimer(`getPostContent:${slug}`);
      return null;
    }

    // Cache the result before returning
    postContentCache[slug] = matterResult.content;
    logger.info(`Successfully loaded and cached post: ${slug}`);
    logger.endTimer(`getPostContent:${slug}`);
    return matterResult.content;
  } catch (error) {
    console.error(`Error reading ${slug}.md:`, error);
    logger.error(`Error reading ${slug}.md:`, error);
    postContentCache[slug] = null;
    logger.endTimer(`getPostContent:${slug}`);
    return null;
  }
});
