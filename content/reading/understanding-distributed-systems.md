---
title: Understanding Distributed Systems
author: Roberto Vitillo
category: book
status: reading
url: https://understandingdistributed.systems/
amazonUrl: https://amzn.to/4ptQYdt
coverImage: /images/reading/understanding-distributed-systems.png
date: '2026-01-05'
notes: Practical guide to distributed systems concepts
rating: 4
tags:
  - Distributed Systems
  - System Design
  - Networking
relatedPosts:
  - why-system-design
  - network-protocols-distributed-systems
---

## My Progress

- [x] Part I: Communication
- [ ] Part II: Coordination
- [ ] Part III: Scalability
- [ ] Part IV: Resiliency

## Overview

"Understanding Distributed Systems" by Roberto Vitillo is a foundational guide to building distributed systems. 
It covers the fundamental concepts needed to design, build, and operate distributed applications.

Read the book to understand the fundamentals of distributed systems.

Some related posts:
- [Every Developer Should Know System Design](/blog/why-system-design) : why system design is important
- [Network Protocols for Distributed Systems](/blog/network-protocols-distributed-systems) : Dedicated blogs on network protocols

## Why This Book?

This book stands out because it:
- Focuses on practical, real-world scenarios
- Explains complex concepts in simple terms
- Covers modern distributed systems patterns
- Includes hands-on examples and case studies

## Key Topics Covered

### Communication
- Network protocols: TCP, UDP
- TCP advantages for distributed systems: Reliability, ordered delivery, flow control, congestion control
- UDP advantages for distributed systems: Low latency, high throughput, no guaranteed delivery
- TLS for secure communication: Encryption, authentication, and integrity.
- DNS for name resolution: Maps hostnames to IP addresses.
- APIs for service communication: REST, gRPC, GraphQL
- Request-response pattern for service communication

### Coordination

- Time and ordering in distributed systems
- Leader election
- Distributed transactions
- Consensus algorithms

### Scalability
- #### Scalability patterns
  1. functional decomposition: Microservices
     - decompose the system into smaller, independent services
     - each service can be scaled independently
     - API Gateway pattern
     - Asynchronous messaging
  2. Partitioning or sharding
     - splitting the database from a single node to multiple nodes
     - sharding techniques
  3. duplication
     - add more instance of services
     - load balancing: DNS load balancing, 
     - replication
     - Caching

### Resiliency

- Failure detection
- Circuit breakers
- Retries and timeouts
- Chaos engineering

## Key Takeaways So Far

1. **Start simple** - Don't distribute until you need to
2. **Embrace failure** - Design systems that expect and handle failures gracefully
3. **Understand trade-offs** - Every design decision has consequences
4. **Monitor everything** - Observability is crucial for distributed systems
