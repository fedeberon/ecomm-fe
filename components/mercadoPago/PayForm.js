import {useEffect} from "react";

const PayForm = ({preference}) => {

    useEffect(() => {
        console.log("preference", preference)
    })

    return (
        <>
            <a href={preference}>Pagar con Mercado Pago</a>
        </>
    )
}

export default PayForm;