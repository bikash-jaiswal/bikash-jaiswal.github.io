---
title: "React Server Components in Next.js 15"
date: "2024-12-28"
tags: ["React", "Next.js", "RSC"]
---

Understanding the difference between server and client components in Next.js 15.

## Server Components (Default)

- Render on the server only
- Can directly access databases, file system
- Cannot use hooks like `useState`, `useEffect`
- Smaller bundle size

## Client Components

Add `'use client'` directive at the top:

```tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Rule of Thumb

Start with Server Components, add `'use client'` only when you need interactivity.
