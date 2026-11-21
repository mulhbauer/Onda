import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useCatalog from '@/hooks/useCatalog';
import useCatalogParams from '@/hooks/useCatalogParams';
import SearchField from '@/components/features/SearchField';
import SearchGroups from '@/components/features/SearchGroups';
import CatalogFilters from '@/components/features/CatalogFilters';
import CatalogStatus from '@/components/features/CatalogStatus';
import CatalogLoadMore from '@/components/features/CatalogLoadMore';
import CatalogNotice from '@/components/features/CatalogNotice';
import TrackList from '@/components/features/TrackList';
export default function Search() {
 const { params, genre, filters, update } = useCatalogParams();
 const urlTerm = params.get('q') || '';
 const { register, watch, setValue } = useForm<{ q: string }>({ values: { q: urlTerm } });
 const term = watch('q'); const [debounced, setDebounced] = useState(urlTerm);
 const kind = params.get('type') || 'music';
 // Debounce conserva o campo responsivo; React Query cancela consultas superadas.
 useEffect(() => { const timer = setTimeout(() => { setDebounced(term); update('q', term); }, 350); return () => clearTimeout(timer); }, [term, update]);
 const catalog = useCatalog({ query: debounced, genre, sort: debounced ? 'relevant' : 'popular' }, filters);
 const busy = catalog.isPending || term !== debounced;
 return <main className="page-shell !pt-3">
  <p className="eyebrow mb-2">Descobertas sem fronteiras</p><h1 className="mb-7 text-3xl font-extrabold tracking-tight">Qual som você procura?</h1>
  <SearchField register={register} term={term} onClear={() => setValue('q', '')}/>
  <CatalogFilters genre={genre} filters={filters} onGenre={value => update('genre', value)} onFilter={update}/>
  <div className="mb-7 flex flex-wrap gap-3">{[{ id: 'music', label: 'Músicas' }, { id: 'artists', label: 'Artistas nas faixas' }, { id: 'albums', label: 'Álbuns nas faixas' }].map(tab => <button key={tab.id} aria-pressed={kind === tab.id} className={`min-h-11 rounded-full px-5 text-sm font-semibold ${kind === tab.id ? 'bg-foreground text-background' : 'bg-card text-muted-foreground hover:text-foreground'}`} onClick={() => update('type', tab.id)}>{tab.label}</button>)}</div>
  <div className="mb-5"><h2 className="text-xl font-bold">{debounced ? `Resultados para “${debounced}”` : 'Explore Rock, Pop, Reggae e Rap'}</h2><p className="mt-2 text-sm text-muted-foreground">Busca real no Audius. Os grupos de artistas e álbuns são derivados das faixas carregadas.</p></div>
  <CatalogStatus loading={busy} error={catalog.error} empty={!catalog.tracks.length} filtered={!!(filters.location || filters.decade)} onRetry={() => void catalog.refetch()}/>
  {!busy && !!catalog.tracks.length && (kind === 'music' ? <TrackList tracks={catalog.tracks}/> : <SearchGroups tracks={catalog.tracks} kind={kind} onSelect={name => { setValue('q', name); update('type', 'music'); }}/>) }
  {!busy && <CatalogLoadMore hasMore={!!catalog.hasNextPage} loading={catalog.isFetchingNextPage} count={catalog.tracks.length} loadedCount={catalog.loadedCount} onMore={() => void catalog.fetchNextPage()}/>}
  <CatalogNotice/>
 </main>;
}
