import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Repeat1, Loader2 } from 'lucide-react';
import { usePlayer } from '@/stores/playerStore';
import { formatTime } from '@/constants/catalog';
export default function PlayerControls(){
 const p=usePlayer();
 return <div className="w-full max-w-[520px]">
  <div className="flex items-center justify-center gap-3 sm:gap-4">
   <button aria-label="Modo aleatório" aria-pressed={p.shuffle} className={`icon-button ${p.shuffle?'!text-primary':''}`} onClick={p.toggleShuffle}><Shuffle size={17}/></button>
   <button aria-label="Música anterior" className="icon-button" onClick={p.previous} disabled={!p.track}><SkipBack size={20} fill="currentColor"/></button>
   <button aria-label={p.playing?'Pausar':'Reproduzir'} className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background hover:opacity-80 active:scale-95" disabled={!p.track} onClick={p.toggle}>{p.loading?<Loader2 size={20}/>:p.playing?<Pause size={19} fill="currentColor"/>:<Play size={19} fill="currentColor" className="ml-0.5"/>}</button>
   <button aria-label="Próxima música" className="icon-button" onClick={p.next} disabled={!p.track}><SkipForward size={20} fill="currentColor"/></button>
   <button aria-label={`Repetição: ${p.repeat==='off'?'desligada':p.repeat==='all'?'fila':'uma música'}`} aria-pressed={p.repeat!=='off'} className={`icon-button ${p.repeat!=='off'?'!text-primary':''}`} onClick={p.cycleRepeat}>{p.repeat==='one'?<Repeat1 size={17}/>:<Repeat size={17}/>}</button>
  </div>
  <div className="flex items-center gap-3 text-[11px] tabular-nums text-muted-foreground"><span>{formatTime(p.position)}</span><input aria-label="Posição da música" type="range" min={0} max={p.duration||1} step={0.1} value={Math.min(p.position,p.duration||1)} onChange={e=>p.seek(Number(e.target.value))} disabled={!p.track} className="h-5 min-w-0 flex-1"/><span>{formatTime(p.duration)}</span></div>
 </div>;
}
