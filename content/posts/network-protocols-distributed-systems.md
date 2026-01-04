---
title: Network Protocols Every Engineer Must Know for Distributed Systems
author: Bikash Jaiswal
date: '2026-01-02'
subtitle: Understanding how data flows across networks is fundamental to building reliable distributed systems. Master these protocols and patterns.
tags:
  - System Design
  - Distributed Systems
  - Networking Protocols
---

## Introduction

Distributed system are spread out over a network. Without communication between nodes, distributed system are simply 
disconnected standalone system. The critical decision made in communication protocol in system design influences the 
distributed system's performance, availability and scalability.

> **Pro tip**: Network protocols are build on stacks. Each layer depends on the abstraction of the layer below it. 


Every time you make an API call, send a message, or load a webpage, data travels through the stack from the top layer to the bottom layer and vice versa on the other end of the network as shown in Figure 1.


![Network Protocol Stack](/images/distributed-system/network-protocol-stack.png)
* Figure 1: Internet Protocol Stack. Reference: [https://en.wikipedia.org/wiki/Internet_protocol_suite](https://en.wikipedia.org/wiki/Internet_protocol_suite)

## Application Layer (Software Layer)
1. High level protocols that provide services to applications. 
2. Here decisions related to user-facing protocols are made. like HTTP/HTTPS, DNS, gRPC, APIs, JSON-RPC, etc.
3. HTTP/HTTPS: foundation of the web. 
4. DNS: Domain Name System: maps human-readable domain names to IP addresses.
5. Your software code makes API calls to other services or databases.

## Transport Layer
1. The Core of the OSI Layered stack. 
2. End-to-end communication between nodes are established using port numbers and IP addresses.
3. Here decisions related to transport protocols are made. like TCP, UDP, SCTP, etc.
4. **TCP**: Transmission Control Protocol: provides reliable, ordered, and error-checked delivery of data. **MOST Important**
5. UDP: User Datagram Protocol: provides connectionless, unreliable, and fast delivery of data.

## Internet Layer 
1. The Internet Layer is responsible for routing data packets between networks. 
2. It uses IP addresses to identify nodes and routes data packets to their destination.
3. **IP**: Internet Protocol: delivers packets on a best effort basis. **MOST Important**
4. Router operates at the Internet Layer and forwards packets based on routing tables.

## Data Link Layer
1. Physical layer of the OSI Layered stack. 
2. It consists of other network protocols that operate on services like Ethernet, Wi-Fi, etc.
3. Switches operate at the Data Link Layer and forward ethernet frames based on destination MAC addresses.
4. **MAC**: Media Access Control: assigns unique addresses to devices on a network.
5. **Frame**: A unit of data that is transmitted over a network. It contains a header, a payload, and a footer.

## Network Layers role in debugging distributed system
when a distributed system is not working, it is important to understand the network protocols used by the system. The troubleshooting engineer might ask for the following information:
1. what is the issue?
2. Is it the Application Error (Application Layer)?
3. Is the port available or blocked (Transport Layer)?
4. Or a routing issue (Internet Layer)?
5. Is network connectivity issue (Data Link Layer)?

## Transmission Control Protocol (TCP)

## User Datagram Protocol (UDP)

## Security protocols in Transport Layer

## Domain Name System (DNS) 

## Application Programming Interfaces (APIs)