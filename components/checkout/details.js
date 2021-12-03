import CheckOutButton from "@/components/CheckOutButton";

const Details = ({checkout}) => {
    return (
        <>
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Producto
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio Unitario
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                    </th>
                </tr>
                </thead>
                <tbody
                    className="bg-white divide-y divide-gray-200">

                {
                    checkout == undefined
                        ?
                        <></>
                        :
                        checkout.products.map((p, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div
                                                className="text-sm font-medium text-gray-900">
                                                <div>{p.product.name}</div>
                                            </div>
                                            <div
                                                className="text-sm text-gray-500">
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
                                    {checkout.checkoutState}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    $ {p.price}
                                </td>
                            </tr>
                        ))
                }

                </tbody>
            </table>

            {
                checkout.checkoutState === 'IN_PROCESS'
                ?
               <CheckOutButton checkout={checkout}/>
                :
                <></>
            }
        </>



    )
}

export default Details