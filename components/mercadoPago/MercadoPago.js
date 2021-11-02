import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag} from "@fortawesome/free-solid-svg-icons";

const MercadoPago = ({preference}) => {



    return (
        <>
            <a href={preference}
               aria-label="back-to-products"
               className="border border-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
               bg-blue-400 text-white
                justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full rounded-sm"
            >
                <FontAwesomeIcon icon={faShoppingBag} className="w-4 mr-2 inline-flex" />

            Pagar con Mercado Pago</a>
        </>
    )
}

export default MercadoPago;