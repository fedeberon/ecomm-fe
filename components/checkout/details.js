import CheckOutButton from "@/components/CheckOutButton";
import Image from "@/components/products/Image";
import Link from "next/link";

const Details = ({checkout}) => {
    return (
        <div className="">
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
                        Talle
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
                                    <Link legacyBehavior href={'/products/' + p.product.id}>
                                        <Image product={p.product}/>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap max-w-40">
                                    <Link legacyBehavior href={'/products/' + p.product.id}>
                                        <div className="flex items-center cursor-pointer">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    <div>{p.product.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    {p.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    {p.size?.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    $ {p.product.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    {p.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    $ {p.price}
                                </td>
                            </tr>


                        ))
                }

                </tbody>
            </table>

        </div>



    )
}

export default Details