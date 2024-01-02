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
      subtitle: matterResult.data.subtitle,
      date: matterResult.data.date,
      author: matterResult.data.author,
      slug: fileName.replace(".md", ""),
    };
  });

  return posts;
};

export default getPostMetadata