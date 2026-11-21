import { useForm } from 'react-hook-form';
import { Globe2, CalendarDays, SlidersHorizontal } from 'lucide-react';
import { DECADES, MUSIC_GENRES } from '@/constants/musicCatalog';
import type { CatalogFilters as Filters } from '@/types/music';
interface CatalogFiltersProps { genre: string; filters: Filters; onGenre: (genre: string) => void; onFilter: (key: keyof Filters, value: string) => void; }
export default function CatalogFilters({ genre, filters, onGenre, onFilter }: CatalogFiltersProps) {
 const { register } = useForm<Filters>({ values: filters });
 return <section aria-label="Filtros do catálogo" className="mb-8 mt-7">
  <div className="mb-5 flex gap-3 overflow-x-auto pb-1">{MUSIC_GENRES.map(name => <button key={name} aria-pressed={genre === name} onClick={() => onGenre(name)} className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold ${genre === name ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground'}`}>{name}</button>)}</div>
  <details className="rounded-xl border border-border bg-card px-5 py-3" open={!!(filters.location || filters.decade)}>
   <summary className="min-h-11 cursor-pointer text-sm font-semibold"><SlidersHorizontal size={17} className="mr-2 inline text-primary"/>Explorar locais e datas informados</summary>
   <form onSubmit={event => event.preventDefault()} className="grid gap-5 py-4 md:grid-cols-2">
    <div><label htmlFor="catalog-location" className="mb-2 flex items-center gap-2 text-sm font-semibold"><Globe2 size={17}/>Local informado pelo artista</label><input id="catalog-location" {...register('location', { onChange: event => onFilter('location', String(event.target.value)) })} placeholder="Ex.: Brazil, Jamaica, London" autoComplete="off" className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base"/></div>
    <div><label htmlFor="catalog-decade" className="mb-2 flex items-center gap-2 text-sm font-semibold"><CalendarDays size={17}/>Década informada no Audius</label><select id="catalog-decade" {...register('decade', { onChange: event => onFilter('decade', String(event.target.value)) })} className="h-12 w-full rounded-lg border border-border bg-background px-4 text-base"><option value="">Todas as datas disponíveis</option>{DECADES.map(decade => <option value={decade} key={decade}>{decade}–{Number(decade) + 9}</option>)}<option value="before1900">Antes de 1900</option></select></div>
    <p className="text-sm leading-6 text-muted-foreground md:col-span-2">Filtros aplicados às músicas carregadas. O local é autodeclarado, não a nacionalidade. A data pode ser a publicação no Audius, não a gravação original. Sem esses filtros, a busca não restringe países nem datas.</p>
   </form>
  </details>
 </section>;
}
