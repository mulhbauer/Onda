import { createRoot } from 'react-dom/client';
import App from '@/App';
import '@/index.css';
createRoot(document.getElementById('root')!).render(<App/>);
if ('serviceWorker' in navigator && import.meta.env.PROD) {
 window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').then(reg=>console.log('[Onda] PWA registrada',reg.scope),error=>console.warn('[Onda] PWA indisponível',error));});
}
