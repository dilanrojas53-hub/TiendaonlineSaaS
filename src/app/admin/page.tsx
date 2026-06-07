import Link from 'next/link';
import { products, wholesalers } from '@/data/demo-products';
import { crc } from '@/lib/format';
import { ProductManager } from '@/components/admin/ProductManager';

const totalViews = products.reduce((sum, p) => sum + p.views, 0);
const totalClicks = products.reduce((sum, p) => sum + p.whatsappClicks, 0);
const totalIntent = products.reduce((sum, p) => sum + p.whatsappClicks + p.cartAdds, 0);
const lowStock = products.filter((p) => p.stockStatus === 'low').length;
const topProducts = [...products].sort((a, b) => b.whatsappClicks - a.whatsappClicks).slice(0, 5);

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex items-center justify-between rounded-full border border-[#d4af37]/20 bg-white/5 px-5 py-3">
          <Link href="/" className="text-xl font-black">Tiendaonline<span className="text-[#d4af37]">SaaS</span></Link>
          <div className="flex gap-2">
            <Link href="/catalogo" className="rounded-full border border-white/10 px-4 py-2 text-sm font-black">Ver tienda</Link>
          </div>
        </nav>

        <section className="mb-6 rounded-[2rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#111] to-[#17130a] p-8">
          <p className="font-black uppercase tracking-[.3em] text-[#d4af37]">Panel administrador</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">Analítica, inventario y control del negocio.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d7cfbd]">Este es el espacio privado del administrador. Desde aquí puede revisar métricas, detectar productos calientes y gestionar el catálogo.</p>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <Metric label="Intención total" value={String(totalIntent)} />
          <Metric label="Vistas" value={String(totalViews)} />
          <Metric label="Consultas WhatsApp" value={String(totalClicks)} />
          <Metric label="Stock bajo" value={String(lowStock)} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black">Productos con más tracción</h2>
                <p className="text-sm text-[#c7bfa9]">Consultas y conversión estimada</p>
              </div>
              <span className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-3 py-1 text-xs font-black text-[#f3e7bf]">30 días</span>
            </div>
            <div className="space-y-5">
              {topProducts.map((product) => <AnalyticsRow key={product.id} product={product} />)}
            </div>
          </div>

          <ProductManager />
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {wholesalers.map((client) => <div key={client.id} className="rounded-[2rem] border border-[#d4af37]/20 bg-white/5 p-6"><p className="text-sm font-bold text-[#f3e7bf]">Código {client.code}</p><h3 className="mt-1 text-2xl font-black">{client.businessName}</h3><p className="mt-2 text-[#c7bfa9]">{client.province} · {client.discountRate}% descuento · {client.totalOrders} órdenes · {crc(client.totalSpent)}</p></div>)}
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl border border-[#d4af37]/15 bg-white/5 p-5"><p className="text-sm text-[#c7bfa9]">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></div>;
}

function AnalyticsRow({ product }: { product: typeof products[number] }) {
  const conversion = Math.round((product.whatsappClicks / product.views) * 100);
  const width = Math.min(100, Math.max(12, conversion * 3));
  return <div><div className="mb-2 flex justify-between gap-3"><div><p className="font-black">{product.name}</p><p className="text-xs text-[#c7bfa9]">{product.views} vistas · {product.whatsappClicks} consultas · {product.cartAdds} agregados</p></div><span className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-3 py-1 text-xs font-black text-[#f3e7bf]">{conversion}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#d4af37]" style={{ width: `${width}%` }} /></div></div>;
}
