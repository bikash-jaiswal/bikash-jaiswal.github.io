---
title: "CSS Custom Properties for Theming"
date: "2024-12-29"
tags: ["CSS", "Theming", "Dark Mode"]
---

Implemented a theming system using CSS variables for seamless dark/light mode switching.

## The Approach

Define variables in `:root` for light mode, override in a `.dark` class:

```css
:root {
  --bg-primary: #fafaf9;
  --text-primary: #171717;
  --accent: #6d28d9;
}

.dark {
  --bg-primary: #0a0a0b;
  --text-primary: #fafafa;
  --accent: #8b5cf6;
}
```

## Benefits

- Single source of truth for colors
- Easy to maintain and update
- Smooth transitions between themes
- Works with Tailwind CSS via `theme()` function
