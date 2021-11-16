import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import Billing from "@/components/bill/Billing";
import {useEffect, useState} from "react";
import Loading from "@/components/utils/Loading";

function CheckOutButton({checkout}) {
    const [show, isShowing] = useState(false);
    const [loading, isLoading] = useState(false);

    const handleShowBilling = () => {
        isShowing(true);
    }

  return (
      <>
        <a onClick={handleShowBilling}
              aria-label="checkout-products"
              className="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
              justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm">
          Generar Factura - Checkout { checkout ?  checkout.id : ''}
          <FontAwesomeIcon icon={faArrowRight} className="w-4 ml-2 inline-flex" />
        </a>
          {
              show
                ?
                  <Billing isShowing={isShowing} checkout={checkout}/>
                :
                  <></>
          }
          {
              loading
                  ?
                  <Loading message={"Un momento por favor ..."}/>
                  :
                  <></>
          }
      </>
  )
}

export default CheckOutButton
