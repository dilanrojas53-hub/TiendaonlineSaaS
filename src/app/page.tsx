import Link from 'next/link';
import { products, wholesalers } from '@/data/demo-products';
import { crc } from '@/lib/format';
import { ProductCard } from '@/components/store/ProductCard';

const topProducts = [...products].sort((a, b) => b.whatsappClicks - a.whatsappClicks).slice(0, 4);
const totalViews = products.reduce((sum, p) => sum + p.views, 0);
const totalClicks = products.reduce((sum, p) => sum + p.whatsappClicks, 0);
const totalIntent = products.reduce((sum, p) => sum + p.whatsappClicks + p.cartAdds, 0);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <nav className="sticky top-0 z-50 border-b border-[#d4af37]/20 bg-black/85 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#d4af37]/20 bg-white/5 px-5 py-3">
          <Link href="/" className="text-xl font-black">Tiendaonline<span className="text-[#d4af37]">SaaS</span></Link>
          <div className="hidden gap-7 text-sm font-bold text-[#e7dcc0] md:flex">
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/admin">Panel admin</Link>
            <a href="#mayoristas">Mayoristas</a>
          </div>
          <Link href="/admin" className="rounded-full bg-[#d4af37] px-5 py-3 text-sm font-black text-black">Entrar admin</Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-5 py-16 md:py-24">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d4af37]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-2 text-sm font-bold text-[#f3e7bf]">Tienda elegante por fuera, control total por dentro</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[.94] tracking-[-.055em] md:text-7xl lg:text-[82px]">Una tienda online con alma de marca y panel de negocio real.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d7cfbd] md:text-xl">Una vitrina premium en negro y dorado para vender productos, recibir consultas y controlar el negocio desde un panel administrador con analítica e inventario.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalogo" className="rounded-full bg-[#d4af37] px-6 py-4 font-black text-black shadow-xl shadow-[#d4af37]/20">Ver colección</Link>
              <Link href="/admin" className="rounded-full border border-white/15 bg-white/5 px-6 py-4 font-black text-white">Ver panel admin</Link>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
              <Stat value={String(totalViews)} label="Vistas" />
              <Stat value={String(totalClicks)} label="Consultas" />
              <Stat value={String(products.length)} label="Productos" />
              <Stat value={String(wholesalers.length)} label="Mayoristas" />
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#151515] to-black p-4 shadow-2xl shadow-black/30">
            <div className="rounded-[1.9rem] border border-white/10 bg-[#111] p-5">
              <div className="border-b border-white/10 pb-5">
                <p className="text-xs uppercase tracking-[.35em] text-[#f3e7bf]">Karen Fashion Store</p>
                <h2 className="mt-1 text-3xl font-black">Nueva colección</h2>
                <p className="mt-1 text-sm text-[#c7bfa9]">Sneakers, moda y promociones del mes</p>
              </div>
              <div className="mt-5 rounded-[1.8rem] bg-gradient-to-r from-[#0f0f0f] via-[#1a1710] to-[#0f0f0f] p-5">
                <p className="text-sm font-black uppercase tracking-[.25em] text-[#d4af37]">Hero principal</p>
                <h3 className="mt-2 text-3xl font-black">Tu estilo se ve mejor aquí</h3>
                <p className="mt-3 text-sm leading-6 text-[#d7cfbd]">Portada emocional de tienda, no plantilla robótica.</p>
              </div>
              <div className="mt-5 space-y-4">
                {topProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-3xl bg-white/5 p-4">
                    <div>
                      <h3 className="font-black">{p.name}</h3>
                      <p className="text-sm text-[#c7bfa9]">{p.brand} · {p.sizes.slice(0, 4).join(', ')}</p>
                    </div>
                    <p className="font-black text-[#f3e7bf]">{crc(p.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
          <p className="font-black uppercase tracking-[.3em] text-[#d4af37]">La idea</p>
          <h2 className="mt-2 max-w-3xl text-4xl font-black md:text-5xl">Una tienda más humana y más útil.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#d7cfbd]">El frente enamora al cliente. El detrás ayuda al dueño a tomar decisiones. Esa mezcla vuelve el sistema vendible.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <Feature title="Imagen premium" text="Hero visual, estilo de marca, colecciones destacadas y una presencia elegante." />
            <Feature title="Catálogo vivo" text="Productos con precios, tallas, estado, promociones y WhatsApp." />
            <Feature title="Panel admin" text="Analítica, productos más consultados, stock bajo y acciones rápidas." />
            <Feature title="Mayoristas" text="Códigos, descuentos y perfiles B2B para clientes frecuentes." />
          </div>
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-[#d4af37]/15 bg-[#111] p-8 md:p-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-black uppercase tracking-[.3em] text-[#d4af37]">Catálogo</p>
              <h2 className="mt-2 text-4xl font-black md:text-5xl">Una vitrina que sí se siente como tienda.</h2>
            </div>
            <Link href="/catalogo" className="hidden rounded-full bg-[#d4af37] px-5 py-3 font-black text-black md:block">Ver todo</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        </div>
      </section>

      <section id="mayoristas" className="px-5 py-12 pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#d4af37]/20 bg-[#d4af37]/10 p-8 md:p-10">
          <p className="font-black uppercase tracking-[.3em] text-[#d4af37]">Mayoristas</p>
          <h2 className="mt-2 max-w-3xl text-4xl font-black md:text-5xl">Venta al detalle y al por mayor en una misma tienda.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {wholesalers.map((client) => <div key={client.id} className="rounded-[2rem] border border-white/10 bg-black/35 p-6"><p className="text-sm font-bold text-[#f3e7bf]">Código {client.code}</p><h3 className="mt-1 text-2xl font-black">{client.businessName}</h3><p className="mt-2 text-[#c7bfa9]">{client.province} · {client.discountRate}% descuento · {crc(client.totalSpent)} comprado</p></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-3xl border border-[#d4af37]/15 bg-white/5 p-4"><p className="text-2xl font-black">{value}</p><p className="text-xs font-bold text-[#d7cfbd]">{label}</p></div>;
}

function Feature({ title, text }: { title: string; text: string }) {
  return <div className="rounded-[2rem] border border-white/10 bg-black/35 p-6"><div className="mb-5 h-14 w-14 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/15" /><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-[#d7cfbd]">{text}</p></div>;
}
