import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, Globe2, Radio } from 'lucide-react';
import { usePlayer } from '@/stores/playerStore';
import { PRIMARY_GENRES } from '@/constants/musicCatalog';
import type { Track } from '@/types/music';
interface DiscoveryHeroProps { tracks: Track[]; loading: boolean; }
export default function DiscoveryHero({ tracks, loading }: DiscoveryHeroProps) {
 const play = usePlayer(state => state.play);
 const locations = new Set(tracks.map(track => track.location).filter(Boolean)).size;
 return <div className="grid gap-5 xl:grid-cols-[1.9fr_1fr]">
  <section className="relative isolate min-h-[335px] overflow-hidden rounded-2xl border border-border bg-card">
   <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=85" alt="Ondas do oceano vistas da costa" className="absolute inset-0 -z-20 h-full w-full object-cover"/>
   <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/90 to-accent/40"/><div className="absolute inset-0 -z-10 bg-gradient-to-t from-background/70 to-background/10"/>
   <div className="flex h-full flex-col items-start justify-center p-7 sm:p-9">
    <span className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-primary"><Globe2 size={16}/>Catálogo global · Audius</span>
    <h2 className="max-w-lg text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">Seu som.<br/><span className="text-primary">Sem fronteiras.</span></h2>
    <p className="mb-6 mt-5 max-w-sm text-base leading-7 text-foreground">Guitarras, refrões, grooves e rimas.<br/>Encontre artistas além do seu radar.</p>
    <button className="primary-button" disabled={!tracks.length || loading} onClick={() => tracks[0] && play(tracks[0], tracks)}><Play size={17} fill="currentColor"/>{loading ? 'Consultando catálogo…' : 'Ouvir esta seleção'}</button>
   </div>
  </section>
  <section className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6">
   <div><p className="eyebrow mb-3 flex items-center gap-2"><Radio size={16}/>Quatro estilos, muitas histórias</p><h3 className="text-2xl font-extrabold tracking-tight">Encontre sua frequência.</h3><div className="mt-5 grid grid-cols-2 gap-3">{PRIMARY_GENRES.map((genre, index) => <Link to={`/?genre=${genre}`} key={genre} className={`flex min-h-14 items-center justify-between rounded-lg border border-border px-4 font-bold transition-transform duration-200 hover:-translate-y-0.5 hover:bg-elevated ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-background'}`}>{genre}<ArrowUpRight size={17}/></Link>)}</div></div>
   <div className="mt-6 flex gap-8 border-t border-border pt-5"><div><p className="text-2xl font-extrabold text-primary">{tracks.length}</p><p className="mt-1 text-xs text-muted-foreground">Faixas nesta seleção</p></div><div><p className="text-2xl font-extrabold">{locations || '—'}</p><p className="mt-1 text-xs text-muted-foreground">Locais informados</p></div></div>
  </section>
 </div>;
}
