---
title: Every Developer Should Know System Design
author: Bikash Jaiswal
date: '2026-01-01'
subtitle: System Design is not just for Architects. It is for every developer 
  who is building scalable and maintainable applications for global audience.
tags:
  - System Design
  - Distributed Systems
  - Cloud Computing
---

## What is Distributed Systems?
Distributed systems are systems that are spread out over a network. These networks of machines physical or virtually (nodes) are connected to each other and communicate with each other to perform tasks.
The nodes can be Physical machines(e.g,, phone) or a software process (e.g., browser).

> Why should we think about distributed systems while building applications?

### 1. Our application must be distributed to run in all possible devices
We want our application to be available to users all the time and 
run in all possible devices like phone, tablet, desktop, etc. 
Best example of this is web.

### 2. Our application must be highly available to users
We don't want our application to be down for long time. 
It must be free from single point of failure. It can only be achieved by distributing the application.

### 3. Our application must be able to handle high traffic or workloads
We don't want our application to be slow or unresponsive. 
It must be able to handle high traffic or workloads. 
It can only be achieved by when we reduce the load on a single machine and distribute it across multiple machines.
For example, High traffic from all over the world to Google search engine can't be handled by single node. 
Thus, Google search engine is distributed across multiple nodes.

## Fundamental Concepts Every Developer Should Master

Understanding these core concepts will help you design systems that scale gracefully and handle failures elegantly.

---

### 1. Communication Between Nodes

At the heart of any distributed system lies **inter-node communication**. Nodes exchange messages over the network, but this seemingly simple task raises critical questions:

- **Protocols**: How do nodes talk? HTTP for request-response, gRPC for high-performance RPC, WebSockets for real-time bidirectional communication, or message queues like Kafka for async processing.
- **Serialization**: How are messages encoded? JSON for readability, Protocol Buffers for efficiency, or Avro for schema evolution.
- **Network Failures**: What happens during a temporary outage? Implement retries with exponential backoff, circuit breakers, and idempotency.
- **Security**: How do you prevent eavesdropping? TLS encryption, mutual authentication, and API keys/tokens.
- **OSI Model**: Understanding the 7 layers helps debug network issues—from physical connectivity to application-level protocols.

```
Client → Load Balancer → API Gateway → Service A → Message Queue → Service B
```

---

### 2. Coordination & Consensus

When nodes need to agree on something (leader election, distributed locks, transaction commits), you need **consensus algorithms**:

- **The CAP Theorem**: You can only guarantee 2 of 3—Consistency, Availability, Partition Tolerance. Choose wisely based on your use case.
- **Consensus Algorithms**: Paxos, Raft, and Zab (used by ZooKeeper) help nodes agree even when some fail.
- **Network Partitions**: When nodes can't communicate, how does your system behave? Does it favor consistency (reject writes) or availability (accept writes, resolve conflicts later)?
- **Distributed Locks**: Tools like Redis (Redlock), ZooKeeper, or etcd help coordinate access to shared resources.

> **Real-world example**: When you book a flight, multiple services must coordinate—inventory, payment, and booking confirmation must all succeed or all fail (distributed transaction).

---

### 3. Scalability

Scalability is about handling growth—more users, more data, more requests—without degrading performance.

| Metric | Definition | Target |
|--------|------------|--------|
| **Throughput** | Requests processed per second | Maximize |
| **Latency** | Time to process a single request | Minimize (p50, p95, p99) |
| **Capacity** | Maximum load before degradation | Plan for 2-3x peak |

**Scaling Strategies**:
- **Vertical Scaling**: Bigger machines (limited ceiling, expensive)
- **Horizontal Scaling**: More machines (preferred for distributed systems)
- **Database Scaling**: Read replicas, sharding, caching layers (Redis, Memcached)
- **Async Processing**: Offload heavy work to background queues

---

### 4. Availability & Resiliency

A resilient system continues operating even when components fail. Failures are **inevitable**—plan for them.

**Availability in "Nines"**:

| Availability | Downtime/Year | Downtime/Month |
|--------------|---------------|----------------|
| 99% (two 9s) | 3.65 days | 7.3 hours |
| 99.9% (three 9s) | 8.76 hours | 43.8 minutes |
| 99.99% (four 9s) | 52.6 minutes | 4.38 minutes |
| 99.999% (five 9s) | 5.26 minutes | 26.3 seconds |

**Techniques for High Availability**:
- **Redundancy**: No single point of failure—multiple instances, multi-region deployment
- **Replication**: Data copied across nodes (leader-follower, multi-leader, leaderless)
- **Failover**: Automatic switching to healthy nodes when failures occur
- **Self-healing**: Auto-restart failed containers, auto-scaling based on load
- **Chaos Engineering**: Intentionally inject failures to test resilience (Netflix's Chaos Monkey)

---

### 5. Observability & Operations

You can't fix what you can't see. **Observability** is the ability to understand your system's internal state from its external outputs.

**The Three Pillars**:
1. **Logs**: Detailed event records (structured JSON logs, centralized with ELK/Splunk)
2. **Metrics**: Numerical measurements over time (Prometheus, Grafana, DataDog)
3. **Traces**: Request flow across services (Jaeger, Zipkin, OpenTelemetry)

**Operational Excellence**:
- **Alerting**: Notify on-call engineers when SLOs are at risk (PagerDuty, OpsGenie)
- **Runbooks**: Documented procedures for common incidents
- **Post-mortems**: Blameless analysis after incidents to prevent recurrence
- **SLIs/SLOs/SLAs**: Define and measure service level indicators, objectives, and agreements

---

### 6. Consistency Models

In distributed systems, **consistency** defines how and when updates become visible across nodes.

| Model | Description | Use Case |
|-------|-------------|----------|
| **Strong Consistency** | All nodes see the same data at the same time | Banking, inventory |
| **Eventual Consistency** | Updates propagate eventually; temporary inconsistency allowed | Social media feeds, DNS |
| **Causal Consistency** | Related operations maintain order | Collaborative editing |

**Key Concepts**:
- **ACID vs BASE**: Traditional databases favor ACID (Atomicity, Consistency, Isolation, Durability); distributed systems often use BASE (Basically Available, Soft state, Eventually consistent)
- **Conflict Resolution**: Last-write-wins, vector clocks, CRDTs (Conflict-free Replicated Data Types)
- **Read-your-writes**: Ensure users see their own updates immediately

---

## Conclusion

System design isn't just for architects or senior engineers—it's a fundamental skill for anyone building software that serves real users. Start with these concepts, apply them in your projects, and you'll be well-equipped to design systems that are scalable, resilient, and maintainable.
