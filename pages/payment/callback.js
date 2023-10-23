import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { callbackPayment } from "../../services/productService";
import { useCartContext, useCleanCartContext } from '@/context/Store';

const Callback = ({ data }) => {
    const [cart, checkoutUrl] = useCartContext();
    const cleanCart = useCleanCartContext();
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleCleanCart = async () => {
            if (data.checkoutState !== "REJECTED") await cleanCart();
            setRedirect(true);
        };
        handleCleanCart();
        if (redirect) {
            router.push('/checkout/' + data.checkoutId);
        }
    }, [redirect]);

    // Your JSX rendering code here
    return <></>;
};

export default Callback;

export async function getServerSideProps({ query }) {
    // Fetch the data from the server
    const data = await callbackPayment(query);

    // Return the data as props
    return {
        props: {
            data,
        },
    };
}
