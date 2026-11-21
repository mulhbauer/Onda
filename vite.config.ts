import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// Recursos PWA gerados no build, sem modificar o diretório público protegido.
function ondaPwa():Plugin{return {name:'onda-pwa',generateBundle(_options,bundle){
 const assets=['/','/index.html',...Object.keys(bundle).filter(name=>!name.endsWith('.map')).map(name=>`/${name}`)];
 const version=`onda-shell-${Date.now()}`;
 this.emitFile({type:'asset',fileName:'manifest.webmanifest',source:JSON.stringify({id:'/',name:'Onda — Encontre sua frequência',short_name:'Onda',lang:'pt-BR',start_url:'/',scope:'/',display:'standalone',background_color:'#111313',theme_color:'#bbf557',description:'Descobertas musicais e biblioteca local.',icons:[{src:'/onda-icon.svg',sizes:'any',type:'image/svg+xml',purpose:'any'},{src:'/onda-icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'/onda-icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'}]})});
 this.emitFile({type:'asset',fileName:'onda-icon.svg',source:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#111313"/><path d="M96 200q80-112 160 0t160 0M96 312q80-112 160 0t160 0" stroke="#bbf557" stroke-width="48" fill="none" stroke-linecap="round"/></svg>`});
 this.emitFile({type:'asset',fileName:'sw.js',source:`const CACHE=${JSON.stringify(version)};const ASSETS=${JSON.stringify(assets)};self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('onda-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('/index.html')));return;}e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));});`});
 }};}
export default defineConfig({server:{host:'::',port:8080},plugins:[react(),ondaPwa()],resolve:{alias:{'@':path.resolve(__dirname,'./src')}}});
