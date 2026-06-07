import { products as legacyProducts, wholesalers as legacyWholesalers } from '@/data/demo-products';
import type { AnalyticsEvent, CatalogProduct, Tenant, TenantDashboard, WholesalerProfile } from './types';

export const tenants: Tenant[] = [
  {
    id: 'tenant_karen',
    slug: 'karen-fashion',
    name: 'Karen Fashion Store',
    tagline: 'Sneakers, moda y promociones',
    description: 'Tienda demo para catálogo de zapatos, ventas por WhatsApp y clientes mayoristas.',
    phone: '72578184',
    whatsappNumber: '50672578184',
    address: 'San José, Costa Rica',
    status: 'trial',
    planTier: 'growth',
    theme: {
      preset: 'ios_luxe',
      primaryColor: '#090909',
      accentColor: '#D4AF37',
      backgroundColor: '#F5F5F7',
      surfaceColor: '#FFFFFF',
      textColor: '#111111',
      heroTitle: 'Tu estilo se ve mejor aquí.',
      heroSubtitle: 'Nueva colección, promociones y tallas disponibles para consultar por WhatsApp.'
    }
  },
  {
    id: 'tenant_atlas',
    slug: 'atlas-demo',
    name: 'Atlas Demo Store',
    tagline: 'Catálogo multitenant demo',
    description: 'Segundo tenant para validar que el sistema no depende de una sola tienda.',
    phone: '70000000',
    whatsappNumber: '50670000000',
    address: 'Costa Rica',
    status: 'active',
    planTier: 'starter',
    theme: {
      preset: 'ios_light',
      primaryColor: '#111111',
      accentColor: '#007AFF',
      backgroundColor: '#F5F5F7',
      surfaceColor: '#FFFFFF',
      textColor: '#111111',
      heroTitle: 'Catálogo listo para vender.',
      heroSubtitle: 'Productos, consultas y administración en una sola plataforma.'
    }
  }
];

export const catalogProducts: CatalogProduct[] = legacyProducts.map((product, index) => ({
  id: product.id,
  tenantId: 'tenant_karen',
  name: product.name,
  brand: product.brand,
  description: product.description,
  price: product.price,
  compareAtPrice: product.compareAtPrice,
  wholesalePrice: product.wholesalePrice,
  sizes: product.sizes,
  colors: product.colors,
  tags: product.tags,
  status: product.stockStatus === 'sold_out' ? 'sold_out' : 'active',
  stock: product.stockStatus === 'low' ? 2 : 12 + index
}));

export const wholesalers: WholesalerProfile[] = legacyWholesalers.map((client) => ({
  ...client,
  tenantId: 'tenant_karen'
}));

export const analyticsEvents: AnalyticsEvent[] = catalogProducts.flatMap((product, index) => [
  { id: `view_${product.id}`, tenantId: product.tenantId, productId: product.id, type: 'product_view', createdAt: new Date(Date.now() - index * 86400000).toISOString() },
  { id: `wa_${product.id}`, tenantId: product.tenantId, productId: product.id, type: 'whatsapp_click', createdAt: new Date(Date.now() - index * 86400000).toISOString() },
  { id: `cart_${product.id}`, tenantId: product.tenantId, productId: product.id, type: 'cart_add', createdAt: new Date(Date.now() - index * 86400000).toISOString() }
]);

export function getTenantBySlug(slug: string) {
  return tenants.find((tenant) => tenant.slug === slug && tenant.status !== 'paused') || null;
}

export function getTenantProducts(tenantId: string) {
  return catalogProducts.filter((product) => product.tenantId === tenantId);
}

export function getTenantWholesalers(tenantId: string) {
  return wholesalers.filter((client) => client.tenantId === tenantId);
}

export function getTenantDashboard(tenantId: string): TenantDashboard {
  const products = getTenantProducts(tenantId);
  const events = analyticsEvents.filter((event) => event.tenantId === tenantId);

  return {
    totalProducts: products.length,
    activeProducts: products.filter((product) => product.status === 'active').length,
    lowStockProducts: products.filter((product) => product.stock <= 3).length,
    productViews: events.filter((event) => event.type === 'product_view').length * 97,
    whatsappClicks: events.filter((event) => event.type === 'whatsapp_click').length * 28,
    cartAdds: events.filter((event) => event.type === 'cart_add').length * 19,
    totalIntent: events.length * 31
  };
}

export function getTopProducts(tenantId: string) {
  return getTenantProducts(tenantId)
    .map((product, index) => ({
      ...product,
      views: 180 - index * 12,
      whatsappClicks: 60 - index * 5,
      cartAdds: 35 - index * 3
    }))
    .sort((a, b) => b.whatsappClicks - a.whatsappClicks);
}
