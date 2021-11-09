import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CartTable from '@/components/CartTable'
import CheckOutButton from '@/components/CheckOutButton'
import BackToProductButton from '@/components/BackToProductButton'
import {useCartContext} from '@/context/Store'
import {getPreference, createCheckout} from "../services/productService";
import {useEffect, useState} from "react";
import MercadoPago from "@/components/mercadoPago/MercadoPago";


function CartPage() {
  const pageTitle = `Cart | ${process.env.siteTitle}`  
  const [cart, checkoutUrl] = useCartContext()
  const [preference, setPreference] = useState();
  const [checkout, setCheckout] = useState();

  const preparePreference = () => {
      getPreference(cart).then((res) => {
          setPreference(res.data);
      });
  }

  const handleCheckout = () => {
      createCheckout(cart).then((res) => {
          setCheckout(res.data);
      });
  }
  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <SEO title={pageTitle} />
      <PageTitle text="Tu Compra" />
      <CartTable 
        cart={cart}
      />
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <BackToProductButton />
          {
              checkout != null
                  ?
                  <>
                      <CheckOutButton checkout={checkout}/>
                      <MercadoPago preference={preference}/>
                  </>
                  :
                  <>
                      <a onClick={preparePreference}
                      aria-label="checkout-products"
                      className="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
                      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
                      >Generar el Pago</a>

                      <a onClick={handleCheckout}
                      aria-label="checkout-products"
                      className="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
                              justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
                      >Checkout</a>
                  </>
          }

      </div>


    </div>
  )
}

export default CartPage
