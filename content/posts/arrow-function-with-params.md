---
title: Arrow functions in JavaScript
author: Bikash Jaiswal
date: '2024-01-16'
subtitle: Learn how to use arrow functions with or without parameters in JavaScript.
tags:
  - JavaScript
  - Arrow Functions
  - Programming
---

# Arrow functions with Parameters in JavaScript

In JavaScript, arrow functions provide a concise syntax for writing functions. They can also take parameters, allowing you to create more flexible and expressive code.

![Arrow Function](/images/arrow-function.png)

The basic syntax of an arrow function looks like this:

```
() => expression

param => expression

(param) => expression

(param1, paramN) => expression

() => {
  statements
}

param => {
  statements
}

(param1, paramN) => {
  statements
}

```

We Should store the arrow function expression inside a variable or constant or use it as a callback function

### Variable

```
let myFunction = (a, b) => {
    //function body
}

```

### A callback function

```
button.addEventListener('click', () => {
  console.log('hello world');
});

```

## Single Parameters

When we have single parametes, we can exclude the parantheses from the defination:

```
 const myFunction = p => {
    console.log(p)
    return P * P
 }

```

if we remove console printing, the above function will only contains a single expression.
In such scenario the braces not required.

```
const cube = p => p * p * p
```

```
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]

```

## Arrow Function comes many limitation:

### 1. 'this', 'arguments', and 'super' bindings:

- Arrow functions do not have their own bindings to `this`, `arguments`, or `super`.
- They inherit these values from the enclosing scope, unlike traditional functions that create their own bindings.
- Caution is advised when using arrow functions as methods within objects, as the intended `this` context might not be as expected.

### 2. Cannot be used as `constructors`:

- Arrow functions cannot be used with the `new` keyword to create instances.
- Attempting to use them as constructors will result in a `TypeError`.
- Additionally, arrow functions lack access to the `new.target` keyword, which is often used within constructors.

### 3. Cannot use `yield` and are not generator functions:

- Arrow functions cannot contain the `yield` keyword in their body.
- Consequently, they cannot be employed as generator functions, which are functions capable of producing a sequence of values over time using the `yield` mechanism.
- If generator functionality is required, traditional functions should be used instead.

## Further Reading Resources

1. [MDN Web Docs - Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
