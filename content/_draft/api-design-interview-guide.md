---
title: API Design Interview Guide - Patterns, Best Practices & Common Questions
author: Bikash Jaiswal
date: '2026-01-10'
subtitle: Master API design concepts for technical interviews. From REST principles to rate limiting, this guide covers everything you need to ace API design questions.
tags:
  - System Design
  - API Design
  - Interview Prep
---

## Introduction
API design is a critical skill tested in system design interviews. Whether you're designing a REST API for a social 
media platform or a real-time API for a trading system, understanding the fundamentals will set you apart. 
Your job isn't just listing endpoints; it’s about showing your thought process — what matters, why it matters, and what 
tradeoffs you’ll make.


> **Interview Tip**: Interviewers evaluate your ability to make trade-offs. There's rarely a "perfect" API design, 
what matters is your reasoning.

## REST API Fundamentals

REST (Representational State Transfer) is the most common API architecture you'll encounter in interviews.
It’s a set of conventions and constraints for designing elegant and scalable HTTP APIs

### Core REST Principles

1. **Stateless**: Each request contains all information needed to process it
2. **Client-Server**: Clear separation between client and server responsibilities
3. **Cacheable**: Responses must define themselves as cacheable or non-cacheable
4. **Uniform Interface**: Consistent way to interact with resources
5. **Layered System**: Client cannot tell if connected directly to server or intermediary

### HTTP Methods & Their Semantics

| Method | Purpose | Idempotent | Safe |
|--------|---------|------------|------|
| GET | Retrieve resource | Yes | Yes |
| POST | Create resource | No | No |
| PUT | Replace resource | Yes | No |
| PATCH | Partial update | No | No |
| DELETE | Remove resource | Yes | No |

> **Common Interview Question**: "What's the difference between PUT and PATCH?"
> - **PUT**: Replaces the entire resource. Client sends complete representation.
> - **PATCH**: Partial update. Client sends only fields to modify.

### Resource Naming Conventions

```
# Good - Use nouns, plural forms
GET /users
GET /users/{id}
GET /users/{id}/orders

# Bad - Avoid verbs in URLs
GET /getUsers
GET /fetchUserById/{id}
POST /createUser
```

**Interview Tip**: Use hierarchical relationships to show resource ownership:
- `/users/{userId}/posts/{postId}/comments` - Comments belong to a post, which belongs to a user

## API Versioning Strategies

### 1. URL Path Versioning
```
GET /v1/users
GET /v2/users
```
**Pros**: Simple, explicit, easy to cache
**Cons**: URL pollution, harder to evolve

### 2. Query Parameter Versioning
```
GET /users?version=1
GET /users?version=2
```
**Pros**: Optional versioning, cleaner URLs
**Cons**: Easy to miss, caching complications

### 3. Header Versioning
```
GET /users
Accept: application/vnd.api+json;version=1
```
**Pros**: Clean URLs, follows HTTP semantics
**Cons**: Less visible, harder to test in browser

> **Interview Answer**: "I'd recommend URL path versioning for public APIs due to its simplicity and discoverability. For internal APIs, header versioning keeps URLs clean while maintaining flexibility."

## Pagination Patterns

### Offset-Based Pagination
```
GET /users?offset=20&limit=10
```
**Pros**: Simple to implement, allows jumping to any page
**Cons**: Performance degrades with large offsets, inconsistent with real-time data

### Cursor-Based Pagination
```
GET /users?cursor=eyJpZCI6MTAwfQ&limit=10

Response:
{
  "data": [...],
  "next_cursor": "eyJpZCI6MTEwfQ",
  "has_more": true
}
```
**Pros**: Consistent results, better performance at scale
**Cons**: Can't jump to arbitrary pages

> **Interview Question**: "When would you choose cursor-based over offset pagination?"
> Answer: "Cursor-based is preferred for large datasets, real-time feeds (like Twitter timeline), or when data changes frequently. Offset works well for smaller, relatively static datasets where users need to jump to specific pages."

## Rate Limiting

Rate limiting protects your API from abuse and ensures fair usage.

### Common Algorithms

1. **Token Bucket**: Tokens added at fixed rate, requests consume tokens
2. **Leaky Bucket**: Requests processed at constant rate, excess queued
3. **Fixed Window**: Count requests in fixed time windows
4. **Sliding Window**: Smoother rate limiting using weighted counts

### Rate Limit Headers
```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### Rate Limit Response (429 Too Many Requests)
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please retry after 60 seconds.",
  "retry_after": 60
}
```

> **Interview Tip**: Discuss rate limiting at multiple levels—per user, per IP, per API key, and globally.

## Authentication & Authorization

### Authentication Methods

| Method | Use Case | Security Level |
|--------|----------|----------------|
| API Keys | Server-to-server, public APIs | Low-Medium |
| JWT (Bearer Tokens) | User authentication, SPAs | Medium-High |
| OAuth 2.0 | Third-party access, delegated auth | High |
| mTLS | Service mesh, high-security | Very High |

