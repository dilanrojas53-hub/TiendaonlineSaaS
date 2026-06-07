import Link from 'next/link';
import { products } from '@/data/demo-products';
import { ProductCard } from '@/components/store/ProductCard';

const STORE_NAME = 'Karen Fashion Store';

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-10 flex items-center justify-between rounded-full border border-[#d4af37]/20 bg-white/5 px-5 py-3">
          <Link href="/" className="leading-tight">
            <span className="block text-xl font-black">{STORE_NAME}</span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">Powered by TiendaonlineSaaS</span>
          </Link>
          <Link href="/" className="rounded-full bg-[#d4af37] px-5 py-3 text-sm font-black text-black">Inicio</Link>
        </nav>

        <section className="mb-10 rounded-[2rem] border border-[#d4af37]/20 bg-[#111] p-8">
          <p className="font-black uppercase tracking-[.3em] text-[#d4af37]">{STORE_NAME}</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight md:text-7xl">Colección disponible para vender hoy.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d7cfbd]">Catálogo público para clientes. Aquí se ordenan productos, tallas, precios, promociones y consultas directas por WhatsApp.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm font-black text-[#f3e7bf]">
            {['Todos', 'Nuevos', 'Promos', 'Stock bajo', 'Mayorista'].map((tag) => <span key={tag} className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-4 py-2">{tag}</span>)}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </section>

        <footer className="mt-12 border-t border-white/10 py-8 text-center text-sm text-[#c7bfa9]">
          <p className="font-bold text-white">{STORE_NAME}</p>
          <p className="mt-1">Catálogo digital impulsado por <span className="text-[#d4af37]">TiendaonlineSaaS</span></p>
        </footer>
      </div>
    </main>
  );
}
