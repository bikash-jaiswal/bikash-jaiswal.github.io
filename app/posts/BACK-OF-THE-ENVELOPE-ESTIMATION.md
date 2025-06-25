---
title: "Back of the Envelope Estimation"
subtitle: "How to make quick, informed decisions about the feasibility and scale of a system."
author: "Bikash Jaiswal"
date: "2025-06-24"
---

## 1. Why Back of the Envelope Estimation?
Back-of-the-envelope estimation is all about making quick, simplified, and approximate calculations to get a "good enough" sense of the scale of a system. It's not about finding the exact answer, but rather about understanding the order of magnitude and identifying potential bottlenecks early in the design process. Think of it as a sanity check before you invest significant time and resources.

## 2. A Simple Framework for Estimation
Here's a step-by-step approach you can apply to any system design question:

### 2.1 Clarify and State Assumptions:
You need to define the scope and make reasonable assumptions about user base, user activity, and data characteristics.
Since you're simplifying, you need to be explicit about the assumptions you're making. This allows you to justify your results and adjust them later if an assumption proves wrong.

### 2.2 Identify Key Metrics to Estimate: 
What are the most important numbers that will shape your design? 
These typically include:
1. Storage: How much data will your system need to store?
2. Bandwidth: How much data will be transferred in and out of your system?
3. Throughput (Requests per Second - QPS/RPS): How many requests will your system need to handle? It's often useful to distinguish between read and write QPS.
4. Latency: How quickly must the system respond to a user request?

### 2.3 Perform the Calculations: 
Use your assumptions and some well-known numbers to calculate the key metrics. Forget precise figures. Round numbers up or down to make the math easier (e.g., use 100 million users instead of 97.8 million). 

In most of the cases, the atomic allocation unit in memory is a byte which is a sequence of 8 bits. To deal with data size, we should look into power of 2 tables and it's simplification.

#### Table to data size or volume

Full Name | Short Name | Size | Power of 2 | Approximation
---- | ---- | ---- | ---- | ----
1 byte | 8 bits | 2^3 | 3 | 1 byte
1 kilobytes = 1024 byte |  1kb | 2^8 | 10 | 1 thousands 
1 megabytes = 1024 kb | 1 mb | 2^20 | 20 | 1 millions 
1 gigabytes = 1024 mb | 1 gb | 2^30 | 30 | 1 billions
1 terabytes = 1024 gb | 1 tb | 2^40 | 40 | 1 trillions
1 petabytes = 1024 tb | 1 pb | 2^50 | 50 | 1 quadrillions 
1 exabytes = 1024 pb | 1 eb | 2^60 | 60 | 1 quintillions
1 zetabytes = 1024 eb | 1 zb | 2^70 | 70 | 1 sextillions
1 yottabytes = 1024 zb | 1 yb | 2^80 | 80 | 1 septillions

### 2.4 Translate Estimates into Design Implications: 
This is the most crucial step. What do your numbers tell you about the kind of database you need, the number of servers, the necessity of a CDN, or the type of caching strategy to employ?


## 3. System Design Question

### 3.1 Question 1: Designing a Photo-Sharing Service (like Instagram)

All are assumption made while discussing with interviewer, we
can adjust them based on your needs.

#### Step 1: Clarify and State Assumptions
1. **Total users**: 500 millions
2. **Daily Active Users (DAU)**: 200 millions (A reasonable fraction of total users)
3. **User writes request**: 1 in 10 DAU uploads one photo a day
4. **User Read request**: Each DAU views 50 photos a day
5. **Average Photo size**: 2 MB
6. **Data Retention**: Photos are stored forever.

#### Step 2: Identify Key Metrics
1. Storage for photos.
2. Write QPS (photo uploads).
3. Read QPS (photo views).
4. Bandwidth for uploads and downloads.

#### Step 3: Perform the Calculations
Storage Estimation:
1. Storage per day: 2 MB/photo * (200 millions users / 10)  = 40 MB * millions users = 4 * 10^7 MB
2. Storage per year: 4 * 10^7 MB * 365 days = 1.46 * 10^10 MB = 1.46 * 10^7 GB
3. Storage for 50 years: 1.46 * 10^7 GB * 50 years = 7.3 * 10^8 GB = 730,000 Terabytes = **730 Petabytes**
. We know that 1 Terabit (Tb) = 1,000 Gigabits (Gb), and 1 Gb = 1,000 Mb.

Write QPS (photo uploads):
1. Total upload per second = (200 millions users / 10) / (24 hours * 3600 seconds/hour) = 20,000,000/(20*5000) ≈ 200 photos per second
2. Peak Write QPS: Traffic is rarely uniform. A common assumption is that peak traffic is 2-3x the average. Let's say 2x. So, Peak Write QPS ≈ 400 uploads/second.

Read QPS (Views):
1. Total Views per second = 200 millions users / (24 hours * 3600 seconds/hour) * 50 photos/day = 2000 * 50 = 100,000 photos per second
2. Peak Read QPS (2x): ≈ 200,000 views/second
Bandwidth Estimation:

Bandwidth Estimation:
1. Upload Bandwidth: 400 photos/second * 2 MB/photo = 800 MB/second 
2. Download Bandwidth: 200,000 photos/second * 2 MB/photo = 500 GBs/second

#### 4. Translate Estimates into Design Implications
1. Storage (730 PB): This is a massive amount of data. You can't store this on a single traditional database. This points towards a distributed object storage system like Amazon S3 or Google Cloud Storage.

2. Read vs. Write Ratio (200,000 reads/sec vs. 400 writes/sec): The system is heavily read-dominated. This is a classic indicator that you'll need a robust caching strategy.

3. High Read QPS (200,000 views/second): This suggests a need for a caching layer to handle the high read traffic. A single server/layer can't handle this. You'll need a fleet of servers behind a load balancer.

4. High Write QPS (400 uploads/second): This indicates a need for a write-optimized database or a distributed database system like Cassandra or a NoSQL database.

5. High Download Bandwidth (500 GBs/second): Pushing this much data from your servers will be expensive and slow for users globally. This strongly suggests the need for a Content Delivery Network (CDN) to cache photos closer to users.

## 5. Conclusion: The Power of Estimation

By performing these simple calculations of Back-of-the-envelope estimation, you can quickly move from an abstract problem to a concrete discussion of system architecture, demonstrating a solid engineering thought process. This might seem like a simple skill, but it's one of the most powerful tools in a software engineer's arsenal. By making these quick calculations early in your design process, you can:

- Identify potential bottlenecks before writing a single line of code
- Make informed architectural decisions based on scale requirements
- Confidently discuss trade-offs with stakeholders and team members
- Avoid costly redesigns later in the development lifecycle