### JWT Structure
```
Header.Payload.Signature

# Example
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMjM0fQ.signature
```

### OAuth 2.0 Flows

1. **Authorization Code**: Web apps with backend
2. **PKCE**: Mobile/SPA apps (recommended)
3. **Client Credentials**: Machine-to-machine
4. **Refresh Token**: Long-lived sessions

> **Interview Question**: "How would you secure an API for a mobile app?"
> Answer: "I'd use OAuth 2.0 with PKCE flow. The mobile app gets short-lived access tokens and uses refresh tokens for new access tokens. Store tokens securely using platform-specific secure storage (Keychain on iOS, Keystore on Android)."

## Error Handling

### HTTP Status Codes

```html
2xx - Success
  200 OK - Request succeeded
  201 Created - Resource created
  204 No Content - Success, no response body

4xx - Client Errors
  400 Bad Request - Invalid request syntax
  401 Unauthorized - Authentication required
  403 Forbidden - Authenticated but not authorized
  404 Not Found - Resource doesn't exist
  409 Conflict - Resource conflict (e.g., duplicate)
  422 Unprocessable Entity - Validation failed
  429 Too Many Requests - Rate limited

5xx - Server Errors
  500 Internal Server Error - Generic server error
  502 Bad Gateway - Upstream server error
  503 Service Unavailable - Server overloaded/maintenance
  504 Gateway Timeout - Upstream timeout
```

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "age",
        "message": "Must be a positive integer"
      }
    ],
    "request_id": "req_abc123",
    "documentation_url": "https://api.example.com/docs/errors#VALIDATION_ERROR"
  }
}
```

## API Design Interview Questions

### Question 1: Design a URL Shortener API

**Requirements**: Create short URLs, redirect to original, track analytics

```REST
# Create short URL
POST /urls
{
  "original_url": "https://example.com/very/long/path",
  "custom_alias": "my-link",  // optional
  "expires_at": "2026-12-31"  // optional
}

Response: 201 Created
{
  "short_url": "https://short.ly/my-link",
  "original_url": "https://example.com/very/long/path",
  "created_at": "2026-01-10T10:00:00Z",
  "expires_at": "2026-12-31T00:00:00Z"
}

# Redirect (handled by server)
GET /{alias} → 302 Redirect to original_url

# Get analytics
GET /urls/{alias}/analytics
{
  "total_clicks": 1542,
  "clicks_by_day": [...],
  "top_referrers": [...],
  "top_countries": [...]
}
```

### Question 2: Design a Rate-Limited API Gateway

**Key Discussion Points**:
- Token bucket algorithm for flexible rate limiting
- Redis for distributed rate limit counters
- Different tiers: free (100 req/min), pro (1000 req/min), enterprise (custom)
- Graceful degradation vs hard limits

### Question 3: Design Twitter's Tweet API

```REST
# Create tweet
POST /tweets
{
  "content": "Hello World!",
  "media_ids": ["media_123"],
  "reply_to": "tweet_456"  // optional
}

# Get timeline (cursor-based pagination)
GET /timeline?cursor={cursor}&limit=20

# Like/Unlike
POST /tweets/{id}/likes
DELETE /tweets/{id}/likes

# Retweet
POST /tweets/{id}/retweets
```

## Common Interview Mistakes to Avoid

1. **Not clarifying requirements** - Always ask about scale, users, and use cases
2. **Ignoring backward compatibility** - Discuss versioning strategy
3. **Forgetting error cases** - Cover validation, auth failures, rate limits
4. **Over-engineering** - Start simple, add complexity only when justified
5. **Ignoring security** - Always discuss authentication, authorization, and data validation
6. **Not considering caching** - Discuss cache headers, ETags, and invalidation

## Quick Reference Checklist

Before finalizing your API design in an interview, verify:

- [ ] **Resources**: Are nouns used? Proper hierarchy?
- [ ] **Methods**: Correct HTTP verbs for each operation?
- [ ] **Versioning**: Strategy defined?
- [ ] **Pagination**: Appropriate method for the use case?
- [ ] **Authentication**: Secure and appropriate for the client type?
- [ ] **Rate Limiting**: Defined limits and response headers?
- [ ] **Error Handling**: Consistent format with helpful messages?
- [ ] **Idempotency**: Safe to retry failed requests?
- [ ] **Caching**: Cache headers and invalidation strategy?

## Conclusion

API design interviews test your ability to think systematically about interfaces, trade-offs, and user experience. Focus on:

1. **Clarity**: Make your API intuitive and self-documenting
2. **Consistency**: Follow conventions throughout
3. **Flexibility**: Design for evolution without breaking changes
4. **Security**: Never compromise on authentication and authorization
5. **Performance**: Consider caching, pagination, and rate limiting from the start

> **Final Tip**: Practice explaining your design decisions out loud. Interviewers want to understand your thought process, not just see the final API spec.
