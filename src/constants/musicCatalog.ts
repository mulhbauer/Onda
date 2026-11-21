export const PRIMARY_GENRES = ['Rock', 'Pop', 'Reggae', 'Rap'];
export const MUSIC_GENRES = ['Tudo', ...PRIMARY_GENRES, 'Eletrônica', 'Alternativa', 'Ambient'];
export const AUDIUS_GENRES: Record<string, string> = { Rock: 'Rock', Pop: 'Pop', Reggae: 'Reggae', Rap: 'Hip-Hop/Rap', 'Eletrônica': 'Electronic', Alternativa: 'Alternative', Ambient: 'Ambient' };
export const DECADES = Array.from({ length: Math.floor((new Date().getFullYear() - 1900) / 10) + 1 }, (_, index) => String(1900 + index * 10)).reverse();
export const PAGE_SIZE = 12;
export const AUDIUS_ORIGIN = 'https://api.audius.co';
export const normalizeText = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
export const displayGenre = (value: string) => Object.entries(AUDIUS_GENRES).find(([, apiGenre]) => apiGenre === value)?.[0] || value;
