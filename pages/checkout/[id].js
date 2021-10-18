import {getCallback} from "../../services/productService";
import logo from "../../images/default.jpeg";

const Checkout = ({data}) => {



    const defaultImage = {
        "url": "default.jpeg",
        "link": logo,
        "main": false
    };

    return (
        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-3/4 m-auto">
            <div className="w-full h-full text-center">
                <div className="flex h-full flex-col justify-between">
                    <svg className="h-12 w-12 mt-4 m-auto text-green-500" stroke="currentColor" fill="none"
                         viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                    <p className="text-gray-600 dark:text-gray-100 text-md py-2 px-6">
                        Registramos el pago de la compra por los productos con {data.payment_type} .. !!

                    </p>


                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Descripcion
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Estado
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Cantidad
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Precio
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">

                                        {
                                            data.checkout.products.map(productToCart => (

                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                {
                                                                    productToCart.product.images && productToCart.product.images.length != 0
                                                                    ?
                                                                        <img className="h-10 w-10 rounded-full"
                                                                             src={productToCart.product.images[0].link}
                                                                             alt="1"/>
                                                                        :
                                                                        <img className="h-10 w-10 rounded-full"
                                                                             src={defaultImage}
                                                                             alt="2"/>
                                                                }

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {productToCart.product.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {productToCart.product.description}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {
                                                                data.checkout.checkoutState
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {productToCart.quantity}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        $ { productToCart.price }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
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

                    <div className="flex items-center justify-between gap-4 w-full mt-8">
                        <button type="button"
                                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Checkout


export async function getServerSideProps({query}) {
    const data = await getCallback(query.id);

    return {
        props: {
            data
        },
    }

}