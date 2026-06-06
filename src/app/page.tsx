import { products, wholesalers } from '@/data/demo-products';
import { crc, makeMessage } from '@/lib/format';

export default function Home() {
  const topProduct = [...products].sort((a,b) => b.whatsappClicks - a.whatsappClicks)[0];
  const totalIntent = products.reduce((sum, p) => sum + p.cartAdds + p.whatsappClicks, 0);

  return (
    <main className="min-h-screen bg-[#080b10] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#9f1239_0%,transparent_40%),linear-gradient(180deg,#111827,#080b10)] opacity-90" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.35em] text-rose-200">Karen Fashion Store</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Catalogo que vende, mide y ordena.</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200">Productos, tallas, precios, promociones, carrito por WhatsApp, clientes mayoristas y analitica para saber que genera mas consultas.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="rounded-full bg-rose-500 px-5 py-3 font-bold text-white shadow-lg shadow-rose-500/30" href="#catalogo">Ver catalogo demo</a>
            <a className="rounded-full border border-white/20 px-5 py-3 font-bold text-white" href="#dashboard">Ver metricas</a>
          </div>
        </div>
      </section>

      <section id="dashboard" className="mx-auto grid max-w-6xl gap-4 px-5 py-6 md:grid-cols-4">
        <Metric label="Intencion de compra" value={String(totalIntent)} />
        <Metric label="Producto caliente" value={topProduct.name} />
        <Metric label="Mayoristas" value={`${wholesalers.length} activos`} />
        <Metric label="Tallas clave" value="36, 37, 38, 39" />
      </section>

      <section id="catalogo" className="mx-auto max-w-6xl px-5 pb-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">Catalogo publico</h2>
            <p className="text-slate-400">Vista optimizada para compartir como link en WhatsApp, Instagram y Facebook.</p>
          </div>
          <div className="hidden rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300 md:block">Filtros: talla, marca, precio y promo</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-slate-500">Foto del producto</div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black">{product.name}</h3>
                    <p className="text-sm text-slate-400">{product.description}</p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300">{product.stockStatus === 'low' ? 'Pocas' : 'Disponible'}</span>
                </div>
                <div><span className="text-xl font-black">{crc(product.price)}</span> <span className="text-sm text-slate-500 line-through">{product.compareAtPrice ? crc(product.compareAtPrice) : ''}</span></div>
                <div className="flex flex-wrap gap-1">{product.sizes.map(size => <span key={size} className="rounded-full bg-white/10 px-2 py-1 text-xs">{size}</span>)}</div>
                <a className="block rounded-2xl bg-white px-4 py-3 text-center font-black text-slate-950" href={`https://wa.me/50672578184?text=${makeMessage(product.name)}`}>Consultar por WhatsApp</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-slate-400">{label}</p><p className="mt-1 text-xl font-black">{value}</p></div>;
}
