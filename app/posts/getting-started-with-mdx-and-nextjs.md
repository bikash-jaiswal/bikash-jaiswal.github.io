---
title: "Getting Started with MDX in Next.js: A Practical Guide"
subtitle: "A beginner-friendly tutorial to level up your Next.js development with MDX"
date: "2024-01-15"
---

# MDX
You can use your JSX Component inside your markdown file. 

> npm install @next/mdx @mdx-js/loader @mdx-js/react

## Configuring the next.config.js file
The `next.config.js` file tells the framework that files with .md or .mdx extensions should also be treated as pages/routes at build time because the blog folder that contains the articles lives in the pages directory.

```nodejs
const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
}
 
module.exports = withMDX(nextConfig)
```

>ref: https://codesandbox.io/s/next-mdx-blog-7o50q?file=/pages/blog/post-1/index.mdx