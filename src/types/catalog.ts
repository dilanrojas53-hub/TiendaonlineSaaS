export type CustomerTier = 'retail' | 'wholesale' | 'vip';

export type Product = {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  wholesalePrice?: number;
  sizes: string[];
  colors: string[];
  tags: string[];
  stockStatus: 'available' | 'low' | 'sold_out';
  views: number;
  whatsappClicks: number;
  cartAdds: number;
};

export type Wholesaler = {
  id: string;
  code: string;
  businessName: string;
  phone: string;
  province: string;
  tier: CustomerTier;
  discountRate: number;
  totalOrders: number;
  totalSpent: number;
};
