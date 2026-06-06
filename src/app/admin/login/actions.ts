'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_VALUE, isValidAdminLogin } from '@/lib/admin-auth';

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');

  if (!isValidAdminLogin(email, password)) {
    redirect('/admin/login?error=1');
  }

  cookies().set(ADMIN_COOKIE_NAME, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8
  });

  redirect('/admin');
}

export async function logoutAdmin() {
  cookies().delete(ADMIN_COOKIE_NAME);
  redirect('/admin/login');
}
