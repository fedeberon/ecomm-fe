import Create   from '/components/stock/Create'
import PageTitle from "@/components/PageTitle";
import React from "react";

const New = () => {
    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Cargar Stock" />
            <div className="flex">
                <span className="text-sm border border-2 rounded-l px-4 py-2 bg-white w-32 whitespace-no-wrap">Order #</span>
                <input name="field_name" className="border border-2 rounded-r px-4 py-2 w-full" type="text"
                       placeholder="Ingrese el n&uacute;mero de comprobante ..."/>
            </div>
            <Create/>
        </div>

    )

}
export default New