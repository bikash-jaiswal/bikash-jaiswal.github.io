---
title: "Network OSI Layer"
date: "2026-01-03"
tags: ["Networking", "OSI Model", "CS Fundamentals"]
---

A simplified way to visualize the networking stack by grouping the standard 7 layers into 4 practical layers.

## The 4-Layer Stack

1. **Application Layer** (Software Side)
   - Where user interaction and high-level protocols live (HTTP, FTP, DNS).
   - Corresponds to OSI layers 5-7 (Session, Presentation, Application).

2. **Transport Layer**
   - Handles host-to-host communication and reliability (TCP, UDP).
   - Corresponds to OSI layer 4.

3. **Internet Layer**
   - Handles routing and logical addressing (IP).
   - Corresponds to OSI layer 3 (Network).

4. **Data Link Layer** (Hardware Side)
   - Handles physical transmission and MAC addressing.
   - Corresponds to OSI layers 1-2 (Physical, Data Link).

## Mental Model

Think of the stack as a bridge:

- **Software Side:** Application Layer
- **Bridge:** Transport & Internet Layers
- **Hardware Side:** Data Link Layer
