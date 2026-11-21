import { Link } from 'react-router-dom';
import { ArrowRight, AudioLines, Clock3 } from 'lucide-react';
import useCatalog from '@/hooks/useCatalog';
import useCatalogParams from '@/hooks/useCatalogParams';
import DiscoveryHero from '@/components/features/DiscoveryHero';
import CatalogFilters from '@/components/features/CatalogFilters';
import CatalogStatus from '@/components/features/CatalogStatus';
import CatalogLoadMore from '@/components/features/CatalogLoadMore';
import CatalogNotice from '@/components/features/CatalogNotice';
import TrackCard from '@/components/features/TrackCard';
import TrackList from '@/components/features/TrackList';
export default function Index() {
 const { params, genre, filters, update } = useCatalogParams();
 const sort = params.get('sort') === 'recent' ? 'recent' : 'popular';
 const catalog = useCatalog({ genre, sort }, filters);
 const tracks = catalog.tracks;
 const filtering = !!(filters.location || filters.decade);
 return <main className="page-shell !pt-3">
  <div className="mb-7"><p className="eyebrow mb-2">Rock · Pop · Reggae · Rap</p><h1 className="text-3xl font-extrabold tracking-tight">O mundo tem muitas frequências<span className="text-primary">.</span></h1></div>
  <DiscoveryHero tracks={tracks} loading={catalog.isPending}/>
  <CatalogFilters genre={genre} filters={filters} onGenre={value => update('genre', value)} onFilter={update}/>
  <section aria-labelledby="catalog-heading">
   <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><div><h2 id="catalog-heading" className="flex items-center gap-2 text-xl font-bold"><AudioLines size={21} className="text-primary"/>{sort === 'recent' ? 'Publicadas recentemente' : 'Explore o catálogo'}{genre !== 'Tudo' ? ` · ${genre}` : ''}</h2><p className="mt-2 text-sm text-muted-foreground">{sort === 'recent' ? 'Ordenação por publicação no Audius, não pela época original.' : 'Faixas completas disponíveis para streaming no Audius.'}</p></div><Link to={`/search${genre !== 'Tudo' ? `?genre=${encodeURIComponent(genre)}` : ''}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">Buscar artista <ArrowRight size={16}/></Link></div>
   <div className="mb-6 flex gap-3"><button aria-pressed={sort === 'popular'} className={`secondary-button ${sort === 'popular' ? 'bg-elevated !text-primary' : ''}`} onClick={() => update('sort', 'popular')}>Mais ouvidas no Audius</button><button aria-pressed={sort === 'recent'} className={`secondary-button ${sort === 'recent' ? 'bg-elevated !text-primary' : ''}`} onClick={() => update('sort', 'recent')}><Clock3 size={16}/>Recentes</button></div>
   <CatalogStatus loading={catalog.isPending} error={catalog.error} empty={!tracks.length} filtered={filtering} onRetry={() => void catalog.refetch()}/>
   {!!tracks.length && <><div className="-mx-2 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">{tracks.slice(0, 6).map(track => <TrackCard key={track.id} track={track} queue={tracks}/>)}</div>{tracks.length > 6 && <div className="mt-8"><h3 className="mb-5 text-lg font-bold">Continue descobrindo</h3><TrackList tracks={tracks.slice(6)}/></div>}</>}
   {!catalog.isPending && <CatalogLoadMore hasMore={!!catalog.hasNextPage} loading={catalog.isFetchingNextPage} count={tracks.length} loadedCount={catalog.loadedCount} onMore={() => void catalog.fetchNextPage()}/>}
  </section>
  <CatalogNotice/>
 </main>;
}
