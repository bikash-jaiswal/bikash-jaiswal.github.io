export type CommandCategory = 'navigation' | 'posts' | 'til' | 'reading' | 'actions';

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  category: CommandCategory;
  url?: string;
  actionId?: 'toggle-theme' | 'copy-url' | 'github' | 'linkedin' | 'email' | 'save-bookmark';
  tags?: string[];
  keywords?: string[];
}
