import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CartTable from '@/components/cart/CartTable'
import CheckOutButton from '@/components/CheckOutButton'
import BackToProductButton from '@/components/products/BackToProductButton'
import {useCartContext, useCleanCartContext} from '@/context/Store'
import {buyWithPoints, createCheckout, getPreference} from "../services/productService";
import React, {useEffect, useState} from "react";
import MercadoPago from "@/components/mercadoPago/MercadoPago";
import Loading from "@/components/utils/Loading";
import {getSession} from "next-auth/client";
import getMyShopping from "../services/shoppingService";
import {getPoints} from "../services/walletService";
import {useRouter} from "next/router";
import {NotificationManager} from "react-notifications";


function CartPage({myPoints, user}) {
  const pageTitle = `Cart | ${process.env.siteTitle}`  
  const [cart, checkoutUrl] = useCartContext()
  const [preference, setPreference] = useState();
  const [checkout, setCheckout] = useState(null);
  const [loading, isLoading] = useState(false);
  const router = useRouter();
  const cleanCart = useCleanCartContext()



    const preparePreference = () => {
      isLoading(true);
      getPreference(cart).then((res) => {
          setPreference(res.data);
          isLoading(false);
      });
  }

  const handleCheckout = () => {
      isLoading(true);
      createCheckout(cart).then((res) => {
          setCheckout(res.data);
          isLoading(false);
      });
  }

  const handleCreditPoints = () => {
      isLoading(true);
      let walletDiscount = {
        "username": user.username,
        "checkoutId": checkout.id,
      };
      buyWithPoints(walletDiscount).then((res) => {
          setCheckout(res.data);
          isLoading(false);
          router.push('/users/wallet')
          cleanCart();
      });
  }

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <SEO title={pageTitle} />
      <PageTitle text="Tu Compra" />
        {
            cart.length == 0
            ?
                <>
                    <h1 className="leading-relaxed font-primary font-extrabold text-3xl text-center text-palette-primary mt-4 py-2 sm:py-4">
                        No hay Art&iacute;culos por aqu&iacute;
                    </h1>
                    <div className={"w-80"}>
                        <BackToProductButton  />
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
                            preference != null
                                ?
                                <>
                                    <MercadoPago preference={preference}/>
                                </>
                                :
                                <>
                                    <a onClick={preparePreference}
                                       aria-label="checkout-products"
                                       className="w-1/2 bg-blue-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-blue-600 rounded-sm"
                                    >Meracado Pago</a>
                                </>
                        }
                        {
                            checkout == null
                                ?
                                <a onClick={handleCheckout}
                                   aria-label="checkout-products"
                                   className="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
                                              justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm cursor-pointer"
                                >Checkout</a>
                                :
                                <>
                                    <CheckOutButton checkout={checkout}/>

                                    <a onClick={handleCreditPoints}
                                       aria-label="checkout-products"
                                       className="w-1/2 bg-gradient-to-r from-blue-900 to-blue-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-blue-600 rounded-sm"
                                    >Tarjeta de Puntos. Saldo: {myPoints}</a>
                                </>
                        }
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
