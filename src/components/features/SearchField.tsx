import { Search, X } from 'lucide-react';
import type { UseFormRegister } from 'react-hook-form';
interface SearchFieldProps { register: UseFormRegister<{ q: string }>; term: string; onClear: () => void; }
export default function SearchField({ register, term, onClear }: SearchFieldProps) {
 return <form onSubmit={event => event.preventDefault()} className="mb-6 max-w-2xl"><label htmlFor="music-search" className="mb-2 block text-base font-semibold">Buscar músicas ou artistas no Audius</label><div className="flex items-center rounded-xl border border-border bg-card px-4"><Search size={22} className="shrink-0 text-primary"/><input id="music-search" {...register('q')} maxLength={200} autoComplete="off" placeholder="Digite um título ou artista, de qualquer lugar" className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base outline-none"/>{term && <button type="button" aria-label="Limpar busca" className="icon-button" onClick={onClear}><X size={18}/></button>}</div></form>;
}
