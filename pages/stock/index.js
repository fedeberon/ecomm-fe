import {findAll} from "../../services/stockService";
import React from "react";
import PageTitle from "@/components/PageTitle";
import List from "@/components/stock/List";

const Index = ({stock}) => {

    return (

        <div className="mx-auto max-w-6xl">
            <PageTitle text="Stock" />

            <List stock={stock}/>
        </div>
    )

}


export async function getServerSideProps() {
    const stock = await findAll();

    return {
        props: {
            stock
        },
    }
}


export default Index