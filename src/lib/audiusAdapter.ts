import { z } from 'zod';
import { AUDIUS_ORIGIN, displayGenre } from '@/constants/musicCatalog';
import type { Track } from '@/types/music';
const httpsUrl = z.string().url().refine(value => value.startsWith('https://'));
export const audiusResponseSchema = z.object({ data: z.array(z.object({
 id: z.string(), title: z.string(), duration: z.number(), genre: z.string().nullish(),
 user: z.object({ name: z.string(), location: z.string().nullish() }),
 artwork: z.object({ '480x480': z.string().nullish(), '150x150': z.string().nullish() }).nullish(),
 album_backlink: z.object({ playlist_name: z.string() }).nullish(),
 release_date: z.string().nullish(), permalink: z.string().nullish(),
 is_streamable: z.boolean().optional(), is_stream_gated: z.boolean().optional(),
 is_available: z.boolean().optional(), is_delete: z.boolean().optional(),
 access: z.object({ stream: z.boolean().optional() }).nullish(),
 }) ) });
type AudiusTrack = z.infer<typeof audiusResponseSchema>['data'][number];
// A capa vazia é uma ilustração local em SVG, nunca a capa de outra música.
const FALLBACK_ART = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480"><rect width="480" height="480" fill="hsl(180,5%,11%)"/><path d="M90 210q75-90 150 0t150 0M90 290q75-90 150 0t150 0" stroke="hsl(79,89%,64%)" stroke-width="24" stroke-linecap="round" fill="none"/></svg>')}`;
export function mapAudiusTrack(track: AudiusTrack): Track {
 const date = track.release_date ? new Date(track.release_date) : null;
 const releaseYear = date && Number.isFinite(date.getTime()) ? date.getUTCFullYear() : undefined;
 const cover = track.artwork?.['480x480'] || track.artwork?.['150x150'];
 return { id: `audius:${track.id}`, title: track.title, artist: track.user.name,
 album: track.album_backlink?.playlist_name || 'Faixa avulsa', genre: displayGenre(track.genre || 'Outro'),
 duration: Math.max(0, track.duration), artwork: cover && httpsUrl.safeParse(cover).success ? cover : FALLBACK_ART,
 // URLs permanentes resolvem o stream atual; não armazenamos links assinados que expiram.
 streamUrl: `${AUDIUS_ORIGIN}/v1/tracks/${encodeURIComponent(track.id)}/stream?app_name=Onda`,
 source: 'audius', location: track.user.location || undefined, releaseYear,
 releaseDate: date && releaseYear ? date.toISOString() : undefined,
 sourceUrl: track.permalink?.startsWith('/') ? `https://audius.co${track.permalink}` : undefined };
}
export function isFreeStream(track: AudiusTrack) {
 return track.is_streamable === true && track.is_stream_gated !== true && track.access?.stream !== false && track.is_available !== false && track.is_delete !== true;
}
