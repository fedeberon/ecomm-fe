import logo from "../../images/default.jpeg";
import {useEffect} from "react";

const CheckoutDetail = ({checkout, setShow}) => {


    useEffect(() => {
        debugger
        console.log("checkout", checkout)
    })



    const defaultImage = {
        "url": "default.jpeg",
        "link": logo,
        "main": false
    };

    return (
        <>
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                 aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                         aria-hidden="true"></div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true">&#8203;</span>
                    <div
                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:w-2/4">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                        Detalle
                                    </h3>
                                    <div className="mt-2">
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto">
                                                <div
                                                    className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
                                                    <div
                                                        className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                        <table className="w-full divide-y divide-gray-200">
                                                            <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col"
                                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Name
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



                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button"
                                    onClick={() => setShow(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CheckoutDetail