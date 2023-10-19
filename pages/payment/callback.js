import {callbackPayment} from "../../services/productService";


const Callback = () => {
    return (
        <></>
    )
}


export default Callback;

export async function getServerSideProps({query}) {
    const data = await callbackPayment(query);

    return {
        redirect: {
            destination: '/checkout/' + data,
            permanent: false,
        },
    }

}