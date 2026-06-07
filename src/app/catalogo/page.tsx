import Link from 'next/link';
import { products } from '@/data/demo-products';
import { ProductCard } from '@/components/store/ProductCard';

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-10 flex items-center justify-between rounded-full border border-[#d4af37]/20 bg-white/5 px-5 py-3">
          <Link href="/" className="text-xl font-black">Tiendaonline<span className="text-[#d4af37]">SaaS</span></Link>
          <Link href="/" className="rounded-full bg-[#d4af37] px-5 py-3 text-sm font-black text-black">Inicio</Link>
        </nav>

        <section className="mb-10 rounded-[2rem] border border-[#d4af37]/20 bg-[#111] p-8">
          <p className="font-black uppercase tracking-[.3em] text-[#d4af37]">Catálogo completo</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight md:text-7xl">Colección disponible para vender hoy.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d7cfbd]">Vista pública para clientes. Aquí se ordenan productos, tallas, precios, promociones y consultas directas por WhatsApp.</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm font-black text-[#f3e7bf]">
            {['Todos', 'Nuevos', 'Promos', 'Stock bajo', 'Mayorista'].map((tag) => <span key={tag} className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-4 py-2">{tag}</span>)}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </section>
      </div>
    </main>
  );
}
