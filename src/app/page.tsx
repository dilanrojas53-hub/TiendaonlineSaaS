import { products, wholesalers } from '@/data/demo-products';
import { crc, makeMessage } from '@/lib/format';

const features = [
  { title: 'Landing de marca', text: 'Hero, beneficios, promociones, confianza y secciones listas para convertir visitas en consultas.' },
  { title: 'Catalogo vendible', text: 'Productos con tallas, precios, estados de stock, promociones y consulta directa por WhatsApp.' },
  { title: 'Mayoristas con codigo', text: 'Base para perfiles B2B, precios especiales, descuentos por nivel e historial de pedidos.' },
  { title: 'Analisis de ventas', text: 'Mide productos mas vistos, mas consultados, tallas buscadas e intencion de compra.' }
];

export default function Home() {
  const topProduct = [...products].sort((a,b) => b.whatsappClicks - a.whatsappClicks)[0];
  const totalIntent = products.reduce((sum, p) => sum + p.cartAdds + p.whatsappClicks, 0);
  const totalViews = products.reduce((sum, p) => sum + p.views, 0);
  const whatsappTotal = products.reduce((sum, p) => sum + p.whatsappClicks, 0);

  return (
    <main className="min-h-screen bg-[#f7f2ed] text-[#17120f]">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f2ed]/90 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#inicio" className="text-lg font-black tracking-tight">Tiendaonline<span className="text-rose-600">SaaS</span></a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-neutral-600 md:flex">
            <a href="#funciones">Funciones</a>
            <a href="#catalogo">Catalogo</a>
            <a href="#dashboard">Analitica</a>
            <a href="#mayoristas">Mayoristas</a>
          </div>
          <a className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-black text-white" href="#catalogo">Ver demo</a>
        </div>
      </nav>

      <section id="inicio" className="relative overflow-hidden px-5 py-12 md:py-20">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-300/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm">Para zapaterias, boutiques y vendedores mayoristas</div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.05em] md:text-7xl">Una landing bonita que tambien funciona como catalogo de ventas.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">La pagina no debe parecer solamente una tabla de productos. Debe vender confianza primero, mostrar la marca, explicar beneficios y despues llevar al cliente al catalogo, WhatsApp, promociones, mayoristas y analitica.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-rose-600 px-6 py-4 font-black text-white shadow-xl shadow-rose-600/20" href="#catalogo">Explorar catalogo</a>
              <a className="rounded-full border border-black/10 bg-white px-6 py-4 font-black" href="#dashboard">Ver analisis</a>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              <MiniStat value={String(totalViews)} label="Vistas demo" />
              <MiniStat value={String(whatsappTotal)} label="Clicks WhatsApp" />
              <MiniStat value={`${wholesalers.length}`} label="Mayoristas" />
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-black/10 bg-neutral-950 p-4 shadow-2xl">
            <div className="rounded-[1.7rem] bg-[#111827] p-4 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-rose-200">Karen Fashion Store</p>
                  <h2 className="text-2xl font-black">Drop semanal</h2>
                </div>
                <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-emerald-950">Online</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="rounded-3xl bg-white/10 p-3">
                    <div className="mb-3 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-200 to-stone-200 text-xs font-bold text-neutral-600">Producto</div>
                    <h3 className="truncate text-sm font-black">{product.name}</h3>
                    <p className="text-sm text-rose-100">{crc(product.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="funciones" className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="font-black uppercase tracking-[0.3em] text-rose-600">Que se vende realmente</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">No es una pagina simple. Es un sistema comercial.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
          </div>
        </div>
      </section>

      <section id="catalogo" className="bg-white px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-black uppercase tracking-[0.3em] text-rose-600">Catalogo publico</p>
              <h2 className="mt-2 text-4xl font-black tracking-tight">Productos listos para compartir y vender.</h2>
              <p className="mt-2 max-w-2xl text-neutral-600">Cada producto puede tener fotos, tallas, precio normal, precio mayorista, colores, stock y CTA directo a WhatsApp.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-bold">
              {['Talla 36-40', 'Promociones', 'Mayorista', 'Stock'].map(item => <span key={item} className="rounded-full bg-neutral-100 px-4 py-2">{item}</span>)}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section id="dashboard" className="px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-neutral-950 p-8 text-white shadow-2xl">
            <p className="font-black uppercase tracking-[0.3em] text-rose-300">Dashboard</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">Analisis de ventas para tomar decisiones.</h2>
            <p className="mt-4 text-neutral-300">La tienda debe poder ver que producto genera interes, que tallas preguntan mas y que mayoristas compran mejor. Esto es lo que vuelve vendible el servicio mensual.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Metric label="Intencion de compra" value={String(totalIntent)} />
              <Metric label="Producto caliente" value={topProduct.name} />
              <Metric label="Clicks WhatsApp" value={String(whatsappTotal)} />
              <Metric label="Vistas totales" value={String(totalViews)} />
            </div>
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-xl">
            <h3 className="mb-5 text-2xl font-black">Ranking de productos</h3>
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="rounded-3xl bg-neutral-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black">{product.name}</p>
                      <p className="text-sm text-neutral-500">{product.views} vistas · {product.whatsappClicks} consultas · {product.cartAdds} agregados</p>
                    </div>
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-black text-rose-700">{Math.round((product.whatsappClicks / product.views) * 100)}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200">
                    <div className="h-full rounded-full bg-rose-600" style={{ width: `${Math.min(100, product.whatsappClicks)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mayoristas" className="bg-neutral-950 px-5 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="font-black uppercase tracking-[0.3em] text-rose-300">B2B</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">Perfiles y codigos para mayoristas.</h2>
            <p className="mt-2 text-neutral-300">El vendedor puede dar codigos a clientes mayoristas para manejar precios especiales, descuentos y seguimiento de compra.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {wholesalers.map((client) => (
              <div key={client.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-rose-200">Codigo {client.code}</p>
                    <h3 className="text-2xl font-black">{client.businessName}</h3>
                    <p className="text-neutral-400">{client.province} · {client.tier}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-neutral-950">{client.discountRate}% desc.</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Metric label="Ordenes" value={String(client.totalOrders)} />
                  <Metric label="Comprado" value={crc(client.totalSpent)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-3xl border border-black/10 bg-white/80 p-4 shadow-sm"><p className="text-2xl font-black">{value}</p><p className="text-xs font-bold text-neutral-500">{label}</p></div>;
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm"><div className="mb-5 h-12 w-12 rounded-2xl bg-rose-100" /><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p></div>;
}

function ProductCard({ product }: { product: typeof products[number] }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl shadow-black/5">
      <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-stone-100 via-rose-50 to-neutral-200 text-sm font-black text-neutral-400">
        Foto del producto
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-rose-700 shadow-sm">{product.tags[0]}</span>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm font-bold text-neutral-500">{product.brand}</p>
          <h3 className="text-xl font-black">{product.name}</h3>
          <p className="mt-1 text-sm text-neutral-600">{product.description}</p>
        </div>
        <div><span className="text-2xl font-black">{crc(product.price)}</span> <span className="text-sm text-neutral-400 line-through">{product.compareAtPrice ? crc(product.compareAtPrice) : ''}</span></div>
        <div className="flex flex-wrap gap-1">{product.sizes.map(size => <span key={size} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-black">{size}</span>)}</div>
        <a className="block rounded-2xl bg-neutral-950 px-4 py-3 text-center font-black text-white" href={`https://wa.me/50672578184?text=${makeMessage(product.name)}`}>Consultar por WhatsApp</a>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><p className="text-sm text-neutral-400">{label}</p><p className="mt-1 text-xl font-black text-white">{value}</p></div>;
}
