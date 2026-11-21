import { AUDIUS_GENRES, AUDIUS_ORIGIN, PAGE_SIZE, PRIMARY_GENRES } from '@/constants/musicCatalog';
import { audiusResponseSchema, isFreeStream, mapAudiusTrack } from '@/lib/audiusAdapter';
import type { CatalogOptions, CatalogPage, Track } from '@/types/music';
async function requestTracks(options: CatalogOptions, page: number, signal?: AbortSignal): Promise<CatalogPage> {
 const url = new URL('/v1/tracks/search', AUDIUS_ORIGIN);
 url.searchParams.set('app_name', 'Onda'); url.searchParams.set('limit', String(PAGE_SIZE));
 url.searchParams.set('offset', String(page * PAGE_SIZE));
 url.searchParams.set('sort_method', options.sort || (options.query?.trim() ? 'relevant' : 'popular'));
 if (options.query?.trim()) url.searchParams.set('query', options.query.trim());
 if (options.genre && AUDIUS_GENRES[options.genre]) url.searchParams.set('genre', AUDIUS_GENRES[options.genre]);
 const controller = new AbortController();
 const abort = () => controller.abort(); signal?.addEventListener('abort', abort, { once: true });
 if (signal?.aborted) controller.abort();
 const timer = setTimeout(abort, 15000);
 // Falhas externas são exibidas na tela; não substituímos músicas reais por demos.
 try {
  const response = await fetch(url, { signal: controller.signal });
  if (!response.ok) throw new Error(response.status === 429 ? 'O Audius atingiu o limite de consultas. Aguarde um minuto e tente novamente.' : `O Audius está indisponível (${response.status}). Tente novamente.`);
  const parsed = audiusResponseSchema.safeParse(await response.json());
  if (!parsed.success) throw new Error('O catálogo retornou dados inválidos. Tente novamente mais tarde.');
  console.log('[Onda] Catálogo Audius', options.genre || 'todos', page, parsed.data.data.length);
  return { tracks: parsed.data.data.filter(isFreeStream).map(mapAudiusTrack), hasMore: parsed.data.data.length === PAGE_SIZE };
 } finally { clearTimeout(timer); signal?.removeEventListener('abort', abort); }
}
export async function fetchCatalogPage(options: CatalogOptions, page = 0, signal?: AbortSignal): Promise<CatalogPage> {
 if (options.query?.trim() || (options.genre && options.genre !== 'Tudo')) return requestTracks(options, page, signal);
 // Cada gênero é consultado separadamente para não deixar Rock/Pop/Reggae atrás do Rap.
 const pages = await Promise.all(PRIMARY_GENRES.map(genre => requestTracks({ ...options, genre }, page, signal)));
 const length = Math.max(0, ...pages.map(result => result.tracks.length));
 const tracks = Array.from({ length }, (_, index) => pages.flatMap(result => result.tracks[index] ? [result.tracks[index]] : [])).flat();
 return { tracks: Array.from(new Map(tracks.map(track => [track.id, track])).values()), hasMore: pages.some(result => result.hasMore) };
}
export async function searchTracks(query: string, signal?: AbortSignal): Promise<Track[]> {
 return (await fetchCatalogPage({ query }, 0, signal)).tracks;
}
