import { useEffect, useState } from "react";
import CreditCard from "@/components/cart/CreditCard";
import { getSession } from "next-auth/client";
import { getBilling } from "../../services/billingService";
import { useRouter } from "next/router";
import { buyWithPoints, createCheckout } from "../../services/productService";
import { useCartContext, useCleanCartContext } from "@/context/Store";
import Loading from "@/components/utils/Loading";
import { getPoints } from "../../services/walletService";
import { findAll, getByUsername } from "../../services/userService";
import CartTableBill from "@/components/cart/CartTableBill";
import { getPersonByCUIT } from "../../services/personService.js";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import PageTitle from "@/components/PageTitle";

const inputClass = "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-palette-sdark focus:ring-4 focus:ring-cyan-50";

const Payment = ({ myPoints, users }) => {
  const [checkout, setCheckout] = useState();
  const [error, setError] = useState();
  const router = useRouter();
  const [cart] = useCartContext();
  const cleanCart = useCleanCartContext();
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState("visa");
  const [coupon, setCoupon] = useState("");
  const [points, setPoints] = useState(myPoints);
  const [check, setCheck] = useState(false);
  const [cross, setCross] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [personLoaded, setPersonLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [person, setPerson] = useState({ username: "", name: "", lastName: "", address: "", cuit: "" });

  useEffect(() => {
    if (!cart?.length) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const loadCheckout = async () => {
      setLoading(true);
      try {
        const response = await createCheckout(cart);
        if (!cancelled) setCheckout(response.data);
      } catch (checkoutError) {
        if (!cancelled) setError(checkoutError.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadCheckout();
    return () => { cancelled = true; };
  }, [cart]);

  useEffect(() => {
    setTotalAmount(cart.reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 1), 0));
  }, [cart]);

  const handleChange = (event) => setPerson({ ...person, [event.target.name]: event.target.value });

  const handleChangeUsers = (event) => {
    const { value } = event.target;
    if (value === "seleccionar") {
      setPersonLoaded(false);
      setPerson({ username: "", name: "", lastName: "", address: "", cuit: "" });
      setPoints(0);
      return;
    }

    setPersonLoaded(true);
    getPoints(value).then(setPoints);
    getByUsername(value).then((user) => setPerson({
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      address: user.address,
      cuit: user.cuit,
      twins: user.twins,
    }));
  };

  const handleCUIT = async (cuit) => {
    const result = await getPersonByCUIT(cuit);
    setCheck(result.status === undefined);
    setCross(result.status === 400);
  };

  const submit = async (type) => {
    setError("");
    setLoading(true);
    try {
      const session = await getSession();
      const response = await getBilling(person, checkout, type, session, coupon, card);
      if (response.status === 200) {
        await router.push(`/bills/${response.data.id}`);
        cleanCart();
      } else {
        setError(response.data?.error || "No se pudo generar la factura.");
      }
    } catch (submitError) {
      setError(submitError.response?.data?.error || submitError.message || "No se pudo completar la compra.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreditPoints = async () => {
    setLoading(true);
    try {
      const response = await buyWithPoints({ username: person.username, checkoutId: checkout.id });
      if (response.data === "puntos insuficientes") {
        NotificationManager.info("El usuario no tiene puntos suficientes", "Puntos insuficientes");
      } else {
        await router.push(`/users/wallet/${person.username}`);
        cleanCart();
      }
    } catch (pointsError) {
      setError(pointsError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageTitle text="Finalizar compra" />
      <NotificationContainer />

      {!checkout && !loading ? (
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-800">Tu carrito está vacío</h2>
            <p className="mt-2 text-slate-500">Agregá productos para continuar con la compra.</p>
          </div>
        </div>
      ) : checkout ? (
        <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:px-8">
          <section className="order-2 min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:order-1 lg:sticky lg:top-6 lg:self-start">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-palette-sdark">Resumen</p><h2 className="mt-1 text-2xl font-extrabold text-slate-800">Tu compra</h2></div>
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-palette-sdark">{cart.length} {cart.length === 1 ? "producto" : "productos"}</span>
            </div>
            <CartTableBill cart={cart} />
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-500"><span>Subtotal</span><strong className="text-lg text-slate-800">${totalAmount.toLocaleString("es-AR")}</strong></div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Compra segura y protegida</div>
            </div>
          </section>

          <section className="order-1 space-y-5 lg:order-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-sdark text-sm font-extrabold text-white">1</span><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Datos de facturación</p><h2 className="text-xl font-extrabold text-slate-800">¿A quién facturamos?</h2></div></div>
              <label htmlFor="user" className="text-sm font-bold text-slate-700">Usuario</label>
              <select id="user" className={inputClass} onChange={handleChangeUsers}><option value="seleccionar">Seleccione el usuario</option>{users.map((user, index) => <option key={index} value={user.username}>{user.name}</option>)}</select>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div><label htmlFor="name" className="text-sm font-bold text-slate-700">Nombre</label><input id="name" name="name" onChange={handleChange} value={person.name || ""} className={inputClass} placeholder="Nombre" /></div>
                <div><label htmlFor="lastName" className="text-sm font-bold text-slate-700">Apellido</label><input id="lastName" name="lastName" onChange={handleChange} value={person.lastName || ""} className={inputClass} placeholder="Apellido" /></div>
              </div>
              <div className="mt-5"><label htmlFor="email" className="text-sm font-bold text-slate-700">E-mail</label><input id="email" name="username" onChange={handleChange} value={person.username || ""} className={inputClass} placeholder="correo@ejemplo.com" /></div>
              <div className="mt-5"><label htmlFor="cuit" className="text-sm font-bold text-slate-700">CUIT</label><div className="mt-2 flex gap-2"><input id="cuit" name="cuit" onChange={handleChange} value={person.cuit || ""} className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-palette-sdark focus:ring-4 focus:ring-cyan-50" placeholder="XX-XXXXXXXX-X" /><button type="button" onClick={() => handleCUIT(person.cuit)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-600 transition hover:bg-slate-100">Verificar</button></div>{check && <p className="mt-2 text-xs font-bold text-emerald-600">CUIT verificado correctamente.</p>}{cross && <p className="mt-2 text-xs font-bold text-rose-600">No pudimos verificar el CUIT.</p>}</div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-palette-sdark text-sm font-extrabold text-white">2</span><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Medio de pago</p><h2 className="text-xl font-extrabold text-slate-800">Elegí cómo pagar</h2></div></div>
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} id="selectCard" className={inputClass + " mt-0"}><option value="">Seleccionar medio de pago</option><option value="credit card">Tarjeta de crédito</option><option value="point card">Tarjeta de puntos</option></select>
              {paymentMethod === "credit card" && <div className="mt-6 rounded-2xl bg-slate-50 p-4"><CreditCard person={person} setCard={setCard} card={card} coupon={coupon} setCoupon={setCoupon} /></div>}
              {paymentMethod === "point card" && <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center"><div className="mx-auto max-w-sm rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-5 text-left text-white shadow-lg"><p className="text-xs font-bold uppercase tracking-widest">Dulce Bebé</p><p className="mt-5 text-sm">Saldo disponible</p><p className="text-3xl font-extrabold">{points} puntos</p><p className="mt-5 text-sm font-semibold">{person.name || "Seleccioná un usuario"} {person.lastName || ""}</p></div>{!personLoaded ? <p className="mt-4 text-sm font-semibold text-amber-700">Seleccioná un usuario para utilizar sus puntos.</p> : person.twins ? <p className="mt-4 rounded-xl bg-pink-50 p-3 text-sm font-bold text-pink-700">Se aplicará un 20% de descuento por beneficio Mellizos.</p> : <button type="button" onClick={handleCreditPoints} className="mt-4 w-full rounded-xl bg-palette-sdark px-4 py-3 text-sm font-extrabold text-white transition hover:bg-palette-dark">Usar tarjeta de puntos</button>}</div>}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><p className="mb-4 text-sm font-bold text-slate-700">Seleccioná el tipo de comprobante</p>{error && <p className="mb-4 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p>}{totalAmount === 0 ? <div className="rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-700">Hay un producto con importe igual a cero.</div> : <div className="grid gap-3 sm:grid-cols-3"><button type="button" onClick={() => submit("A")} className="rounded-xl bg-slate-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800">Factura A</button><button type="button" onClick={() => submit("B")} className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-amber-600">Factura B</button><button type="button" onClick={() => submit("C")} className="rounded-xl bg-palette-sdark px-4 py-3 text-sm font-extrabold text-white transition hover:bg-palette-dark">Consumidor final</button></div>}</div>
          </section>
        </main>
      ) : null}
      {loading && <Loading message="Un momento por favor ..." />}
    </div>
  );
};

export default Payment;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const users = await findAll();
  if (session == null) return { redirect: { permanent: false, destination: "/login" }, props: {} };
  const myPoints = await getPoints(session.user.username);
  return { props: { myPoints, user: session.user, users } };
}
