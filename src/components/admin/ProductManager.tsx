'use client';

import { useMemo, useState } from 'react';
import { products as seedProducts } from '@/data/demo-products';
import { crc } from '@/lib/format';
import { ProductVisual } from '@/components/store/ProductVisual';

type AdminProduct = typeof seedProducts[number] & { isHidden?: boolean };

export function ProductManager() {
  const [products, setProducts] = useState<AdminProduct[]>(seedProducts);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [message, setMessage] = useState('');

  const visibleProducts = useMemo(() => products.filter((product) => !product.isHidden), [products]);

  function addProduct() {
    const parsedPrice = Number(price);

    if (!name.trim() || !brand.trim() || !Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setMessage('Completá nombre, marca y precio válido.');
      return;
    }

    const newProduct: AdminProduct = {
      id: `product-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim(),
      description: 'Producto agregado desde el panel demo.',
      price: parsedPrice,
      compareAtPrice: Math.round(parsedPrice * 1.15),
      wholesalePrice: Math.round(parsedPrice * 0.85),
      sizes: ['36', '37', '38', '39'],
      colors: ['Negro'],
      tags: ['nuevo'],
      stockStatus: 'available',
      views: 0,
      whatsappClicks: 0,
      cartAdds: 0
    };

    setProducts((current) => [newProduct, ...current]);
    setName('');
    setBrand('');
    setPrice('');
    setMessage('Producto agregado en esta sesión demo.');
  }

  function hideProduct(id: string) {
    setProducts((current) => current.map((product) => product.id === id ? { ...product, isHidden: true } : product));
    setMessage('Producto ocultado del catálogo demo.');
  }

  function showProduct(id: string) {
    setProducts((current) => current.map((product) => product.id === id ? { ...product, isHidden: false } : product));
    setMessage('Producto activado nuevamente.');
  }

  function removeProduct(id: string) {
    setProducts((current) => current.filter((product) => product.id !== id));
    setMessage('Producto eliminado de esta sesión demo.');
  }

  function discountProduct(id: string) {
    setProducts((current) => current.map((product) => product.id === id ? { ...product, compareAtPrice: product.price, price: Math.max(1000, Math.round(product.price * 0.9)) } : product));
    setMessage('Descuento aplicado al producto.');
  }

  return (
    <div className="rounded-[2rem] bg-[#f7f0df] p-6 text-black">
      <div className="mb-6 border-b border-black/10 pb-5">
        <p className="text-sm font-black uppercase tracking-[.25em] text-[#8d6a10]">Gestión funcional</p>
        <h2 className="text-3xl font-black">Inventario y acciones</h2>
        <p className="mt-2 text-sm text-neutral-600">Demo funcional en memoria. Agregar, ocultar, descontar y quitar ya actualizan la interfaz.</p>
      </div>

      <div className="mb-6 grid gap-3 rounded-[1.5rem] bg-white p-4 md:grid-cols-[1fr_1fr_120px_auto]">
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Producto" className="rounded-2xl border border-black/10 px-4 py-3 outline-none" />
        <input value={brand} onChange={(event) => setBrand(event.target.value)} placeholder="Marca" className="rounded-2xl border border-black/10 px-4 py-3 outline-none" />
        <input value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Precio" className="rounded-2xl border border-black/10 px-4 py-3 outline-none" />
        <button onClick={addProduct} className="rounded-2xl bg-black px-4 py-3 text-sm font-black text-white">Agregar</button>
      </div>

      {message && <div className="mb-4 rounded-2xl bg-black px-4 py-3 text-sm font-bold text-white">{message}</div>}

      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4"><p className="text-sm text-neutral-500">Productos activos</p><p className="text-2xl font-black">{visibleProducts.length}</p></div>
        <div className="rounded-2xl bg-white p-4"><p className="text-sm text-neutral-500">Ocultos</p><p className="text-2xl font-black">{products.length - visibleProducts.length}</p></div>
        <div className="rounded-2xl bg-white p-4"><p className="text-sm text-neutral-500">Total demo</p><p className="text-2xl font-black">{products.length}</p></div>
      </div>

      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={product.id} className={`rounded-[1.5rem] border border-black/10 bg-white p-4 shadow-sm ${product.isHidden ? 'opacity-55' : ''}`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <ProductVisual index={index} compact />
                <div>
                  <p className="font-black">{product.name}</p>
                  <p className="text-sm text-neutral-500">{product.brand} · {product.sizes.join(', ')}</p>
                  <p className="text-sm font-bold text-[#8d6a10]">{crc(product.price)}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-sm font-black">
                <span className={`rounded-full px-3 py-2 ${product.isHidden ? 'bg-neutral-100 text-neutral-600' : product.stockStatus === 'low' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {product.isHidden ? 'Oculto' : product.stockStatus === 'low' ? 'Stock bajo' : 'Activo'}
                </span>
                <button onClick={() => discountProduct(product.id)} className="rounded-full bg-[#d4af37] px-3 py-2 text-black">Descuento</button>
                {product.isHidden ? <button onClick={() => showProduct(product.id)} className="rounded-full bg-black px-3 py-2 text-white">Activar</button> : <button onClick={() => hideProduct(product.id)} className="rounded-full border border-black/10 px-3 py-2">Ocultar</button>}
                <button onClick={() => removeProduct(product.id)} className="rounded-full bg-red-50 px-3 py-2 text-red-600">Quitar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
