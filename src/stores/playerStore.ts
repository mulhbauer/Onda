import { create } from 'zustand';
import { toast } from 'sonner';
import { useLibrary } from '@/hooks/useLibrary';
import type { Track, RepeatMode } from '@/types/music';
interface PlayerStore { track:Track|null; queue:Track[]; playing:boolean; loading:boolean; position:number; duration:number; volume:number; muted:boolean; shuffle:boolean; repeat:RepeatMode; play:(track:Track,queue?:Track[])=>void; toggle:()=>void; next:()=>void; previous:()=>void; seek:(value:number)=>void; setVolume:(value:number)=>void; toggleMute:()=>void; toggleShuffle:()=>void; cycleRepeat:()=>void; }
// Uma única instância de áudio fora das páginas mantém a reprodução na navegação.
const audio = new Audio();
audio.preload = 'metadata';
audio.volume = 0.7;
async function resume() {
 try { await audio.play(); }
 catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return; usePlayer.setState({playing:false,loading:false}); toast.error('Não foi possível reproduzir. Verifique sua conexão e tente novamente.'); }
}
export const usePlayer = create<PlayerStore>((set,get)=>({
 track:null, queue:[], playing:false, loading:false, position:0, duration:0, volume:0.7, muted:false, shuffle:false, repeat:'off',
 play:(track,queue)=>{
  if(get().track?.id === track.id){if(audio.ended)audio.currentTime=0;void resume();return;}
  console.log('[Onda] Reproduzir', track.id);
  set({track,queue:queue?.length?queue:[track],position:0,duration:track.duration,loading:true});
  audio.src=track.source==='audius'?`https://api.audius.co/v1/tracks/${encodeURIComponent(track.id.replace(/^audius:/,''))}/stream?app_name=Onda`:track.streamUrl; void resume(); useLibrary.getState().record(track.id,track);
 },
 toggle:()=>{if(!get().track)return;if(audio.paused)void resume();else audio.pause();},
 next:()=>{const s=get();if(!s.queue.length)return; const index=s.queue.findIndex(t=>t.id===s.track?.id); let next=index+1;
  if(s.shuffle&&s.queue.length>1){const others=s.queue.filter(t=>t.id!==s.track?.id);s.play(others[Math.floor(Math.random()*others.length)],s.queue);return;}
  if(next>=s.queue.length){if(s.repeat==='all')next=0;else{audio.pause();set({playing:false});return;}}s.play(s.queue[next],s.queue);
 },
 previous:()=>{if(audio.currentTime>3){audio.currentTime=0;return;}const s=get();const index=s.queue.findIndex(t=>t.id===s.track?.id);if(s.queue.length)s.play(s.queue[Math.max(0,index-1)],s.queue);},
 seek:value=>{if(!Number.isFinite(audio.duration))return;audio.currentTime=Math.max(0,Math.min(value,audio.duration));set({position:audio.currentTime});},
 setVolume:value=>{audio.volume=value;audio.muted=false;set({volume:value,muted:false});},
 toggleMute:()=>{audio.muted=!audio.muted;set({muted:audio.muted});},
 toggleShuffle:()=>set(s=>({shuffle:!s.shuffle})),
 cycleRepeat:()=>set(s=>({repeat:s.repeat==='off'?'all':s.repeat==='all'?'one':'off'})),
}));
audio.addEventListener('play',()=>usePlayer.setState({playing:true}));
audio.addEventListener('pause',()=>usePlayer.setState({playing:false}));
audio.addEventListener('playing',()=>usePlayer.setState({loading:false}));
audio.addEventListener('waiting',()=>usePlayer.setState({loading:true}));
audio.addEventListener('timeupdate',()=>usePlayer.setState({position:audio.currentTime}));
audio.addEventListener('loadedmetadata',()=>usePlayer.setState({duration:Number.isFinite(audio.duration)?audio.duration:0}));
audio.addEventListener('error',()=>{usePlayer.setState({playing:false,loading:false});toast.error('Áudio indisponível. Tente outra música.');});
audio.addEventListener('ended',()=>{const s=usePlayer.getState();if(s.repeat==='one'){audio.currentTime=0;void resume();}else s.next();});
