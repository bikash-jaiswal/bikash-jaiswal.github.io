import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TILEntry {
  slug: string;
  date: string;
  title: string;
  tags: string[];
  content: string;
}

const tilDirectory = path.join(process.cwd(), 'content/til');

export async function getAllTILEntries(): Promise<TILEntry[]> {
  // Check if directory exists
  if (!fs.existsSync(tilDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(tilDirectory);
  const allEntries = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(tilDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        date: data.date || '',
        title: data.title || slug,
        tags: data.tags || [],
        content: content.trim(),
      };
    });

  // Sort by date descending
  return allEntries.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

export async function getTILBySlug(slug: string): Promise<TILEntry | null> {
  const fullPath = path.join(tilDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    date: data.date || '',
    title: data.title || slug,
    tags: data.tags || [],
    content: content.trim(),
  };
}

// Group entries by month/year for timeline display
export function groupEntriesByMonth(entries: TILEntry[]): Record<string, TILEntry[]> {
  const grouped: Record<string, TILEntry[]> = {};
  
  entries.forEach((entry) => {
    const date = new Date(entry.date);
    const monthYear = date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(entry);
  });
  
  return grouped;
}
