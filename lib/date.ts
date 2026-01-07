/**
 * Date Utility Functions
 * 
 * Helper functions for formatting and sorting dates throughout the application.
 * Used by blog posts, reading items, and other date-based content.
 */

/**
 * Formats a date string into a human-readable format.
 * 
 * Called by: Blog post pages, reading item pages for displaying dates
 * 
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "January 15, 2024")
 * 
 * @example
 * formatDate('2024-01-15') // Returns "January 15, 2024"
 */
export function formatDate(dateStr: string): string {
  try {
    // Parse as local time to avoid timezone shift
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Sorts an array of items by date in descending order (newest first).
 * 
 * Called by: lib/posts.ts getPostMetadata() to sort blog posts
 * 
 * @param items - Array of objects with a date property
 * @returns New array sorted by date descending (does not mutate original)
 * 
 * @example
 * const posts = [{ date: '2024-01-01' }, { date: '2024-02-01' }];
 * sortByDate(posts) // Returns [{ date: '2024-02-01' }, { date: '2024-01-01' }]
 */
export function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
