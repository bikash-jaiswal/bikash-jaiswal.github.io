---
title: "Framer Motion Scroll Animations"
date: "2024-12-30"
tags: ["Animation", "React", "Framer Motion"]
---

Explored scroll-triggered animations using Framer Motion's `whileInView` prop.

## Key Concepts

- `whileInView` triggers animation when element enters viewport
- `viewport={{ once: true }}` ensures animation only plays once
- Stagger children with `staggerChildren` in parent variants

## Example

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content fades in on scroll
</motion.div>
```

Great for creating engaging landing pages!
