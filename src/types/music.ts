export interface Track { id: string; title: string; artist: string; album: string; genre: string; duration: number; artwork: string; streamUrl: string; source?: 'audius' | 'demo'; location?: string; releaseYear?: number; releaseDate?: string; sourceUrl?: string; }
export interface Playlist { id: string; name: string; trackIds: string[]; createdAt: number; }
export interface LibraryData { version: 1; liked: string[]; history: string[]; playlists: Playlist[]; tracks?: Record<string, Track>; }
export interface CatalogOptions { query?: string; genre?: string; sort?: 'popular' | 'recent' | 'relevant'; }
export interface CatalogPage { tracks: Track[]; hasMore: boolean; }
export interface CatalogFilters { location: string; decade: string; }
export type RepeatMode = 'off' | 'all' | 'one';
