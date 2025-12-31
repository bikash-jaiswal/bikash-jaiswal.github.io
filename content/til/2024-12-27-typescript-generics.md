---
title: "TypeScript Generics Deep Dive"
date: "2024-12-27"
tags: ["TypeScript", "Generics"]
---

Deep dive into generic types and how to create reusable, type-safe utility functions.

## Basic Generic Function

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);      // type: number
const str = identity("hello"); // type: string
```

## Generic Constraints

Limit what types can be passed:

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");  // ✅ strings have length
logLength([1, 2, 3]); // ✅ arrays have length
logLength(123);       // ❌ numbers don't have length
```

Generics make code both flexible AND type-safe!
