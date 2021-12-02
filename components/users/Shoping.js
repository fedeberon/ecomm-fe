import CheckoutDetail from "@/components/checkout";
import {useState} from "react";

const Shopping = ({bills}) => {

    const [checkout, setCheckout] = useState();

    const [show, setShow] = useState(false);

    const showCheckout = (id) => {
        debugger
        bills.forEach(bill => {
            if(bill.id == id) {
                setCheckout((checkout) => {
                    return bill.checkout
                })
            }
        })
        setShow(true)
    }

    return (

        <>
            <div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                            id
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Factura
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            CUIT
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Detalle
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        bills.map(bill =>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        #{bill.id}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                     {bill.number}
                                                </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm text-gray-500">
                                                                {bill.cuit}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {bill.checkout.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {bill.totalAmount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <a onClick={() => showCheckout(bill.id)}>
                                                        Detalle
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                show
                    ?
                <CheckoutDetail checkout={checkout} setShow={setShow}/>
                    :
                <></>
            }


        </>


    )
}

export default Shopping