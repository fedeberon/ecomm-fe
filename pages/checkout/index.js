import List from "@/components/checkout/List";
import React from "react";
import {findAll} from "../../services/checkoutService";
import PageTitle from "@/components/PageTitle";

const Index = ({data}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Checkout`} />
            <List checkout={data}/>
        </div>
    )
}

export async function getServerSideProps() {
    const data = await findAll();

    return {
        props: {
            data
        },
    }
}

export default Index

