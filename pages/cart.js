import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CartTable from '@/components/cart/CartTable'
import BackToProductButton from '@/components/products/BackToProductButton'
import { useCartContext, useCleanCartContext } from '@/context/Store'
import { buyWithPoints, createCheckout, getPreference } from "../services/productService";
import React, { useEffect, useState } from "react";
import Loading from "@/components/utils/Loading";
import { getSession,useSession  } from "next-auth/react";
import { getServerSession } from 'next-auth'
import { getPoints } from "../services/walletService";
import { useRouter } from "next/router";



function CartPage({ myPoints, user }) {
    const pageTitle = `Cart | ${process.env.siteTitle}`
    const [cart, checkoutUrl] = useCartContext()
    const [preference, setPreference] = useState();
    const [checkout, setCheckout] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const cleanCart = useCleanCartContext();
    const { data: session, status } = useSession()
    const [totalAmount, setTotalAmount] = useState(0)
    const [items, setItems] = useState(cart.length);

    useEffect(() => {
        let total = cart.reduce((a, v) => a + v.price, 0);
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
        let walletDiscount = {
            "username": user.username,
            "checkoutId": checkout.id,
        };
        buyWithPoints(walletDiscount).then((res) => {
            setCheckout(res.data);
            setLoading(false);
            router.push('/users/wallet')
            cleanCart();
        });
    }

    return (

        <div className='bg-blue-100 lg:px-6'>
            <div className='flex bg-white  sm:content-start '>
                <div className="bg-white mx-auto mb-5">
                    <SEO title={pageTitle} />
                    <PageTitle text="Tu Compra" />

                    {
                        totalAmount == 0 && cart.length >= 1
                            ?
                            <div
                                className="flex items-center justify-center m-auto w-3/6 bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-center text-red-700"
                                role="alert">
                                Encontramos el item en el carro con importes igual a CERO !!
                            </div>
                            :
                            <></>
                    }
                    {
                        items == 0
                            ?
                            <>
                                <h1 className="leading-relaxed font-primary justify-between font-extrabold text-3xl text-center text-palette-primary mt-4 py-2 sm:py-4">
                                    No hay Art&iacute;culos por aqu&iacute;
                                </h1>
                                <div className="w-80 m-auto">
                                    <BackToProductButton />
                                </div>
                            </>
                            :
                            <>
                                <CartTable
                                    cart={cart}
                                />
                                <div className="max-w-sm mx-auto space-y-4 px-2">
                                    <BackToProductButton />
                                    {
                                        loading
                                            ?
                                            <Loading message={"Espere un momento por favor"} />
                                            :
                                            <></>
                                    }

                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CartPage

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res)

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
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