import List from "@/components/checkout/List";
import React, {useEffect, useState} from "react";
import {findAll} from "../../services/checkoutService";
import PageTitle from "@/components/PageTitle";

const Index = () => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Checkout`} />
            <List/>
        </div>
    )
}


export default Index

