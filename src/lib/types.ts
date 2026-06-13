export type ProductColor = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  basePrice: number;
  discountPercent: number;
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  description: string;
  isNew: boolean;
  sold: number;
  images: string[];
  active: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Coupon = {
  code: string;
  type: 'percent' | 'shipping';
  value: number;
  minimum: number;
  active: boolean;
  expiresAt: string | null;
};

export type OrderItem = {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderStatus = 'Pendiente' | 'Pagado' | 'Preparando' | 'Enviado' | 'Entregado' | 'Cancelado';

export type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode: string | null;
  status: OrderStatus;
};

export type Customer = {
  email: string;
  name: string;
  phone: string;
  address: string;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string;
};

export type InventoryMovement = {
  id: string;
  productId: string;
  productName: string;
  type: 'entrada' | 'salida' | 'ajuste';
  quantity: number;
  note: string;
  createdAt: string;
};

export type StoreSettings = {
  storeName: string;
  currency: 'CRC';
  taxPercent: number;
  shippingFee: number;
  freeShippingThreshold: number;
  whatsapp: string;
  heroTitle: string;
  heroSubtitle: string;
  promoCode: string;
};

export type StoreState = {
  products: Product[];
  coupons: Coupon[];
  orders: Order[];
  customers: Customer[];
  inventoryMovements: InventoryMovement[];
  settings: StoreSettings;
};
