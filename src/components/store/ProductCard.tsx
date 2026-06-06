import { Product } from '@/types/catalog';
import { crc, makeMessage } from '@/lib/format';
import { ProductVisual } from './ProductVisual';

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#151515] shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-[#d4af37]/40">
      <div className="relative flex h-56 items-center justify-center bg-[#211b10]">
        <ProductVisual index={index} />
        <span className="absolute left-4 top-4 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1 text-xs font-black text-[#f3e7bf]">{product.tags[0]}</span>
        {product.stockStatus === 'low' && <span className="absolute right-4 top-4 rounded-full bg-[#f3e7bf] px-3 py-1 text-xs font-black text-black">Stock bajo</span>}
      </div>
      <div className="space-y-4 p-5 text-white">
        <div>
          <p className="text-sm font-bold text-[#c7bfa9]">{product.brand}</p>
          <h3 className="text-xl font-black">{product.name}</h3>
          <p className="mt-1 min-h-[40px] text-sm leading-5 text-[#d7cfbd]">{product.description}</p>
        </div>
        <div>
          <span className="text-2xl font-black text-[#f3e7bf]">{crc(product.price)}</span>{' '}
          <span className="text-sm text-neutral-500 line-through">{product.compareAtPrice ? crc(product.compareAtPrice) : ''}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {product.sizes.slice(0, 6).map(size => <span key={size} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black">{size}</span>)}
          {product.sizes.length > 6 && <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black">+{product.sizes.length - 6}</span>}
        </div>
        <a className="block rounded-2xl bg-[#d4af37] px-4 py-3 text-center font-black text-black transition hover:bg-[#e7c55b]" href={`https://wa.me/50672578184?text=${makeMessage(product.name)}`}>Consultar por WhatsApp</a>
      </div>
    </article>
  );
}
