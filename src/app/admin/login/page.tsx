import Link from 'next/link';
import { loginAdmin } from './actions';

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="min-h-screen bg-[#080808] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[2.2rem] border border-[#d4af37]/20 bg-[#111] shadow-2xl shadow-black/40 md:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-[#0d0d0d] to-[#221a08] p-8 md:p-10">
            <Link href="/" className="text-xl font-black">Tiendaonline<span className="text-[#d4af37]">SaaS</span></Link>
            <p className="mt-12 font-black uppercase tracking-[.3em] text-[#d4af37]">Acceso privado</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight">Panel administrador protegido.</h1>
            <p className="mt-5 text-lg leading-8 text-[#d7cfbd]">El cliente público no ve acceso al admin. Esta entrada queda separada para el dueño del negocio.</p>
          </div>

          <form action={loginAdmin} className="bg-[#f7f0df] p-8 text-black md:p-10">
            <h2 className="text-3xl font-black">Entrar al panel</h2>
            <p className="mt-2 text-neutral-600">Demo inicial con contraseña. Luego se puede pasar a usuarios reales por tienda.</p>

            {searchParams.error && <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">Correo o contraseña incorrectos.</div>}

            <label className="mt-6 block text-sm font-black">Correo</label>
            <input name="email" type="email" defaultValue="admin@tienda.com" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 outline-none" />

            <label className="mt-5 block text-sm font-black">Contraseña</label>
            <input name="password" type="password" placeholder="admin123" className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 outline-none" />

            <button className="mt-6 w-full rounded-2xl bg-black px-5 py-4 font-black text-white">Entrar</button>

            <p className="mt-5 text-sm text-neutral-500">Demo: admin@tienda.com / admin123. En producción se cambia con variables de entorno.</p>
          </form>
        </section>
      </div>
    </main>
  );
}
