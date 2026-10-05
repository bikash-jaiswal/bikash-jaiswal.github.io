export type BookmarkSource = 'linkedin' | 'twitter' | 'article' | 'github' | 'other';

export interface Bookmark {
  id: string;
  userId: string;
  url: string;
  title: string;
  author?: string;
  summary?: string;
  rawContent?: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  isRead?: boolean;
  source: BookmarkSource;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  isMock?: boolean;
}

export interface BookmarkFilters {
  category: string;
  searchTerm: string;
  showFavoritesOnly: boolean;
  readStatus: 'all' | 'unread' | 'read';
  tags: string[];
}

export interface BookmarkServiceInterface {
  // Auth
  getCurrentUser(): Promise<UserProfile | null>;
  login(): Promise<UserProfile>;
  logout(): Promise<void>;

  // Data
  getBookmarks(): Promise<Bookmark[]>;
  getTags(): Promise<string[]>;
  addBookmark(data: Omit<Bookmark, 'id' | 'userId' | 'createdAt'>): Promise<Bookmark>;
  deleteBookmark(id: string): Promise<boolean>;
  toggleFavorite(id: string): Promise<boolean>;
  toggleRead(id: string): Promise<boolean>;
}
