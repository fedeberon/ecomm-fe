import {getById} from "../../services/checkoutService";
import Details from "@/components/checkout/details";
import PageTitle from "@/components/PageTitle";
import React from "react";

const Checkout = ({checkout}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Checkout #${checkout.id}`} />
            <Details checkout={checkout}/>
        </div>
    )

}

export default Checkout

export async function getServerSideProps({query}) {
    const checkout = await getById(query.id);

    return {
        props: {
            checkout
        },
    }
}