---
title: Domain Name System (DNS) and How it works
author: Bikash Jaiswal
date: '2026-01-07'
subtitle: System Design is not just for Architects. It is for every developer 
  who is building scalable and maintainable applications for global audience.
tags:
  - System Design
  - Distributed Systems
  - Cloud Computing
---

## We speak in Names. Computers speak in numbers.
To connect to a website, we use a name like `www.example.com`. However, the internet's underlying technology works with 
numerical IP addresses to connect to the website. So how does the internet translate a name to correct IP address? 
The internet uses a system called Domain Name System (DNS) to translate a name to correct IP address. 

## How does DNS resolve a name to IP address?

![Resolving DNS Query](/images/distributed-system/resolving-dns-query.png)

### 1. When we type `www.example.com` in our browser, our browser first checks the local cache for the IP address of `www.example.com`. 
If the IP address is not found in the local cache, our browser sends a request to the DNS resolver to resolve the IP address of `www.example.com`. 

### 2. The DNS resolver checks its own local cache first. If the address isn't found in the local cache, it starts the process of resolving the IP address from top level domain (TLD) server.
It sends a request for .com to the Root Name Server (NS). The Root Name Server (NS) doesn't know the final answer, but it knows who manages the .com domain. It responds with the address of the .com TLD server.

### 3. With .com TLD server, the resolver now send it with more specific request for `www.example.com`. The .com TLD Name Server knows authoritative name servers that manage `example.com` and responds with the address of the authoritative name server for `example.com`.

### 4. Finally, The resolver queries the authoritative to get record for the `www` hostname and returns the IP address to the browser. 

### 5. The browser then uses the IP address to connect to the website.
