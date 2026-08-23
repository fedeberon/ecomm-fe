import SEO from '@/components/SEO'
import CartTable from '@/components/cart/CartTable'
import BackToProductButton from '@/components/products/BackToProductButton'
import {useCartContext, useCleanCartContext} from '@/context/Store'
import {buyWithPoints, createCheckout, getPreference} from "../services/productService";
import React, {useEffect, useState} from "react";
import Loading from "@/components/utils/Loading";
import {getSession} from "next-auth/client";
import {getPoints} from "../services/walletService";
import {useRouter} from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/client";

function CartPage({myPoints, user}) {
  const pageTitle = `Cart | ${process.env.siteTitle}`
  const [cart] = useCartContext()
  const [preference, setPreference] = useState();
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cleanCart = useCleanCartContext();
  const [session] = useSession()
  const [totalAmount, setTotalAmount] = useState(0)
  const [items, setItems] = useState(cart.length);

  useEffect(() => {
    const total = cart.reduce((acc, value) => acc + value.price, 0);
    setTotalAmount(total);
  }, [cart]);

  useEffect(() => {
    setItems(cart.length);
  }, [cart]);

  const preparePreference = () => {
    setLoading(true);
    getPreference(cart).then((res) => {
      setPreference(res.data);
      setLoading(false);
    });
  }

  const handleCheckout = () => {
    setLoading(true);
    createCheckout(cart).then((res) => {
      setCheckout(res.data);
      setLoading(false);
    });
  }

  const handleCreditPoints = () => {
    setLoading(true);
    const walletDiscount = {
      username: user.username,
      checkoutId: checkout.id,
    };
    buyWithPoints(walletDiscount).then((res) => {
      setCheckout(res.data);
      setLoading(false);
      router.push('/users/wallet')
      cleanCart();
    });
  }

  return (
    <main className="min-h-[calc(100vh-180px)] bg-gray-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <SEO title={pageTitle} />

      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-palette-sdark">Tu pedido</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Carrito de compras</h1>
            <p className="mt-1 text-sm text-gray-500">
              {items === 0 ? 'Todavía no agregaste productos.' : `${items} ${items === 1 ? 'producto' : 'productos'} en tu carrito`}
            </p>
          </div>
          {items > 0 && (
            <Link href="/" passHref>
              <a className="text-sm font-bold text-palette-sdark hover:underline">+ Seguir comprando</a>
            </Link>
          )}
        </div>

        {totalAmount === 0 && cart.length >= 1 && (
          <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Encontramos un producto con importe igual a cero. Revisalo antes de continuar.
          </div>
        )}

        {items === 0 ? (
          <section className="rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-palette-lighter text-3xl">🛒</div>
            <h2 className="mt-5 text-2xl font-extrabold text-gray-900">Tu carrito está vacío</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Explorá nuestros productos y agregá lo que necesitás para tu bebé. Cuando vuelvas, tu compra va a aparecer acá.
            </p>
            <div className="mx-auto mt-6 max-w-xs">
              <BackToProductButton />
            </div>
          </section>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
            <CartTable cart={cart} />

            <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-lg font-extrabold text-gray-900">Resumen</h2>
              <div className="mt-4 space-y-3 border-b border-gray-100 pb-4 text-sm">
                <div className="flex items-center justify-between text-gray-500">
                  <span>Productos</span>
                  <span className="font-semibold text-gray-700">{items}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-extrabold text-gray-900">$ {totalAmount}</span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-gray-500">El total final puede variar según descuentos, puntos o condiciones de facturación.</p>

              <div className="mt-5 space-y-2.5">
                <Link href="/precheck/presupuesto" passHref>
                  <a className="flex w-full items-center justify-center rounded-xl border border-palette-sdark bg-white px-4 py-3 text-sm font-bold text-palette-sdark transition hover:bg-palette-lighter">
                    Presupuestar
                  </a>
                </Link>

                {session?.user?.role?.includes("ADMIN") ? (
                  <Link href="/checkout/payment" passHref>
                    <a className="flex w-full items-center justify-center rounded-xl bg-palette-sdark px-4 py-3 text-sm font-bold text-white transition hover:opacity-90">
                      Facturar
                    </a>
                  </Link>
                ) : checkout == null ? (
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full rounded-xl bg-palette-sdark px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                  >
                    Continuar compra
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCreditPoints}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-900 to-blue-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                  >
                    Usar puntos · Saldo {myPoints}
                  </button>
                )}

                <div className="pt-1">
                  <BackToProductButton />
                </div>
              </div>
            </aside>
          </div>
        )}

        {loading && <Loading message="Espere un momento por favor" />}
      </div>
    </main>
  )
}

export default CartPage

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if(session == null) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props:{},
    };
  }

  const myPoints = await getPoints(session.user.username);
  const user = session.user;

  return {
    props: {
      myPoints,
      user
    },
  }
}
