import { Bookmark, BookmarkServiceInterface, UserProfile } from '../../types/bookmark';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_BOOKMARKS_KEY = 'bj_bookmarks_storage_v1';
const STORAGE_USER_KEY = 'bj_bookmarks_user_v1';
const STORAGE_TAGS_KEY = 'bj_bookmarks_tags_v1';

export const SEED_BOOKMARKS: Bookmark[] = [
  {
    id: 'seed-0',
    userId: 'mock-user-1',
    url: 'https://lnkd.in/p/gmiugGXs',
    title: 'Agentic RAG Production Course with Docker, FastAPI, OpenSearch & LangGraph',
    author: 'Shirin Khosravi Jam',
    summary: 'A 7‑week open‑source curriculum that builds a production‑grade Retrieval‑Augmented Generation system using Docker, FastAPI, PostgreSQL, OpenSearch, BM25 + vector hybrid search, local LLM streaming, Redis caching, and LangGraph‑driven agentic RAG with a Telegram bot.',
    category: 'machine-learning',
    tags: ['rag', 'langgraph', 'docker', 'fastapi', 'opensearch'],
    isFavorite: true,
    isRead: false,
    source: 'linkedin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-1',
    userId: 'mock-user-1',
    url: 'https://www.linkedin.com/posts/anthropic_introducing-claude-3-7-sonnet-hybrid-reasoning-activity-72999',
    title: 'Hybrid Reasoning and Test-Time Compute in Frontier LLMs',
    author: 'Anthropic AI Team',
    summary: 'A deep-dive into combining instant response generation with dynamic thinking tokens for complex multi-step reasoning.',
    rawContent: 'Breakthroughs in model architecture allowing dynamic allocation of reasoning tokens based on task difficulty.',
    imageUrl: 'https://raw.githubusercontent.com/bikash-jaiswal/content_assets/main/projects/default.png',
    category: 'machine-learning',
    tags: ['ai', 'llm', 'reasoning', 'agents'],
    isFavorite: true,
    isRead: true,
    source: 'linkedin',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'seed-2',
    userId: 'mock-user-1',
    url: 'https://www.linkedin.com/posts/systemdesign_distributed-consensus-raft-paxos-breakdown-activity-72988',
    title: 'Distributed Consensus: Raft vs Multi-Paxos in Cloud Architectures',
    author: 'Distributed Systems Engineering',
    summary: 'Visual architecture guide explaining leader election, log replication, and partition tolerance in distributed databases.',
    rawContent: 'Understanding how Raft solves the comprehension bottleneck of Paxos while retaining formal correctness.',
    category: 'system-design',
    tags: ['system-design', 'distributed-systems', 'consensus', 'raft'],
    isFavorite: false,
    isRead: false,
    source: 'linkedin',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: 'seed-3',
    userId: 'mock-user-1',
    url: 'https://www.linkedin.com/posts/cloudarchitecture_event-driven-microservices-with-kafka-activity-72977',
    title: 'High-Throughput Event Streaming Patterns with Kafka and Debezium',
    author: 'Cloud Native Foundation',
    summary: 'Production architectural patterns for transactional outbox, CDC (Change Data Capture), and schema evolution.',
    category: 'system-design',
    tags: ['kafka', 'microservices', 'event-driven', 'backend'],
    isFavorite: true,
    isRead: true,
    source: 'linkedin',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export class MockBookmarkService implements BookmarkServiceInterface {
  private getStorage(): Storage | null {
    if (typeof window !== 'undefined') {
      return window.localStorage;
    }
    return null;
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    const storage = this.getStorage();
    if (!storage) return null;

    const storedUser = storage.getItem(STORAGE_USER_KEY);
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  }

  async login(): Promise<UserProfile> {
    const mockUser: UserProfile = {
      id: 'mock-user-1',
      name: 'Bikash Jaiswal',
      email: 'bikash@example.com',
      avatarUrl: 'https://avatars.githubusercontent.com/u/158243242?v=4',
      isMock: true,
    };

    const storage = this.getStorage();
    if (storage) {
      storage.setItem(STORAGE_USER_KEY, JSON.stringify(mockUser));
      window.dispatchEvent(new Event('bj-auth-changed'));
    }

    return mockUser;
  }

  async logout(): Promise<void> {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem(STORAGE_USER_KEY);
      window.dispatchEvent(new Event('bj-auth-changed'));
    }
  }

  async getBookmarks(): Promise<Bookmark[]> {
    const storage = this.getStorage();
    if (!storage) return SEED_BOOKMARKS;

    const stored = storage.getItem(STORAGE_BOOKMARKS_KEY);
    if (!stored) {
      // Seed with initial sample bookmarks on first run
      storage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(SEED_BOOKMARKS));
      this.syncTags(SEED_BOOKMARKS);
      return SEED_BOOKMARKS;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return SEED_BOOKMARKS;
    }
  }

  async getTags(): Promise<string[]> {
    const storage = this.getStorage();
    const bookmarks = await this.getBookmarks();
    const fromBookmarks = bookmarks.flatMap((b) => b.tags || []);

    let storedTags: string[] = [];
    if (storage) {
      const raw = storage.getItem(STORAGE_TAGS_KEY);
      if (raw) {
        try {
          storedTags = JSON.parse(raw);
        } catch {
          storedTags = [];
        }
      }
    }

    const unique = Array.from(new Set([...fromBookmarks, ...storedTags]))
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)
      .sort();

    return unique;
  }

  private syncTags(bookmarks: Bookmark[]): void {
    const storage = this.getStorage();
    if (!storage) return;
    const allTags = Array.from(new Set(bookmarks.flatMap((b) => b.tags || [])))
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)
      .sort();
    storage.setItem(STORAGE_TAGS_KEY, JSON.stringify(allTags));
  }

  async addBookmark(data: Omit<Bookmark, 'id' | 'userId' | 'createdAt'>): Promise<Bookmark> {
    const user = await this.getCurrentUser();
    const userId = user?.id || 'mock-user-1';

    const normalizedTags = (data.tags || [])
      .map((t) => t.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''))
      .filter(Boolean);

    const newBookmark: Bookmark = {
      ...data,
      tags: normalizedTags,
      id: uuidv4(),
      userId,
      isRead: data.isRead ?? false,
      createdAt: new Date().toISOString(),
    };

    const storage = this.getStorage();
    if (storage) {
      const current = await this.getBookmarks();
      const updated = [newBookmark, ...current];
      storage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(updated));

      // Dynamically register new tags in the database
      const existingTags = await this.getTags();
      const mergedTags = Array.from(new Set([...existingTags, ...normalizedTags])).sort();
      storage.setItem(STORAGE_TAGS_KEY, JSON.stringify(mergedTags));

      window.dispatchEvent(new Event('bj-bookmarks-changed'));
    }

    return newBookmark;
  }

  async deleteBookmark(id: string): Promise<boolean> {
    const storage = this.getStorage();
    if (!storage) return false;

    const current = await this.getBookmarks();
    const updated = current.filter((b) => b.id !== id);
    storage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(updated));
    this.syncTags(updated);
    window.dispatchEvent(new Event('bj-bookmarks-changed'));
    return true;
  }

  async toggleFavorite(id: string): Promise<boolean> {
    const storage = this.getStorage();
    if (!storage) return false;

    const current = await this.getBookmarks();
    const updated = current.map((b) =>
      b.id === id ? { ...b, isFavorite: !b.isFavorite } : b
    );
    storage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('bj-bookmarks-changed'));
    return true;
  }

  async toggleRead(id: string): Promise<boolean> {
    const storage = this.getStorage();
    if (!storage) return false;

    const current = await this.getBookmarks();
    const updated = current.map((b) =>
      b.id === id ? { ...b, isRead: !b.isRead } : b
    );
    storage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('bj-bookmarks-changed'));
    return true;
  }
}
