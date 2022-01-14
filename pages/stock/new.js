import Create   from '/components/stock/Create'
import PageTitle from "@/components/PageTitle";
import React from "react";
import { NotificationContainer } from "react-notifications";


const New = () => {
    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Cargar Stock" />
            <Create/>
        </div>

    )

}
export default New