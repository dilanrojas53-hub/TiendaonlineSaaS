import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_VALUE } from '@/lib/admin-auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (session !== ADMIN_SESSION_VALUE) {
    redirect('/admin/login');
  }

  return children;
}
