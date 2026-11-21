import { Link } from 'react-router-dom';
import { Waves } from 'lucide-react';
export default function NotFound(){return <main className="page-shell flex min-h-[60vh] flex-col items-center justify-center text-center"><Waves size={48} className="mb-6 text-primary"/><p className="eyebrow">404 · Fora de sintonia</p><h1 className="my-4 text-3xl font-bold">Esta frequência não existe</h1><Link to="/" className="primary-button mt-4">Voltar para descobrir</Link></main>;}
