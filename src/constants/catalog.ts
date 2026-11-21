import type { Track } from '@/types/music';
import { MUSIC_GENRES } from '@/constants/musicCatalog';
// Legado: estes exemplos são resolvidos apenas em bibliotecas antigas.
// A descoberta e a busca usam o Audius; não misturamos demos com o catálogo real.
const cover = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;
export const TRACKS: Track[] = [
 { id:'1', title:'Midnight frequencies', artist:'SoundHelix · Demo 1', album:'After hours', genre:'Eletrônica', duration:372, artwork:cover('photo-1470225620780-dba8ba36b745'), streamUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
 { id:'2', title:'Entre as ondas', artist:'SoundHelix · Demo 2', album:'Horizontes', genre:'Chill', duration:425, artwork:cover('photo-1518837695005-2083093ee35b'), streamUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
 { id:'3', title:'Golden hour', artist:'SoundHelix · Demo 3', album:'Dias de sol', genre:'Indie', duration:344, artwork:cover('photo-1475926920577-e2f7b9bd3f1b'), streamUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
 { id:'4', title:'Cidade em movimento', artist:'SoundHelix · Demo 4', album:'Luzes da cidade', genre:'Hip-hop', duration:302, artwork:cover('photo-1519608487953-e999c86e7455'), streamUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
 { id:'5', title:'Outra dimensão', artist:'SoundHelix · Demo 5', album:'Órbita', genre:'Eletrônica', duration:321, artwork:cover('photo-1462331940025-496dfbfc7564'), streamUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
 { id:'6', title:'Slow mornings', artist:'SoundHelix · Demo 6', album:'Pausa', genre:'Chill', duration:385, artwork:cover('photo-1441974231531-c6227db76b6e'), streamUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
 { id:'7', title:'Sem direção', artist:'SoundHelix · Demo 7', album:'Estradas', genre:'Rock', duration:361, artwork:cover('photo-1500534623283-312aade485b7'), streamUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
 { id:'8', title:'Reflexos', artist:'SoundHelix · Demo 8', album:'Novos caminhos', genre:'Indie', duration:340, artwork:cover('photo-1519681393784-d120267933ba'), streamUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
];
export const GENRES = MUSIC_GENRES;
export const formatTime = (seconds: number) => `${Math.floor((Number.isFinite(seconds) ? seconds : 0) / 60)}:${String(Math.floor((Number.isFinite(seconds) ? seconds : 0) % 60)).padStart(2, '0')}`;
