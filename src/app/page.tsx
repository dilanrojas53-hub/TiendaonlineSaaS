import { products, wholesalers } from '@/data/demo-products';
import { crc, makeMessage } from '@/lib/format';

const features = [
  {
    title: 'Landing de marca',
    text: 'Hero, beneficios, promociones, confianza y secciones listas para convertir visitas en consultas.',
    tone: 'rose'
  },
  {
    title: 'Catálogo vendible',
    text: 'Productos con tallas, precios, estados de stock, promociones y consulta directa por WhatsApp.',
    tone: 'blue'
  },
  {
    title: 'Mayoristas con código',
    text: 'Perfiles B2B, precios especiales, descuentos por nivel e historial de pedidos.',
    tone: 'green'
  },
  {
    title: 'Análisis de ventas',
    text: 'Mide productos más vistos, más consultados, tallas buscadas e intención de compra.',
    tone: 'amber'
  }
];

const toneClasses: Record<string, string> = {
  rose: 'bg-rose-100 text-rose-700',
  blue: 'bg-sky-100 text-sky-700',
  green: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700'
};

export default function Home() {
  const topProduct = [...products].sort((a, b) => b.whatsappClicks - a.whatsappClicks)[0];
  const totalIntent = products.reduce((sum, p) => sum + p.cartAdds + p.whatsappClicks, 0);
  const totalViews = products.reduce((sum, p) => sum + p.views, 0);
  const whatsappTotal = products.reduce((sum, p) => sum + p.whatsappClicks, 0);
  const topProducts = [...products].sort((a, b) => b.whatsappClicks - a.whatsappClicks).slice(0, 4);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2ed] text-[#17120f]">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f2ed]/90 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 bg-white/80 px-4 py-3 shadow-sm md:px-8">
          <a href="#inicio" className="text-lg font-black tracking-tight md:text-xl">
            Tiendaonline<span className="text-rose-600">SaaS</span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-bold text-neutral-600 md:flex">
            <a className="transition hover:text-neutral-950" href="#funciones">Funciones</a>
            <a className="transition hover:text-neutral-950" href="#catalogo">Catálogo</a>
            <a className="transition hover:text-neutral-950" href="#dashboard">Analítica</a>
            <a className="transition hover:text-neutral-950" href="#mayoristas">Mayoristas</a>
          </div>
          <a className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-black/10" href="#catalogo">
            Ver demo
          </a>
        </div>
      </nav>

      <section id="inicio" className="relative px-5 py-12 md:py-20">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-rose-300/40 blur-3xl" />
        <div className="absolute right-12 top-64 hidden h-52 w-52 rounded-full bg-neutral-950/5 lg:block" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm">
              Para zapaterías, boutiques y vendedores mayoristas
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] md:text-7xl lg:text-[78px]">
              Una landing bonita que también funciona como catálogo de ventas.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700 md:text-xl">
              La página debe vender confianza primero, mostrar la marca, explicar beneficios y después llevar al cliente al catálogo, WhatsApp, promociones, mayoristas y analítica.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-rose-600 px-6 py-4 font-black text-white shadow-xl shadow-rose-600/20" href="#catalogo">
                Explorar catálogo
              </a>
              <a className="rounded-full border border-black/10 bg-white px-6 py-4 font-black shadow-sm" href="#dashboard">
                Ver análisis
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              <MiniStat value={String(totalViews)} label="Vistas demo" />
              <MiniStat value={String(whatsappTotal)} label="Clicks WhatsApp" />
              <MiniStat value={`${wholesalers.length}`} label="Mayoristas" />
            </div>
          </div>

          <PhoneMockup products={topProducts} />
        </div>
      </section>

      <section id="funciones" className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            kicker="POSICIONAMIENTO"
            title="No es una página simple. Es un sistema comercial."
            text="Se vende como una herramienta para ordenar inventario, recibir consultas con intención de compra y entender qué productos se mueven mejor."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
          </div>
        </div>
      </section>

      <section id="catalogo" className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              kicker="CATÁLOGO PÚBLICO"
              title="Productos listos para compartir y vender."
              text="Cada producto puede tener fotos, tallas, precio normal, precio mayorista, colores, stock y CTA directo a WhatsApp."
            />
            <div className="flex flex-wrap gap-2 text-sm font-black">
              {['Talla 36-40', 'Promociones', 'Mayorista', 'Stock'].map(item => (
                <span key={item} className="rounded-full bg-neutral-100 px-4 py-2 text-neutral-700">{item}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section id="dashboard" className="px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-neutral-950 p-8 text-white shadow-2xl md:p-10">
            <p className="font-black uppercase tracking-[0.3em] text-rose-300">Dashboard</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Análisis de ventas para tomar decisiones.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-300">
              La tienda puede ver qué producto genera interés, qué tallas preguntan más y qué mayoristas compran mejor. Esto sostiene el valor mensual del servicio.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <DarkMetric label="Intención total" value={String(totalIntent)} />
              <DarkMetric label="Producto caliente" value={topProduct.name} />
              <DarkMetric label="Clicks WhatsApp" value={String(whatsappTotal)} />
              <DarkMetric label="Vistas totales" value={String(totalViews)} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-xl shadow-black/5 md:p-8">
            <h3 className="mb-6 text-3xl font-black">Ranking de productos</h3>
            <div className="space-y-4">
              {topProducts.map(product => (
                <RankingRow key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mayoristas" className="bg-neutral-950 px-5 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="font-black uppercase tracking-[0.3em] text-rose-300">B2B / MAYORISTAS</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Perfiles y códigos para clientes mayoristas.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-300">
              El vendedor puede dar códigos a clientes mayoristas para manejar precios especiales, descuentos, historial y seguimiento de compra.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {wholesalers.map((client) => (
              <div key={client.id} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-rose-200">Código {client.code}</p>
                    <h3 className="mt-1 text-2xl font-black md:text-3xl">{client.businessName}</h3>
                    <p className="mt-1 text-neutral-400">{client.province} · {client.tier}</p>
                  </div>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-neutral-950">{client.discountRate}% desc.</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <DarkMetric label="Órdenes" value={String(client.totalOrders)} />
                  <DarkMetric label="Comprado" value={crc(client.totalSpent)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            kicker="IMPLEMENTACIÓN"
            title="Mapa de producto para construirlo como SaaS."
            text="La experiencia pública de venta y el panel privado del comerciante deben vivir conectados, pero separados visual y funcionalmente."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <FeatureCard title="Landing pública" text="Hero, beneficios, catálogo destacado, CTA a WhatsApp y confianza." tone="rose" />
            <FeatureCard title="Catálogo" text="Filtros por talla, marca, precio, stock y promociones." tone="blue" />
            <FeatureCard title="Dashboard" text="Vistas, consultas, productos calientes y tallas más buscadas." tone="amber" />
            <FeatureCard title="Mayoristas" text="Código B2B, precio especial, descuentos, historial y notas." tone="green" />
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="font-black uppercase tracking-[0.3em] text-rose-600">{kicker}</p>
      <h2 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">{text}</p>
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur">
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs font-bold text-neutral-500">{label}</p>
    </div>
  );
}

function PhoneMockup({ products: previewProducts }: { products: typeof products }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-[2.4rem] border border-black/10 bg-neutral-950 p-4 shadow-2xl shadow-black/20">
      <div className="rounded-[1.8rem] bg-[#111827] p-5 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-200">Karen Fashion Store</p>
            <h2 className="mt-1 text-2xl font-black">Drop semanal</h2>
          </div>
          <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-emerald-950">Online</span>
        </div>
        <div className="mt-5 space-y-4">
          {previewProducts.map((product, index) => (
            <div key={product.id} className="flex gap-4 rounded-3xl bg-white/10 p-4">
              <ProductVisual index={index} compact />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-black">{product.name}</h3>
                <p className="mt-1 text-sm text-neutral-400">{product.sizes.slice(0, 5).join(', ')}</p>
                <p className="mt-1 text-sm font-bold text-rose-100">{crc(product.price)}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-600 text-xl font-black">+</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, text, tone }: { title: string; text: string; tone: string }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${toneClasses[tone] ?? toneClasses.rose}`}>
        <span className="text-xl font-black">+</span>
      </div>
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p>
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[number] }) {
  const index = products.findIndex((item) => item.id === product.id);

  return (
    <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
      <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-stone-100 via-rose-50 to-neutral-200 text-sm font-black text-neutral-400">
        <ProductVisual index={index} />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-rose-700 shadow-sm">{product.tags[0]}</span>
        {product.stockStatus === 'low' && <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700 shadow-sm">Pocas</span>}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-sm font-bold text-neutral-500">{product.brand}</p>
          <h3 className="text-xl font-black">{product.name}</h3>
          <p className="mt-1 min-h-[40px] text-sm leading-5 text-neutral-600">{product.description}</p>
        </div>
        <div>
          <span className="text-2xl font-black">{crc(product.price)}</span>{' '}
          <span className="text-sm text-neutral-400 line-through">{product.compareAtPrice ? crc(product.compareAtPrice) : ''}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {product.sizes.slice(0, 6).map(size => (
            <span key={size} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-black">{size}</span>
          ))}
          {product.sizes.length > 6 && <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-black">+{product.sizes.length - 6}</span>}
        </div>
        <a className="block rounded-2xl bg-neutral-950 px-4 py-3 text-center font-black text-white transition hover:bg-rose-600" href={`https://wa.me/50672578184?text=${makeMessage(product.name)}`}>
          Consultar por WhatsApp
        </a>
      </div>
    </article>
  );
}

function ProductVisual({ index, compact = false }: { index: number; compact?: boolean }) {
  const palette = [
    'from-slate-200 via-zinc-50 to-slate-400',
    'from-stone-200 via-amber-50 to-neutral-400',
    'from-white via-slate-100 to-slate-300',
    'from-pink-100 via-rose-50 to-stone-300',
    'from-rose-100 via-white to-pink-300',
    'from-neutral-900 via-neutral-700 to-stone-400',
    'from-white via-stone-100 to-neutral-800',
    'from-neutral-950 via-zinc-700 to-neutral-400'
  ];
  const size = compact ? 'h-16 w-16 rounded-2xl' : 'h-36 w-48 rounded-[2rem]';
  const shoeSize = compact ? 'h-7 w-12' : 'h-16 w-32';

  return (
    <div className={`relative flex ${size} items-center justify-center bg-gradient-to-br ${palette[index % palette.length]} shadow-inner`}>
      <div className={`${shoeSize} -rotate-12 rounded-[50%] bg-white/90 shadow-xl`} />
      <div className={`absolute ${compact ? 'bottom-5 h-2 w-12' : 'bottom-16 h-4 w-32'} -rotate-12 rounded-full bg-neutral-950/70`} />
      <div className={`absolute ${compact ? 'h-3 w-3' : 'h-6 w-6'} rounded-full bg-rose-500/70`} />
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="mt-1 text-xl font-black text-white">{value}</p>
    </div>
  );
}

function RankingRow({ product }: { product: typeof products[number] }) {
  const conversion = Math.round((product.whatsappClicks / product.views) * 100);
  const width = Math.min(100, Math.max(12, conversion * 3));

  return (
    <div className="rounded-3xl bg-neutral-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-black">{product.name}</p>
          <p className="text-sm text-neutral-500">{product.views} vistas · {product.whatsappClicks} consultas · {product.cartAdds} agregados</p>
        </div>
        <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-black text-rose-700">{conversion}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full rounded-full bg-rose-600" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
