import { Resource } from '../types/resource';

/**
 * API client for resources
 */
export class ResourceApi {
  /**
   * Fetch all resources
   */
  static async getResources(): Promise<Resource[]> {
    try {
      // Using static JSON file instead of API route for static site export
      const response = await fetch('/data/resources.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.resources;
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  }

  /**
   * Create a new resource
   */
  static async createResource(resource: Omit<Resource, 'id' | 'dateAdded'>): Promise<Resource | null> {
    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resource),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.resource;
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
      // This would be a real API call in the future
      // For now, just return success
      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }
}
