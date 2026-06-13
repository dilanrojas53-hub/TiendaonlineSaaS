import { NextResponse } from 'next/server';
import type { Coupon, Product, StoreSettings } from './types';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const ok = <T>(data: T, init?: ResponseInit) => NextResponse.json(data, init);

export function fail(error: unknown) {
  if (error instanceof ApiError) return NextResponse.json({ error: error.message }, { status: error.status });
  console.error(error);
  return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
}

export const currentPrice = (product: Product) => Math.max(0, Math.round(product.basePrice * (1 - product.discountPercent / 100)));

export function normalizeProduct(input: Partial<Product>, existing?: Product): Product {
  const now = new Date().toISOString();
  const name = String(input.name ?? existing?.name ?? '').trim();
  if (!name) throw new ApiError(400, 'El nombre es obligatorio');
  const colors = Array.isArray(input.colors) ? input.colors.filter((c) => c && c.name && c.hex).map((c) => ({ name: String(c.name), hex: String(c.hex) })) : existing?.colors || [];
  const sizes = Array.isArray(input.sizes) ? input.sizes.map(String).map((v) => v.trim()).filter(Boolean) : existing?.sizes || [];
  const images = Array.isArray(input.images) ? input.images.map(String).map((v) => v.trim()).filter(Boolean) : existing?.images || [];
  return {
    id: existing?.id || String(input.id || `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
    name,
    brand: String(input.brand ?? existing?.brand ?? 'LÚA').trim(),
    category: String(input.category ?? existing?.category ?? 'Otros').trim(),
    basePrice: Math.max(0, Number(input.basePrice ?? existing?.basePrice ?? 0)),
    discountPercent: Math.min(100, Math.max(0, Number(input.discountPercent ?? existing?.discountPercent ?? 0))),
    sizes: sizes.length ? sizes : ['Única'],
    colors: colors.length ? colors : [{ name: 'negro', hex: '#1C1C1E' }],
    stock: Math.max(0, Math.floor(Number(input.stock ?? existing?.stock ?? 0))),
    description: String(input.description ?? existing?.description ?? '').trim(),
    isNew: Boolean(input.isNew ?? existing?.isNew ?? false),
    sold: Math.max(0, Math.floor(Number(input.sold ?? existing?.sold ?? 0))),
    images: images.length ? images : existing?.images || [],
    active: Boolean(input.active ?? existing?.active ?? true),
    featured: Boolean(input.featured ?? existing?.featured ?? false),
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
}

export function validateCoupon(coupon: Coupon | undefined, subtotal: number) {
  if (!coupon || !coupon.active) throw new ApiError(400, 'Cupón inválido o inactivo');
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) throw new ApiError(400, 'El cupón expiró');
  if (subtotal < coupon.minimum) throw new ApiError(400, `Compra mínima requerida: ${coupon.minimum}`);
  return coupon;
}

export function normalizeSettings(input: Partial<StoreSettings>, current: StoreSettings): StoreSettings {
  return {
    storeName: String(input.storeName ?? current.storeName).trim() || current.storeName,
    currency: 'CRC',
    taxPercent: Math.min(100, Math.max(0, Number(input.taxPercent ?? current.taxPercent))),
    shippingFee: Math.max(0, Number(input.shippingFee ?? current.shippingFee)),
    freeShippingThreshold: Math.max(0, Number(input.freeShippingThreshold ?? current.freeShippingThreshold)),
    whatsapp: String(input.whatsapp ?? current.whatsapp).replace(/[^0-9]/g, ''),
    heroTitle: String(input.heroTitle ?? current.heroTitle).trim(),
    heroSubtitle: String(input.heroSubtitle ?? current.heroSubtitle).trim(),
    promoCode: String(input.promoCode ?? current.promoCode).trim().toUpperCase()
  };
}
