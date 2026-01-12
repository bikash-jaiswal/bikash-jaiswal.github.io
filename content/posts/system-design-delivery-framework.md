---
title: System Design Interview Framework - A Step-by-Step Guide
author: Bikash Jaiswal
date: '2026-01-11'
subtitle: A structured approach to ace system design interviews. Learn how to break down complex systems, identify requirements, and design scalable solutions.
tags:
  - System Design
  - Interview Prep
  - Software Architecture
  - Scalability
---

# System Design Delivery Framework
The System Design Delivery Framework is a structured approach to ace system design interviews. 

## Requirements Gathering (~5 minutes)
In an interview, you always want to clarify requirements first:
1. Who uses this API?
2. What operations do they need?
3. What are the success criteria?

Break the requirements into two categories:
### 1. Functional Requirements
Oftentimes this is a back and forth with your interviewer.

* does the system need to do X?
* does the system need to do Y?
* does the system need to do Z?

> The task is to identify top 3 features as Functional Requirements and focus on them. 
Functional requirements are your "Users/Clients should be able to..." statements.

Oftentimes this is a back and forth with your interviewer.

Example for Twitter: 
 1. Users should be able to post tweets
 2. Users should be able to follow other users
 3. Users should be able to like tweets

Example for E-commerce: 
 1. Users should be able to add items to cart
 2. Users should be able to check out
 3. Users should be able to pay for items

Example for Cache: 
 1. Users should be able to add items to cache
 2. Users should be able to get items from cache
 3. Users should be able to remove items from cache

### 2. Non-functional Requirements
Talks about the system's performance, scalability, and other non-functional requirements.

Example for Twitter: 
 1. The system should be high available, prioritize availability over consistency
 2. The system should be scalable to support 100M+ DAU
 3. The system should be low latency, response time should be less than 200ms.

> The task is to identify top 3-5 non-functional requirements and focus on them.
> Put in the context of the system where it is being used.
> eg:The system should have low latency search, < 500ms

## Core Entities (resources) (2 minutes)
Identify the core entities in the system.
Ask yourself following questions:
1. Who are the actors in the system? Are they overlapping?
2. What are the nouns or resources necessary to satisfy the functional requirements?

Think in terms of nouns (resources) — not actions. For example:
For booking API -> movies, showtimes, bookings, users
For Twitter: eg -> User, Tweet, Like, Follow

For E-commerce: 
eg:User, Product, Order, Cart, Payment

For Cache: 
eg:User, Product, Order, Cart, Payment

## API  or System Interface Design (~5 minutes)
1. REST API: Default. Use when connect to external services. Uses HTTP verbs (GET, POST, PUT, DELETE) to perform CRUD operations on resources. 
2. RPC: gRPC, Use for internal APIs when performance is critical. It uses binary serialization and HTTP/2, making it significantly faster than JSON over HTTP. 
3. GraphQL: Use when you need to fetch multiple resources in a single request

Also for real-time APIs, you can use WebSockets or Server-Sent Events (SSE). 
But for most cases, REST API is sufficient.

for Twitter end to end system design, you can use REST API
```commandline
GET /v1/tweets/{tweet_id} -> Tweet

POST /v1/tweets
body: {
    "text": "Hello World"
}
POST /v1/follows
body: {
    "user_id": "123",
    "followed_user_id": "456"
}

GET /v1/feed/{user_id} -> Feed
```

> Resources should be plural nouns that represent things in your system
> use plural resource names (tweets, not tweet)
> The current user is derived from the authentication token in the request header, not from request bodies or path parameters.

## High Level System Design (~10-15minutes)
By now you should have a good understanding of the system and its requirements, Core entities and API design
Now start thinking about the high level architecture of the system.
* Drawing boxes and arrows to represent the different components of your system 
* Components are basic building blocks like servers, databases, caches, etc 
* use [Excalidraw](https://excalidraw.com/) to draw the architecture

> Ask your recruiter what software you'll be using for your interview and practice with it ahead of time. You don't want to be fumbling with the software during your interview.

* Be explicit about how data flows through the system and what state (either in databases, caches, message queues, etc.) changes with each request, starting from API requests and ending with the response. 


## Deep dive into the system (~10 minutes)
Now that you have a high-level design in place you're going to use the remaining 10 or so minutes of the interview to harden your design by:
Ensuring it meets all of your non-functional requirements
* Addressing edge cases
* Identifying and addressing issues and bottlenecks
* Improving the design based on probes from your interviewer.

Use this time to strengthen your design by:

1. Confirming it meets all technical requirements
2. Addressing potential issues and edge cases
3. Finding and fixing performance bottlenecks
4. Improving based on interviewer feedback

### Experience Level Matters:
1. Junior Candidates: Interviewer will guide you to improvement areas
2. Senior Candidates: Expected to identify and solve design challenges independently

Twitter Example:
Talk about Scaling to 100M+ Users using below components
* Horizontal scaling 
* Caching strategies 
* Database sharding 
* Low-Latency Feed Delivery 
* Fan-out-on-read vs fan-out-on-write 
* Caching implementation
This approach ensures your design is both robust and practical.

> Finally, Make sure you give your interviewer room to ask questions and probe your design. Chances are they have 
> specific signals they want to get from you, and you're going to miss it if you're too busy talking. Plus, you'll hurt 
> your evaluation on communication and collaboration  
