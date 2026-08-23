import { useEffect, useRef, useState } from "react";
import { useCartContext, useCleanCartContext } from '@/context/Store'
import { getSession } from "next-auth/client";
import { getPoints } from "../../services/walletService";
import { findAll, getByUsername } from "../../services/userService";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PageTitle from '@/components/PageTitle'
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { buyWithPoints, createBudget } from "../../services/productService";
import Loading from "@/components/utils/Loading";
import PrecheckPrint from "@/components/bill/PrecheckPrint";
import { useRouter } from "next/router";


const Presupuesto = ({ userSession, users }) => {
    const [checkout, setCheckout] = useState();
    const [cart, checkoutUrl] = useCartContext()
    const cleanCart = useCleanCartContext()
    const [points, setPoints] = useState(0)
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [personLoaded, setPersonLoaded] = useState(false)

    useEffect(() => {
        if (!cart?.length) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        const loadBudget = async () => {
            setLoading(true);
            try {
                const response = await createBudget(cart);
                if (!cancelled) setCheckout(response.data);
            } catch (error) {
                if (!cancelled) {
                    NotificationManager.error(error.message, 'No se pudo generar el presupuesto');
                    setCheckout(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadBudget();
        return () => { cancelled = true; };
    }, [cart]);
    const componentRed = useRef()
    const print = useReactToPrint({
        content: () => componentRed.current,
        documentTitle: `DulceBB - Presupuesto`
    })


    const [person, setPerson] = useState({
        "username": "",
        "name": "",
        "lastName": "",
        "address": "",
        "cuit": ""
    })


    const handleChangeUsers = (e) => {
        const { value } = e.target;
        getPoints(value).then((res) => {
            setPoints(res)
        })

        getByUsername(value).then((res) => {
            setPerson({
                "username": res.username,
                "name": res.name,
                "lastName": res.lastName,
                "address": res.address,
                "cuit": res.cuit
            });
            setPersonLoaded(true)
        })
    }

    const handleCreditPoints = (username) => {
        if (username != null) {
            setLoading(true);

            let walletDiscount = {
                "username": username,
                "checkoutId": checkout.id,
            };
            buyWithPoints(walletDiscount).then((res) => {
                if (res.data === "puntos insuficientes") {
                    NotificationManager.info('El usuario no tiene puntos suficientes', 'Puntos insuficientes', 4000, () => {
                    });
                    setLoading(false);
                } else {
                    setLoading(false);
                    router.push(`/users/wallet/${username}`)
                    cleanCart();
                }

            });
        }
    }

    async function deleteCart() {
        NotificationManager.info('Carrito vaciado', () => {
            router.push('/')
        });
        cleanCart();
    }

    async function checkSubmit() {
        NotificationManager.info('Compra realizada con exito', () => {
            router.push('/')
        });
        window.location.href = "/"
        cleanCart();
    }

    return (
        <>

            <NotificationContainer />

            {
                loading
                    ?
                    <Loading message={"Un momento por favor ..."} />
                    : !checkout
                    ? <div className="mx-auto max-w-xl px-4 py-16 text-center text-slate-600">Agregá productos al carrito para generar un presupuesto.</div>
                    :
                    <div className="min-h-screen bg-slate-50 pb-12">
                        <div id="presupuesto" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                            <div>
                                <PageTitle text={`Presupuesto # ${checkout.id}`} />
                            </div>
                            {
                            userSession?.role?.includes("ADMIN")
                            ?
                            <div className="mx-auto mb-6 max-w-6xl rounded-2xl border border-cyan-100 bg-cyan-50 p-5 shadow-sm sm:p-6">
                                <label htmlFor="user" className="mb-3 block text-sm font-extrabold uppercase tracking-wide text-palette-sdark sm:text-base">Asignar presupuesto a un usuario</label>
                                <select
                                    id="user"
                                    className="no-scrollbar flex h-12 w-full items-center rounded-xl border border-cyan-200 bg-white px-4 text-base font-medium text-gray-600 outline-none transition focus:border-palette-sdark focus:ring-4 focus:ring-cyan-100"
                                    onChange={handleChangeUsers}>
                                        <option value="seleccionar">Seleccione el usuario </option>
                                            {users.map((user, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={user.username}
                                                        name={`${user.name}`}
                                                    >
                                                        {user.name}
                                                    </option>
                                                );
                                            })}
                                </select>
                            </div>
                            :
                            <>
                            </>
                            }

                        <div ref={componentRed}>
                            <PrecheckPrint checkout={checkout} />
                        </div>

                        </div>
                        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 px-4 py-6 print:hidden">
                            <Link legacyBehavior href="/">
                                <button type="button" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
                                    Volver al inicio
                                </button>
                            </Link>
                            <button onClick={print} type="button" className="rounded-xl bg-palette-sdark px-5 py-3 text-sm font-extrabold text-white transition hover:bg-palette-dark focus:outline-none focus:ring-4 focus:ring-cyan-100">
                                Imprimir
                            </button>
                        </div>



                        {
                            !personLoaded
                                ?
                                (
                                    <>
                                    </>
                                )
                                :
                                (
                                    person.twins
                                        ?
                                        (
                                            <p
                                                aria-label="checkout-products"
                                                className="mx-auto max-w-2xl rounded-xl bg-pink-50 px-5 py-3 text-center text-sm font-semibold text-pink-700"
                                            >
                                                EL 20% DE DESCUENTO SE APLICARA A EN LA FACTURA FINAL
                                                DEL TOTAL DE LA COMPRA


                                            </p>
                                        ) :
                                        (
                                            <button type="button" onClick={() => handleCreditPoints(person.username)}
                                                value={person}
                                                aria-label="checkout-products"
                                                className="mx-auto block rounded-xl bg-gradient-to-r from-blue-900 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:from-blue-800 hover:to-blue-600">
                                                Tarjeta de Puntos. Saldo: {points}
                                            </button>
                                        )
                                )
                        }


                    </div>

            }

        </>


    )


}


export default Presupuesto;


export async function getServerSideProps(context) {
    const session = await getSession(context)
    const users = await findAll();
    if (session == null) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        };
    }
    const myPoints = await getPoints(session.user.username);
    const userSession = session.user;
    return {
        props: {
            myPoints,
            userSession,
            users
        },
    }
}
