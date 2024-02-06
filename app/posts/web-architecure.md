---
title: "Web Architecture 101: A Developer's Essential Handbook"
subtitle: "Simplified Guidance for Building Robust Web Solutions"
author: "Bikash Jaiswal"
date: "2024-02-05"
---

## What is Web Architecture?
Web architecture is like the blueprint of a website, deciding how all the parts fit together to make it work. Imagine it as the design and structure that ensures a website runs smoothly and delivers content to users. It's crucial to make websites perform well, handle more visitors, and stay easy to update.

## Parts of Web Architecture
Think of a website like a team. Each member has a specific role:

- **Client:** This is you – using a web browser, mobile app, or computer program to access a website.
  
- **Server:** Picture this as the brain – a computer or group of them storing and sending website content to users.

- **Network:** It's like the roads connecting the client and server, allowing them to communicate.

- **Content:** The information on the website, like text, pictures, and videos.

- **Database:** This is where the website stores and organizes data, like user information.

## Different Ways to Build Websites

We can build websites in different ways, depending on what we need. Here are three common methods:

### 1. Monolithic Architecture

Imagine all team members tightly linked, making it easy to work together. But, it can be tough to grow and keep everything organized.

![Monolithic architecture](url-to-image)

### 2. Microservices Architecture

Picture a team with independent members, each doing their own thing. It's easier to grow and keep things tidy, but it's a bit more complex.

![Microservices architecture](url-to-image)

### 3. Serverless Architecture

This is like using ready-made tools to build a website. It's simple for growth and maintenance, but it can be tricky for developers.

![Serverless architecture](url-to-image)

## Things to Think About

When designing a website, there are a few important things to consider:

- **Speed:** How quickly does the website load and respond?
  
- **Size:** Can the website handle more people using it?
  
- **Updates:** How easy is it to change and improve the website?

- **Safety:** Is the website and its information secure?

- **Cost:** How much does it take to build and keep the website running?

By thinking about these things, developers can make websites that work well, stay reliable, and are easy to take care of.

# Overview of REST APIs: Constraints and Endpoints Simplified

## What is REST?

Think of REST like a set of rules for how computer programs talk to each other on the internet. REST APIs are like instruction manuals that tell software how to share information. Let's look at two important parts: constraints and endpoints.

## REST Constraints:

1. **Stateless:** Imagine each conversation is a fresh start. When you ask for something, you need to provide all the details. No secrets are stored between talks. This makes things clear and reliable.

2. **Client-Server Architecture:** Picture it like a chef and a waiter. The chef (server) cooks the food (handles data and logic), and the waiter (client) serves it to the customer (user). They're separate but work together.

3. **Uniform Interface:** This is like having a common language. You identify things with names (like web addresses), talk about them in a certain way (using specific formats), and use tags to know what's what. It's like a set of rules for a game.

4. **Cacheability:** Think of it like remembering things. If you already know an answer, you don't have to ask again. This makes things faster and saves work.

5. **Layered System:** It's like building a tower with different floors. Each floor has its job, and they work together to make a strong structure. This helps make things flexible and able to handle a lot.

6. **Code on Demand (Optional):** Sometimes, the server can share a small program with the client. It's like giving a tool to a friend to help with a task. This is like an extra feature but not always used.

## REST Endpoints:

Endpoints are like specific doors to access different parts of the information. Here are some types:

- **GET:** Imagine asking for a menu at a restaurant. You get to see what's available.

- **POST:** It's like placing an order. You tell the kitchen (server) what you want to add.

- **PUT:** Imagine telling the kitchen to replace a dish on the menu with a new one.

- **DELETE:** It's like saying, "I don't want this anymore, take it off the menu."

- **PATCH:** Instead of changing everything, you tell the kitchen what small adjustments to make to a dish.

- **OPTIONS:** It's like asking the restaurant, "What can I do here? What are the rules?"

Understanding these rules helps programmers create apps and websites that can talk to each other in a friendly and organized way. It's like having a common language for computers on the internet!

An example of a RESTful API for a blog website using `fastapi` in python.

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

# Sample data for blog posts
blog_posts = [
    {"id": 1, "title": "First Post", "content": "This is the content of the first post."},
    {"id": 2, "title": "Second Post", "content": "Content for the second blog post."},
]

# Endpoint to retrieve all blog posts
@app.get("/posts")
def get_all_posts():
    return blog_posts

# Endpoint to retrieve a specific blog post by ID
@app.get("/posts/{post_id}")
def get_post_by_id(post_id: int):
    for post in blog_posts:
        if post["id"] == post_id:
            return post
    raise HTTPException(status_code=404, detail="Post not found")

# Endpoint to create a new blog post
@app.post("/posts")
def create_post(new_post: dict):
    post_id = len(blog_posts) + 1
    new_post["id"] = post_id
    blog_posts.append(new_post)
    return new_post

# Endpoint to update an existing blog post
@app.put("/posts/{post_id}")
def update_post(post_id: int, updated_post: dict):
    for index, post in enumerate(blog_posts):
        if post["id"] == post_id:
            blog_posts[index] = {**post, **updated_post}
            return blog_posts[index]
    raise HTTPException(status_code=404, detail="Post not found")

# Endpoint to delete a specific blog post by ID
@app.delete("/posts/{post_id}")
def delete_post(post_id: int):
    for index, post in enumerate(blog_posts):
        if post["id"] == post_id:
            deleted_post = blog_posts.pop(index)
            return deleted_post
    raise HTTPException(status_code=404, detail="Post not found")


```