import Create   from '/components/stock/Create'
import StoreHeading from "@/components/StoreHeading";
import React from "react";
import { all } from "services/providersService";
import withAuthorization from 'components/withAuthorization';


const New = ({providers}) => {
    return (
        <div className="mx-auto max-w-6xl">
            <StoreHeading title="Cargar stock" />
            <Create providers={providers}/>
        </div>
    )
}

export async function getServerSideProps() {
    const providers = await all()
    return {
        props: {
            providers
        }
    }
}

export default withAuthorization(New);
