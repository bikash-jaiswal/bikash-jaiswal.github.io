import { NextResponse } from 'next/server';
import { ResourceService } from '@/app/lib/resources-service';

// Make this route compatible with static exports
export const dynamic = 'force-static';
// Optional: Add revalidation period if you want data to refresh periodically
export const revalidate = 3600; // Revalidate every hour


/**
 * This API endpoint serves as a temporary solution until the Rust microservice
 * is implemented. Later, this could be converted to a proxy that forwards
 * requests to the Rust service, or removed if the frontend calls the 
 * Rust service directly.
 */

export async function GET() {
  try {
    const resources = await ResourceService.getAllResources();
    
    return NextResponse.json({ 
      resources,
      success: true 
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resources', success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.url || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields', success: false },
        { status: 400 }
      );
    }
    
    const resource = await ResourceService.createResource(body);
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Failed to create resource', success: false },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      resource,
      success: true
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Failed to create resource', success: false },
      { status: 500 }
    );
  }
}
