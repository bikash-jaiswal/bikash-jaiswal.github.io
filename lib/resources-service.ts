import { Resource } from '../types/resource';
import { sampleResources } from '../types/resource';

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
}
