import {callbackPayment} from "../../services/productService";
import { useCleanCartContext } from '@/context/Store'

const emptyCart = useCleanCartContext();
const Callback = () => {
    return (
        <></>
    )
}


export default Callback;

export async function getServerSideProps({query}) {
    const data = await callbackPayment(query);

    if(data.checkoutState != "REJECTED") emptyCart();

    return {
        redirect: {
            destination: '/checkout/' + data.checkoutId,
            permanent: false,
        },
    }

}