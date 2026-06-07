export type PlanTier = 'starter' | 'growth' | 'pro';
export type TenantStatus = 'active' | 'trial' | 'paused';
export type ProductStatus = 'active' | 'hidden' | 'sold_out';
export type AnalyticsEventType = 'product_view' | 'whatsapp_click' | 'cart_add' | 'catalog_view';

export type Tenant = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  status: TenantStatus;
  planTier: PlanTier;
  theme: TenantTheme;
};

export type TenantTheme = {
  preset: 'ios_luxe' | 'ios_light' | 'black_gold';
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  heroTitle: string;
  heroSubtitle: string;
};

export type CatalogProduct = {
  id: string;
  tenantId: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  wholesalePrice?: number;
  sizes: string[];
  colors: string[];
  tags: string[];
  status: ProductStatus;
  stock: number;
  imageUrl?: string;
};

export type WholesalerProfile = {
  id: string;
  tenantId: string;
  code: string;
  businessName: string;
  phone: string;
  province: string;
  discountRate: number;
  totalOrders: number;
  totalSpent: number;
};

export type AnalyticsEvent = {
  id: string;
  tenantId: string;
  productId?: string;
  type: AnalyticsEventType;
  createdAt: string;
};

export type TenantDashboard = {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  productViews: number;
  whatsappClicks: number;
  cartAdds: number;
  totalIntent: number;
};
