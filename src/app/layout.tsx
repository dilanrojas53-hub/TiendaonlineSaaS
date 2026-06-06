import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TiendaonlineSaaS',
  description: 'Catalogo de ventas con analitica y mayoristas'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body>{children}</body></html>;
}
