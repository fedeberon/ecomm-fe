import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const MercadoPago = ({ preference }) => {

    useEffect(() => {
        window.location.href = preference;
    }, [preference]);

    return null;
}

export default MercadoPago;
