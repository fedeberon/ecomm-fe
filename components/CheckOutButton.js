import Billing from "@/components/bill/Billing";
import {useState} from "react";
import Loading from "@/components/utils/Loading";

function CheckOutButton({checkout}) {
    const [show, isShowing] = useState(false);
    const [loading, isLoading] = useState(false);
    const [billType, setBillType] = useState();

    const handleBilling = (type) => {
        setBillType(type)
        isShowing(true);
    }

  return (
      <>
          <div className={"flex"}>
            <a onClick={() => handleBilling('A')}
             aria-label="checkout-products"
             className="bg-gray-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
              justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-gray-700 rounded-md mr-4">
              Factura A
            </a>

            <a onClick={() => handleBilling('B')}
                  aria-label="checkout-products"
                  className="bg-yellow-600 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-yellow-700 rounded-md ml-4">
              Factura B
            </a>

            <a onClick={() => handleBilling('C')}
             aria-label="checkout-products"
             className="bg-yellow-600 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
              justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-yellow-700 rounded-md ml-4">
              Consumidor Final
            </a>
          </div>


          {
              show
                ?
                  <Billing isShowing={isShowing} checkout={checkout} type={billType}/>
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
