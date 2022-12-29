import Create   from '/components/stock/Create'
import PageTitle from "@/components/PageTitle";
import React from "react";


const New = () => {
    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Cargar Stock" />
            <Create/>
        </div>

    )

}
export default New