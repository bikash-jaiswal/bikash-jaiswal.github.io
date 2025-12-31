import { Resource } from '../types/resource';

export class ResourceApi {
  static async getResources(): Promise<Resource[]> {
    try {
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

  static async toggleFavorite(id: string): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }
}
