import { AlertCircle, AudioLines, RefreshCw } from 'lucide-react';
interface CatalogStatusProps { loading: boolean; error: Error | null; empty: boolean; filtered?: boolean; onRetry: () => void; }
export default function CatalogStatus({ loading, error, empty, filtered, onRetry }: CatalogStatusProps) {
 if (loading) return <div role="status" className="mb-5 flex items-center gap-3 rounded-xl border border-border bg-card p-8 text-muted-foreground"><AudioLines className="text-primary"/>Consultando músicas reais no Audius…</div>;
 if (error) return <div role="alert" className="mb-5 rounded-xl border border-destructive/40 bg-card p-6"><p className="mb-4 flex items-center gap-3 text-destructive"><AlertCircle className="shrink-0"/>{error.message || 'Não foi possível consultar o Audius. Verifique sua conexão.'}</p><button className="secondary-button" onClick={onRetry}><RefreshCw size={17}/>Tentar novamente</button></div>;
 if (empty) return <div className="mb-5 rounded-xl border border-dashed border-border p-8 text-center"><AudioLines className="mx-auto mb-4 text-primary"/><h3 className="text-lg font-bold">Nenhuma faixa nesta seleção</h3><p className="mt-2 text-base leading-7 text-muted-foreground">{filtered ? 'Altere os filtros ou carregue mais músicas. Isso não significa que o catálogo inteiro esteja vazio para esse local ou período.' : 'Experimente outro gênero ou nome de artista. Exibimos apenas streams completos sem bloqueio de acesso informado.'}</p></div>;
 return null;
}
