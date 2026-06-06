export const ADMIN_COOKIE_NAME = 'tiendaonline_admin_session';

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@tienda.com';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
export const ADMIN_SESSION_VALUE = process.env.ADMIN_SESSION_VALUE || 'demo-admin-session';

export function isValidAdminLogin(email: string, password: string) {
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD;
}
