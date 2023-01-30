import CheckOutButton from "@/components/CheckOutButton";
import Image from "@/components/products/Image";
import Link from "next/link";

const Details = ({checkout}) => {
    return (
        <>
            <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th></th>
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                                    <Link href={'/products/' + p.product.id}>
                                      <Image product={p.product}/>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={'/products/' + p.product.id}>
                                        <div className="flex items-center cursor-pointer">
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
                                    </Link>
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

        </>



    )
}

export default Details