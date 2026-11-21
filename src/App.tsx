import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MobileNav from '@/components/layout/MobileNav';
import Player from '@/components/features/Player';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import NotFound from '@/pages/NotFound';
const Index=lazy(()=>import('@/pages/Index'));
const Search=lazy(()=>import('@/pages/Search'));
const Library=lazy(()=>import('@/pages/Library'));
const client=new QueryClient({defaultOptions:{queries:{retry:1,refetchOnWindowFocus:false}}});
export default function App(){return <QueryClientProvider client={client}><TooltipProvider><BrowserRouter><Toaster theme="dark" position="top-right" richColors/><Sidebar/><div className="min-h-screen pb-[172px] md:ml-[224px] md:pb-[108px]"><Header/><ErrorBoundary><Suspense fallback={<div className="page-shell text-muted-foreground" role="status">Sintonizando…</div>}><Routes><Route path="/" element={<Index/>}/><Route path="/search" element={<Search/>}/><Route path="/library" element={<Library/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense></ErrorBoundary></div><ErrorBoundary><Player/></ErrorBoundary><MobileNav/></BrowserRouter></TooltipProvider></QueryClientProvider>;}
