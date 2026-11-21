# Onda — Streaming global, local-first

## Catálogo real
A descoberta e a busca consultam a API pública do Audius, sem backend próprio, upload de MP3 ou chave secreta no frontend. Os estilos principais são **Rock, Pop, Reggae e Rap**; também há Eletrônica, Alternativa e Ambient.

- `Tudo` na descoberta mistura páginas independentes dos quatro estilos principais.
- Ao buscar um título ou artista sem selecionar gênero, a pesquisa consulta o catálogo geral do Audius.
- São exibidas apenas faixas identificadas pelo provedor como streamable, sem bloqueio de streaming e sem negação explícita de acesso.
- Utilizamos o endpoint de streaming completo, não o endpoint de previews. A disponibilidade continua dependente do provedor e das permissões atuais de cada faixa.
- `Carregar mais músicas` solicita outras páginas. Os resultados não são uma lista fixa.
- `Mais ouvidas no Audius` usa a ordenação popular da busca, não afirma ser um ranking mundial. `Recentes` usa a ordenação recente do provedor.

**Limite de cobertura:** nenhuma API gratuita garante todos os países, épocas ou sucessos comerciais. O Audius depende do repertório publicado pelos artistas e pode conter remixes, covers e versões. Os nomes de artistas exibidos correspondem aos perfis que publicaram as faixas. Não inferimos nacionalidade, autoria da gravação original ou licenças de redistribuição.

## Filtros por local e data
A consulta sem esses filtros não restringe países nem datas. Os filtros opcionais são aplicados **às músicas já carregadas**, não a todo o catálogo remoto:
- **Local informado pelo artista:** correspondência textual, sem diferenciar maiúsculas ou acentos, na localização autodeclarada. Use o texto registrado, por exemplo `Brazil`, `Jamaica` ou `London`. Não há tradução automática nem inferência de país a partir de cidades.
- **Década informada no Audius:** usa `release_date`. Essa data pode ser a publicação na plataforma, não a época da gravação original. Não usamos `created_at` como substituição.
- Inclui décadas desde 1900, `Antes de 1900` e todas as datas disponíveis; opções de períodos não garantem repertório para eles.
- Faixas sem metadados compatíveis ficam fora de um filtro específico. Um resultado vazio não comprova ausência no catálogo inteiro; altere os filtros ou carregue outras páginas.
- Artistas e álbuns na busca são agrupamentos das faixas carregadas, não consultas independentes de discografias completas.

## Estrutura
```text
src/
  components/
    features/ Player.tsx PlayerControls.tsx QueuePanel.tsx DiscoveryHero.tsx
              TrackCard.tsx TrackList.tsx TrackMenu.tsx LibraryTransfer.tsx
              CatalogFilters.tsx CatalogStatus.tsx CatalogLoadMore.tsx
              CatalogNotice.tsx SearchField.tsx SearchGroups.tsx
              ConfirmAction.tsx ErrorBoundary.tsx
    forms/    CreatePlaylistDialog.tsx
    layout/   Sidebar.tsx Header.tsx MobileNav.tsx
    ui/       componentes shadcn existentes (não modificados)
  constants/  musicCatalog.ts catalog.ts (apenas exemplos legados)
  hooks/      useLibrary.ts useCatalog.ts useCatalogParams.ts
  lib/        api.ts audiusAdapter.ts validations.ts
  pages/      Index.tsx Search.tsx Library.tsx NotFound.tsx
  stores/     playerStore.ts
  types/      music.ts
  App.tsx main.tsx index.css
```

## Arquitetura
- **Player persistente:** uma única instância de `HTMLAudioElement` e um store Zustand fora das rotas. Navegar não reinicia o áudio. Play/pause, seek, volume, mute, próximo/anterior, shuffle e repetição permanecem disponíveis.
- **API:** `api.ts` implementa pesquisa e paginação REST, cancelamento por `AbortSignal`, prazo de 15 segundos e tratamento de respostas HTTP. `audiusAdapter.ts` valida o formato com Zod e normaliza título, perfil, capa, álbum, gênero, localização e data. Referência: https://api.audius.co/v1 e https://docs.audius.co/sdk/tracks/.
- **Cache:** React Query mantém consultas em memória com stale time de cinco minutos e descarte após trinta minutos sem uso. A busca possui debounce de 350 ms. Há uma nova tentativa automática e ação manual para repetir consultas.
- **Biblioteca:** curtidas, playlists, até 100 faixas no histórico e metadados das faixas salvas ficam em `localStorage`, na chave `onda-library-v1`. URLs permanentes de streaming evitam persistir links assinados que expiram. Arquivos de áudio não são salvos.
- **Importação/exportação:** JSON inclui os metadados das faixas reais. Importação valida com Zod, limita a 2 MB e pede confirmação antes de substituir. Arquivos antigos sem metadados continuam compatíveis com as faixas demonstrativas legadas. Não há sincronização automática entre navegadores.
- **PWA:** o plugin em `vite.config.ts` gera manifesto, ícone e service worker. Guarda somente o shell e assets compilados; áudio, respostas Audius e capas externas não são armazenados pelo service worker. Ouvir exige internet. Instalação e reprodução em segundo plano dependem do navegador.

A maioria dos endpoints de leitura do Audius funciona sem credenciais; limites, CORS, termos e disponibilidade podem mudar. Não há garantia de custo zero em qualquer escala. Nenhuma chave secreta deve ser exposta no frontend. A interface exibe falhas em vez de substituir resultados por áudio de demonstração.

## Rodar localmente
Use Node.js 20.19+ ou 22.12+ e o projeto completo exportado por **Download** ou **GitHub** no OnSpace.
```bash
cd caminho/do/projeto
npm install
npm run dev -- --host 0.0.0.0
# Produção / PWA:
npm run build
npm run preview -- --host 0.0.0.0
```
Abra a URL indicada pelo Vite: normalmente `http://localhost:8080` no desenvolvimento e `http://localhost:4173` no preview. Não é necessário `.env`. HTTPS ou localhost são necessários para service workers; acessar pelo IP da máquina em um celular pode exigir HTTPS.

## Deploy
- **OnSpace:** clique **Publish** para publicar com HTTPS em `.onspace.app`.
- **Netlify:** execute `npm run build`, crie `dist/_redirects` com `/* /index.html 200` e envie `dist` em **Add new site → Deploy manually**. Em integração Git, configure build `npm run build`, saída `dist`, e mantenha `_redirects` em `public/` no projeto exportado.
- **Vercel:** importe o repositório, selecione preset Vite, build `npm run build` e saída `dist`. No projeto exportado, crie `vercel.json`:
```json
{ "rewrites": [{ "source": "/((?!assets/|sw\\.js|manifest\\.webmanifest|onda-icon.*).*)", "destination": "/index.html" }] }
```
Teste abrir `/search` e `/library` diretamente e confira `sw.js` e `manifest.webmanifest`. O projeto pressupõe publicação na raiz do domínio. Os serviços de hospedagem gratuitos têm limites e termos próprios.

## Verificação
Consultas reais de metadados para Rock, Pop, Reggae e Hip-Hop/Rap retornaram faixas nesta sessão. Não foram executados build CLI, testes automatizados ou testes de áudio no navegador.

Antes de publicar, execute o build e valide: reprodução em cada gênero, navegação com áudio contínuo, paginação, busca com debounce, filtros por metadados, curtidas/playlists após recarregar, exportação/importação em outro navegador, falhas de conexão e uso móvel. Depois da primeira visita online, a interface PWA pode abrir offline, mas o streaming não funciona sem internet.
