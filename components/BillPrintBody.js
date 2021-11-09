import {useEffect} from "react";

const BillPrintBody = ({bill}) => {

    useEffect(() => {
        console.log("bill", bill)
    })

    return (

        <div className="mx-auto p-10 ml-20">
            <div className="flex items-center justify-between mb-8 px-3">
                <div>
                    <span className="text-2xl">Factura #</span>: {bill.data.number}<br/>
                    <span>Date</span>: {bill.data.date}<br/>
                </div>
                <div className="text-right">
                    {bill.data.billTypeName}
                </div>
            </div>

            <div className="flex justify-between mb-8 px-3">
                <div>
                    Pixel &amp; Tonic<br/>
                    919 NW Bond St. Ste 203<br/>
                    Bend, OR 97703 USA<br/>
                    hello@pixelandtonic.com<br/>
                    +1 855-700-5115
                </div>
                <div className="text-right">
                    Dulce Bebe<br/>
                    Street 12<br/>
                    Bolivar<br/>
                    hello@dulcebebe.com
                </div>
            </div>

            <div className="border border-t-2 border-gray-200 mb-8 px-3"></div>


            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                         Cantidad
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Precio Unitario
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">

                                {
                                    bill.data.checkout.products.map((p, index) => (
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            <div>{p.product.name}</div>
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {p.product.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {p.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                $ {p.product.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                $ {p.price}
                                            </td>
                                        </tr>
                                    ))
                                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-2 px-3">
                <div className="text-2xl leading-none"><span className="">Total</span>:</div>
                <div className="text-2xl text-right font-medium">$ {bill.data.totalAmount}</div>
            </div>

            <div className="mb-8 px-3">
                <span>CAE: </span>
                <b className="underline font-bold">{bill.data.cae} </b>
                <span>FECHA: </span>
                {bill.data.date}
            </div>

            <div className="mb-8 text-4xl text-center px-3">
                <span>Gracias</span>
            </div>

        </div>
    )

}

export default BillPrintBody