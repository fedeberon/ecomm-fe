import {findAll} from "../../services/stockService";
import React from "react";
import PageTitle from "@/components/PageTitle";
import List from "@/components/stock/List";
import Link from "next/link";
import withAuthorization from 'components/withAuthorization';

const Index = ({stock}) => {
    return (

        <div className="mx-auto max-w-6xl">
            <PageTitle text="Stock" />
            <List stock={stock}/>
            <div>
                <Link legacyBehavior href="/stock/new">
                    <button className="py-2 px-4 ml-4 bg-green-500 text-white rounded hover:bg-blue-700">Agregar Stock</button>
                </Link>
            </div>
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

export default withAuthorization(Index);