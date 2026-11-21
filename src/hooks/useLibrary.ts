import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import type { LibraryData, Track } from '@/types/music';
interface LibraryStore extends LibraryData { tracks: Record<string, Track>; toggleLike: (id:string,track?:Track)=>void; record: (id:string,track?:Track)=>void; createPlaylist:(name:string)=>void; addTrack:(playlistId:string,trackId:string,track?:Track)=>void; removeTrack:(playlistId:string,trackId:string)=>void; deletePlaylist:(id:string)=>void; importLibrary:(data:LibraryData)=>void; }
const withTrack = (tracks: Record<string, Track>, track?: Track) => track ? { ...tracks, [track.id]: track } : tracks;
// Apenas metadados são persistidos; nenhum arquivo de áudio é armazenado.
export const useLibrary = create<LibraryStore>()(persist((set) => ({
 version:1, liked:[], history:[], playlists:[], tracks:{},
 toggleLike: (id,track) => set(s => ({liked:s.liked.includes(id)?s.liked.filter(x=>x!==id):[id,...s.liked],tracks:withTrack(s.tracks,track)})),
 record: (id,track) => set(s => ({history:[id,...s.history.filter(x=>x!==id)].slice(0,100),tracks:withTrack(s.tracks,track)})),
 createPlaylist: name => { set(s => ({playlists:[...s.playlists,{id:crypto.randomUUID(),name,trackIds:[],createdAt:Date.now()}]})); toast.success('Playlist criada.'); },
 addTrack:(playlistId,trackId,track)=>{set(s=>({playlists:s.playlists.map(p=>p.id===playlistId?{...p,trackIds:Array.from(new Set([...p.trackIds,trackId]))}:p),tracks:withTrack(s.tracks,track)}));toast.success('Música adicionada à playlist.');},
 removeTrack:(playlistId,trackId)=>set(s=>({playlists:s.playlists.map(p=>p.id===playlistId?{...p,trackIds:p.trackIds.filter(id=>id!==trackId)}:p)})),
 deletePlaylist:id=>{set(s=>({playlists:s.playlists.filter(p=>p.id!==id)}));toast.success('Playlist excluída.');},
 importLibrary:data=>{set({...data,tracks:data.tracks||{}});toast.success('Biblioteca importada.');},
}),{name:'onda-library-v1',partialize:s=>({version:s.version,liked:s.liked,history:s.history,playlists:s.playlists,tracks:s.tracks})}));
