import { useState } from 'react';
import { Heart, Volume2, VolumeX, ListMusic, Play, Pause, ChevronUp, Music2 } from 'lucide-react';
import { usePlayer } from '@/stores/playerStore';
import { useLibrary } from '@/hooks/useLibrary';
import PlayerControls from '@/components/features/PlayerControls';
import QueuePanel from '@/components/features/QueuePanel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
export default function Player(){
 const p=usePlayer();const library=useLibrary();const [expanded,setExpanded]=useState(false);const [queue,setQueue]=useState(false);
 const artwork=p.track?<img src={p.track.artwork} alt="" className="h-14 w-14 rounded-lg object-cover"/>:<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-elevated"><Music2 className="text-primary"/></div>;
 return <><footer aria-label="Player de música" className="fixed bottom-[64px] left-0 z-40 w-full border-t border-border bg-background px-4 py-3 md:bottom-0 md:px-6">
  <div className="flex items-center justify-between gap-3">
   <div className="flex min-w-0 items-center gap-3 md:w-[28%]">{artwork}<div className="min-w-0"><p className="truncate text-sm font-bold">{p.track?.title||'Sua próxima descoberta'}</p><p className="mt-1 truncate text-xs text-muted-foreground">{p.track?.artist||'Escolha uma música para começar'}</p></div><button aria-label="Curtir música atual" disabled={!p.track} onClick={()=>p.track&&library.toggleLike(p.track.id,p.track)} className={`icon-button hidden sm:flex ${library.liked.includes(p.track?.id||'')?'!text-primary':''}`}><Heart size={18} fill={library.liked.includes(p.track?.id||'')?'currentColor':'none'}/></button></div>
   <div className="hidden w-[44%] justify-center md:flex"><PlayerControls/></div>
   <div className="hidden items-center justify-end gap-1 md:flex md:w-[28%]"><button className={`icon-button ${queue?'!text-primary':''}`} aria-label="Abrir fila de reprodução" onClick={()=>setQueue(!queue)}><ListMusic size={19}/></button><button className="icon-button" aria-label={p.muted?'Ativar som':'Silenciar'} onClick={p.toggleMute}>{p.muted?<VolumeX size={19}/>:<Volume2 size={19}/>}</button><input className="w-20 lg:w-24" type="range" aria-label="Volume" min={0} max={1} step={0.01} value={p.muted?0:p.volume} onChange={e=>p.setVolume(Number(e.target.value))}/></div>
   <div className="flex md:hidden"><button className="icon-button !text-foreground" disabled={!p.track} aria-label={p.playing?'Pausar':'Reproduzir'} onClick={p.toggle}>{p.playing?<Pause fill="currentColor"/>:<Play fill="currentColor"/>}</button><button className="icon-button" aria-label="Expandir player" onClick={()=>setExpanded(true)}><ChevronUp/></button></div>
  </div>
 </footer>
 <Dialog open={expanded} onOpenChange={setExpanded}><DialogContent className="border-border bg-card"><DialogTitle>Tocando agora</DialogTitle>{p.track&&<img src={p.track.artwork} alt={p.track.album} className="mx-auto aspect-square w-56 rounded-xl object-cover"/>}<div className="text-center"><p className="text-xl font-bold">{p.track?.title||'Nenhuma música selecionada'}</p><p className="text-muted-foreground">{p.track?.artist}</p></div><PlayerControls/><div className="flex items-center gap-3"><Volume2 size={18}/><input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={p.muted?0:p.volume} onChange={e=>p.setVolume(Number(e.target.value))} className="flex-1"/><button aria-label="Curtir música" className="icon-button" disabled={!p.track} onClick={()=>p.track&&library.toggleLike(p.track.id,p.track)}><Heart className={library.liked.includes(p.track?.id||'')?'text-primary':''}/></button><button aria-label="Ver fila" className="icon-button" onClick={()=>{setExpanded(false);setQueue(true);}}><ListMusic/></button></div></DialogContent></Dialog>
 <QueuePanel open={queue} onClose={()=>setQueue(false)}/></>;
}
