# Developer Resources - Rust Microservice Integration

This document outlines how the Developer Resources section of the website integrates with the Rust microservice.

## Architecture

The Developer Resources section uses a client-server architecture:

- **Frontend**: Next.js React components in the `resources` directory
- **API Layer**: API routes in `app/api/resources` (acts as proxy during development)
- **Backend**: External Rust microservice (to be implemented)

## API Contract

The Rust microservice should implement the following API endpoints:

### 1. Get All Resources

```
GET /resources
```

**Response:**
```json
{
  "resources": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "url": "string",
      "category": "tool|reference|library|framework|tutorial|course|book|article|documentation|cheatsheet",
      "tags": ["string"],
      "favorite": boolean,
      "dateAdded": "YYYY-MM-DD",
      "icon": "string" // optional
    }
  ]
}
```

### 2. Create Resource

```
POST /resources
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "url": "string",
  "category": "tool|reference|library|framework|tutorial|course|book|article|documentation|cheatsheet",
  "tags": ["string"],
  "favorite": boolean,
  "icon": "string" // optional
}
```

**Response:**
```json
{
  "resource": {
    "id": "string",
    "title": "string",
    "description": "string",
    "url": "string",
    "category": "tool|reference|library|framework|tutorial|course|book|article|documentation|cheatsheet",
    "tags": ["string"],
    "favorite": boolean,
    "dateAdded": "YYYY-MM-DD",
    "icon": "string" // optional
  }
}
```

### 3. Toggle Favorite Status

```
PATCH /resources/{id}/favorite
```

**Response:**
```json
{
  "success": boolean
}
```

## Frontend Integration

The frontend is already configured to work with these endpoints. When you're ready to implement the Rust microservice:

1. Configure the URL in `.env.local`:
   ```
   RESOURCE_API_URL=http://localhost:8000
   ```

2. Uncomment the actual API calls in `app/lib/resources-service.ts`

3. Update `app/api/resources/route.ts` to either:
   - Proxy requests to your Rust service (recommended for development)
   - Remove it if you decide to call your Rust service directly from the frontend

## Development Workflow

During development:
1. The frontend uses sample data from `app/types/resource.ts`
2. The Resource API in the frontend calls the Next.js API routes
3. The API routes return the sample data

When the Rust microservice is implemented:
1. The frontend will call the Next.js API routes (no change needed)
2. The API routes will forward requests to the Rust microservice
3. The Rust microservice will handle data storage and retrieval

## Running the Rust Microservice

When you implement the Rust microservice, add commands and details here for how to run it alongside the Next.js development server.
