import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ListMusic } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { playlistSchema } from '@/lib/validations';
import { useLibrary } from '@/hooks/useLibrary';
interface CreatePlaylistDialogProps { open:boolean; onOpenChange:(open:boolean)=>void; }
export default function CreatePlaylistDialog({open,onOpenChange}:CreatePlaylistDialogProps){
 const {register,handleSubmit,reset,formState:{errors}}=useForm<{name:string}>({resolver:zodResolver(playlistSchema)});const create=useLibrary(s=>s.createPlaylist);
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="border-border bg-card"><ListMusic size={32} className="text-primary"/><DialogTitle>Uma playlist com a sua cara</DialogTitle><DialogDescription>Dê um nome à sua próxima coleção de descobertas.</DialogDescription><form onSubmit={handleSubmit(data=>{create(data.name);reset();onOpenChange(false);})} className="space-y-5"><div><label htmlFor="playlist-name" className="mb-2 block text-sm font-semibold">Nome da playlist</label><input id="playlist-name" {...register('name')} placeholder="Ex.: Caminho para casa" className="h-12 w-full rounded-lg border border-border bg-background px-4" aria-invalid={!!errors.name}/>{errors.name&&<p role="alert" className="mt-2 flex items-center gap-2 text-sm text-destructive"><AlertCircle size={16}/>{errors.name.message}</p>}</div><button className="primary-button w-full" type="submit">Criar playlist</button></form></DialogContent></Dialog>;
}
