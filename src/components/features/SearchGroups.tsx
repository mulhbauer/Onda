import { AudioLines } from 'lucide-react';
import type { Track } from '@/types/music';
interface SearchGroupsProps { tracks: Track[]; kind: string; onSelect: (name: string) => void; }
export default function SearchGroups({ tracks, kind, onSelect }: SearchGroupsProps) {
 const field = kind === 'artists' ? 'artist' : 'album';
 const groups = Array.from(new Set(tracks.map(track => track[field])));
 return <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{groups.map(name => {
  const track = tracks.find(item => item[field] === name)!;
  return <button key={name} onClick={() => onSelect(name)} className="rounded-xl border border-border bg-card p-4 text-left transition-transform duration-200 hover:-translate-y-1 hover:bg-elevated">
   <img src={track.artwork} alt="" loading="lazy" className={`mb-4 aspect-square w-full object-cover ${kind === 'artists' ? 'rounded-full' : 'rounded-lg'}`}/><h3 className="truncate text-base font-bold">{name}</h3>
   <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><AudioLines size={14}/>{kind === 'artists' ? 'Artista no Audius' : `${tracks.filter(item => item.album === name).length} faixas nesta seleção`}</p>
  </button>;
 })}</div>;
}
