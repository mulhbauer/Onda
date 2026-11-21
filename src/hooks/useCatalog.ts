import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCatalogPage } from '@/lib/api';
import { normalizeText } from '@/constants/musicCatalog';
import type { CatalogFilters, CatalogOptions } from '@/types/music';
export default function useCatalog(options: CatalogOptions, filters: CatalogFilters = { location: '', decade: '' }) {
 const query = useInfiniteQuery({ queryKey: ['audius-catalog', options.query || '', options.genre || 'Tudo', options.sort || 'popular'],
  initialPageParam: 0, queryFn: ({ pageParam, signal }) => fetchCatalogPage(options, pageParam, signal),
  getNextPageParam: (page, pages) => page.hasMore ? pages.length : undefined,
  staleTime: 5 * 60 * 1000, gcTime: 30 * 60 * 1000, retry: 1 });
 const allTracks = useMemo(() => Array.from(new Map((query.data?.pages.flatMap(page => page.tracks) || []).map(track => [track.id, track])).values()), [query.data]);
 const tracks = useMemo(() => allTracks.filter(track => {
  if (filters.location && !normalizeText(track.location || '').includes(normalizeText(filters.location))) return false;
  if (!filters.decade) return true;
  if (track.releaseYear === undefined) return false;
  if (filters.decade === 'before1900') return track.releaseYear < 1900;
  const start = Number(filters.decade); return track.releaseYear >= start && track.releaseYear < start + 10;
 }), [allTracks, filters.location, filters.decade]);
 return { ...query, tracks, loadedCount: allTracks.length };
}
