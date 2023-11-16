import { useEffect, useRef, useState } from "react";
import { useCartContext, useCleanCartContext } from '@/context/Store'
import { getSession } from "next-auth/react";
import { getPoints } from "../../services/walletService";
import { findAll, getByUsername } from "../../services/userService";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PageTitle from '@/components/PageTitle'
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { buyWithPoints, createCheckout } from "../../services/productService";
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

    useEffect(async () => {
        setLoading(true);
        let checkout = await createCheckout(cart);
        setCheckout(checkout.data);
        // cleanCart();
        console.log(checkout.data);
        setLoading(false);
    }, []);
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
                    :
                    <div>
                        <div id="presupuesto"  >
                            <div>
                                <PageTitle text={`Presupuesto # ${checkout.id}`} />
                            </div>
                            {
                            userSession?.role?.includes("ADMIN")
                            ?
                            <div className="m-auto w-1/2">
                                <select
                                    id="user"
                                    className="no-scrollbar text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
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

                        <div ref={componentRed} className="">
                            <PrecheckPrint checkout={checkout} />
                        </div>

                        </div>
                        <div className="flex w-full justify-center">
                            <Link legacyBehavior href="/">
                                <button type="button" className="md:m-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Volver al inicio
                                </button>
                            </Link>
                            <button onClick={print} type="button" className="md:m-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                Imprimir
                            </button>
                            <p aria-label="checkout-products"
                                className="md:m-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                SELECCIONAR USUARIO
                            </p>
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
                                                className="md:m-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                EL 20% DE DESCUENTO SE APLICARA A EN LA FACTURA FINAL
                                                DEL TOTAL DE LA COMPRA


                                            </p>
                                        ) :
                                        (
                                            <a onClick={() => handleCreditPoints(person.username)}
                                                value={person}
                                                aria-label="checkout-products"
                                                className="md:m-3 justify-center bg-gradient-to-r from-blue-900 to-blue-500 rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                Tarjeta de Puntos. Saldo: {points}
                                            </a>
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
    const myPoints = await getPoints(session.token.token.token.token.user.username);
    const userSession = session.token.token.token.token.user;
    return {
        props: {
            myPoints,
            userSession,
            users
        },
    }
}

