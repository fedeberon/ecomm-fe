import List from "@/components/checkout/List";
import React, {useEffect, useState} from "react";
import {findAll} from "../../services/checkoutService";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';

const Index = () => {

    return (
        <div className="mx-auto max-w-6xl">
            <StoreHeading title="Checkout" />
            <List/>
        </div>
    )
}

export default withAuthorization(Index);
