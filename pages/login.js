import { getSession, getCsrfToken } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const Login = ({ csrfToken, session }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  if (session) {
    router.push("/");
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-palette-bg to-palette-slighter/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden bg-palette-sdark px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex rounded-2xl bg-white p-4 shadow-lg">
                <BrandLogo />
              </div>
              <h1 className="mt-10 max-w-sm text-4xl font-extrabold leading-tight">
                Todo para acompañar cada etapa.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
                Ingresá a tu cuenta para continuar con tus compras, revisar tu carrito y acceder a tus datos.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="font-bold">Compras seguras</div>
                <div className="mt-1 text-white/70">Protegemos tus datos.</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="font-bold">Envíos a todo el país</div>
                <div className="mt-1 text-white/70">Comprá desde donde estés.</div>
              </div>
            </div>
          </section>

          <section className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
            <div className="mx-auto max-w-md">
              <div className="mb-8 lg:hidden">
                <BrandLogo />
              </div>

              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-palette-sdark">
                  Mi cuenta
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                  Iniciar sesión
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Ingresá tus datos para continuar.
                </p>
              </div>

              <form className="space-y-5" action="/api/auth/callback/credentials" method="POST">
                <input type="hidden" name="remember" value="true" />
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                <div>
                  <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-700">
                    Usuario
                  </label>
                  <input
                    id="username"
                    name="username"
                    required
                    autoComplete="username"
                    className="block h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-palette-sdark focus:bg-white focus:ring-2 focus:ring-palette-slighter"
                    placeholder="Ingresá tu usuario"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-20 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-palette-sdark focus:bg-white focus:ring-2 focus:ring-palette-slighter"
                      placeholder="Ingresá tu contraseña"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-3 my-auto h-8 rounded-lg px-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-palette-sdark"
                    >
                      {showPassword ? "Ocultar" : "Ver"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-palette-sdark px-5 text-sm font-bold text-white shadow-md transition hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-palette-sdark focus:ring-offset-2"
                >
                  Entrar
                </button>
              </form>

              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  ¿Todavía no tenés cuenta?{" "}
                  <Link legacyBehavior href="/users/create">
                    <a className="font-bold text-palette-secondary hover:text-palette-sdark">
                      Registrate
                    </a>
                  </Link>
                </p>

                <Link legacyBehavior href="/">
                  <a className="mt-4 inline-flex text-xs font-semibold text-slate-500 hover:text-palette-sdark">
                    ← Volver a la tienda
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
