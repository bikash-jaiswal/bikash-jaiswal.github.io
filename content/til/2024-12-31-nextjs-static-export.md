---
title: "Next.js Static Export for GitHub Pages"
date: "2024-12-31"
tags: ["Next.js", "Deployment", "GitHub Pages"]
---

Learned how to configure Next.js 15 for static export with GitHub Pages deployment.

## Key Takeaways

- Use `output: 'export'` in `next.config.js`
- Set `trailingSlash: true` for proper routing
- Add `dynamic = 'force-static'` to route handlers
- Images need `unoptimized: true` for static export

## Code Example

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

This enables deploying Next.js apps to any static hosting service!
