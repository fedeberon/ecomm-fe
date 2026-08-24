import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CartTable from '@/components/cart/CartTable'
import BackToProductButton from '@/components/products/BackToProductButton'
import { useCartContext, useCleanCartContext } from '@/context/Store'
import { buyWithPoints, createCheckout } from '../services/productService'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/utils/Loading'
import { getSession } from 'next-auth/client'
import { getPoints } from '../services/walletService'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faNewspaper } from '@fortawesome/free-solid-svg-icons'

function CartPage({ myPoints, user }) {
  const pageTitle = `Cart | ${process.env.siteTitle}`
  const [cart] = useCartContext()
  const [checkout, setCheckout] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const cleanCart = useCleanCartContext()
  const [session] = useSession()
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => { setTotalAmount(cart.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 1), 0)) }, [cart])
  const handleCheckout = () => { setLoading(true); createCheckout(cart).then((res) => { setCheckout(res.data); setLoading(false) }).catch(() => setLoading(false)) }
  const handleCreditPoints = () => { setLoading(true); buyWithPoints({ username: user.username, checkoutId: checkout.id }).then(() => { router.push('/users/wallet'); cleanCart() }).finally(() => setLoading(false)) }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <SEO title={pageTitle} /><PageTitle text="Tu compra" />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {totalAmount === 0 && cart.length >= 1 && <div className="mx-auto mb-5 max-w-2xl rounded-2xl border border-rose-100 bg-rose-50 px-5 py-4 text-center text-sm font-semibold text-rose-700">Encontramos un producto con importe igual a cero.</div>}
        {cart.length === 0 ? <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm"><h1 className="text-2xl font-extrabold text-slate-800">No hay artículos por aquí</h1><p className="mt-2 text-sm text-slate-500">Agregá productos para comenzar tu compra.</p><div className="mx-auto mt-6 max-w-sm"><BackToProductButton /></div></div> : <><CartTable cart={cart} /><div className="mx-auto mt-8 max-w-md rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5"><div className="mb-4 flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Acciones</span><span className="text-sm font-bold text-palette-sdark">{cart.length} {cart.length === 1 ? 'producto' : 'productos'}</span></div><div className="space-y-3"><BackToProductButton /><Link legacyBehavior href="/precheck/presupuesto"><a className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-palette-sdark bg-white px-4 text-sm font-extrabold text-palette-sdark shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-4 focus:ring-cyan-100"><FontAwesomeIcon icon={faNewspaper} className="h-4 w-4" /> Presupuestar</a></Link>{session?.user?.role?.includes('ADMIN') ? <Link legacyBehavior href="/checkout/payment"><a className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-palette-sdark px-4 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-palette-dark focus:outline-none focus:ring-4 focus:ring-cyan-100"><FontAwesomeIcon icon={faMoneyBill} className="h-4 w-4" /> Facturar</a></Link> : checkout == null ? <button type="button" onClick={handleCheckout} className="flex h-12 w-full items-center justify-center rounded-xl bg-palette-sdark px-4 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-palette-dark focus:outline-none focus:ring-4 focus:ring-cyan-100">Checkout</button> : <button type="button" onClick={handleCreditPoints} className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-900 to-blue-500 px-4 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:from-blue-800 hover:to-blue-600">Tarjeta de puntos · Saldo: {myPoints}</button>}</div></div></>}
      </main>{loading && <Loading message="Espere un momento por favor" />}
    </div>
  )
}

export default CartPage
export async function getServerSideProps(context) { const session = await getSession(context); if (session == null) return { redirect: { permanent: false, destination: '/login' }, props: {} }; const myPoints = await getPoints(session.user.username); return { props: { myPoints, user: session.user } } }
