import {getCallback} from "../../services/productService";
import CheckoutDetail from "@/components/checkout";

const Checkout = ({data}) => {

    return (
       <CheckoutDetail data={data}/>
    )

}

export default Checkout

export async function getServerSideProps({query}) {
    const data = await getCallback(query.id);

    return {
        props: {
            data
        },
    }
}