import { NextResponse } from 'next/server';
import { getTenantBySlug, getTenantDashboard, getTenantProducts, getTenantWholesalers } from '@/lib/saas/mock-db';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const tenant = getTenantBySlug(params.slug);

  if (!tenant) {
    return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
  }

  return NextResponse.json({
    tenant,
    products: getTenantProducts(tenant.id),
    wholesalers: getTenantWholesalers(tenant.id),
    dashboard: getTenantDashboard(tenant.id)
  });
}
