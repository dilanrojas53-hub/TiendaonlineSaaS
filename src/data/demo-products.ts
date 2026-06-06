import { Product, Wholesaler } from '@/types/catalog';

export const products: Product[] = [
  { id: 'p6000-silver', name: 'P 6000 Metallic Silver', brand: 'Nike', description: 'Tallas 36 a 40. Acabado plateado.', price: 27500, compareAtPrice: 35000, wholesalePrice: 23500, sizes: ['36','37','38','39','40'], colors: ['Silver'], tags: ['nuevo','tendencia'], stockStatus: 'available', views: 186, whatsappClicks: 42, cartAdds: 31 },
  { id: 'nb-530-beige', name: 'NB 530 Beige', brand: 'New Balance', description: 'Tallas 36 a 40. Estilo urbano comodo.', price: 27500, compareAtPrice: 32000, wholesalePrice: 23000, sizes: ['36','37','38','39','40'], colors: ['Beige'], tags: ['unisex','mayorista'], stockStatus: 'available', views: 241, whatsappClicks: 67, cartAdds: 48 },
  { id: 'airforce-one', name: 'Airforce One', brand: 'Nike', description: 'Tallas 36 a 40. Promo por pares disponible.', price: 25000, compareAtPrice: 30000, wholesalePrice: 21000, sizes: ['36','37','38','39','40'], colors: ['Blanco'], tags: ['promo','top'], stockStatus: 'low', views: 298, whatsappClicks: 81, cartAdds: 61 },
  { id: 'vans-plataforma', name: 'Vans Plataforma', brand: 'Vans', description: 'Tallas 38, 39 y 40.', price: 25000, compareAtPrice: 29900, wholesalePrice: 21500, sizes: ['38','39','40'], colors: ['Negro','Rosado'], tags: ['dama','plataforma'], stockStatus: 'available', views: 152, whatsappClicks: 34, cartAdds: 19 }
];

export const wholesalers: Wholesaler[] = [
  { id: 'w-001', code: 'MAY-001', businessName: 'Boutique Central', phone: '50688880000', province: 'San Jose', tier: 'wholesale', discountRate: 12, totalOrders: 18, totalSpent: 820000 },
  { id: 'w-002', code: 'VIP-002', businessName: 'Zapatos La Moda', phone: '50677770000', province: 'Alajuela', tier: 'vip', discountRate: 18, totalOrders: 31, totalSpent: 1450000 }
];
