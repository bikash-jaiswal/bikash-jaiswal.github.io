import { NextResponse } from 'next/server';
import { ResourceService } from '@/app/lib/resources-service';


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

