import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MUSIC_GENRES, DECADES } from '@/constants/musicCatalog';
export default function useCatalogParams() {
 const [params, setParams] = useSearchParams();
 const requestedGenre = params.get('genre') || 'Tudo';
 const genre = MUSIC_GENRES.includes(requestedGenre) ? requestedGenre : 'Tudo';
 const decade = params.get('decade') || '';
 const filters = { location: params.get('location') || '', decade: DECADES.includes(decade) || decade === 'before1900' ? decade : '' };
 const update = useCallback((key: string, value: string) => {
  setParams(previous => { const next = new URLSearchParams(previous); if (value && value !== 'Tudo') next.set(key, value); else next.delete(key); return next; }, { replace: true });
 }, [setParams]);
 return { params, genre, filters, update };
}
