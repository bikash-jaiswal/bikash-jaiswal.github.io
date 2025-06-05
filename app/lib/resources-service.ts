import { Resource } from '../types/resource';
import { sampleResources } from '../types/resource';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service class for handling resource data operations with an external API
 */
export class ResourceService {
  /**
   * Get all resources
   */
  static async getAllResources(): Promise<Resource[]> {
    // Use sample data until external API is available
    // In production, this would be replaced with a fetch to the Rust microservice
    try {
      // TEMP: Return sample data until Rust microservice is implemented
      return sampleResources;
      
      // Rust microservice implementation (uncomment when ready):
      /*
      const response = await fetch(API_ENDPOINTS.RESOURCES);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
      */
    } catch (error) {
      console.error('Error fetching resources:', error);
      return sampleResources; // Fallback to sample data on error
    }
  }
  
  /**
   * Create a new resource
   */
  static async createResource(resourceData: Omit<Resource, 'id' | 'dateAdded'>): Promise<Resource | null> {
    // Create resource with generated ID and current date
    const resource: Resource = {
      ...resourceData,
      id: uuidv4(),
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    try {
      // TEMP: Just return the new resource until Rust microservice is implemented
      return resource;
      
      // Rust microservice implementation (uncomment when ready):
      /*
      const response = await fetch(API_ENDPOINTS.RESOURCES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resourceData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
      */
    } catch (error) {
      console.error('Error creating resource:', error);
      return null;
    }
  }
  
  /**
   * Toggle favorite status of a resource
   */
  static async toggleFavorite(id: string): Promise<boolean> {
    try {
      // TEMP: Return success until Rust microservice is implemented
      return true;
      
      // Rust microservice implementation (uncomment when ready):
      /*
      const response = await fetch(API_ENDPOINTS.TOGGLE_FAVORITE(id), {
        method: 'PATCH',
      });
      
      return response.ok;
      */
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      return false;
    }
  }
}
