interface CatalogLoadMoreProps { hasMore: boolean; loading: boolean; count: number; loadedCount: number; onMore: () => void; }
export default function CatalogLoadMore({ hasMore, loading, count, loadedCount, onMore }: CatalogLoadMoreProps) {
 return <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5"><p aria-live="polite" className="text-sm text-muted-foreground">{count} músicas exibidas · {loadedCount} carregadas</p>{hasMore && <button className="secondary-button" disabled={loading} onClick={onMore}>{loading ? 'Carregando…' : 'Carregar mais músicas'}</button>}</div>;
}
