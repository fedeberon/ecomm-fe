import SEO from '@/components/SEO'
import PageTitle from '@/components/PageTitle'
import CartTable from '@/components/CartTable'
import CheckOutButton from '@/components/CheckOutButton'
import BackToProductButton from '@/components/BackToProductButton'
import {useCartContext} from '@/context/Store'
import PayForm from "@/components/mercadoPago/PayForm";
import {getPreference} from "../services/productService";
import {useEffect, useState} from "react";

function CartPage() {
  const pageTitle = `Cart | ${process.env.siteTitle}`  
  const [cart, checkoutUrl] = useCartContext()
  const [preference, setPreference] = useState();

   useEffect(() => {
        if(cart.length != 0){
            getPreference(cart[0].checkoutId).then((res) => {
                setPreference(res.data);
            });
        }
   }, [])

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <SEO title={pageTitle} />
      <PageTitle text="Tu Compra" />
      <CartTable 
        cart={cart}
      />
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <CheckOutButton webUrl={checkoutUrl} />
        <BackToProductButton />
      </div>

        {
            preference != null
            ?
                <PayForm preference={preference}/>
            :
                <></>
        }

    </div>
  )
}

export default CartPage
