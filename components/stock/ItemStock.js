import {NotificationContainer} from "react-notifications";
import SearchProduct from "@/components/stock/SearchProduct";

const ItemStock = ({stock}) => {

    return (
        <>
            <NotificationContainer/>
            <section className="container mx-auto p-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100  border-b border-gray-600">
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">Talle</th>
                                <th className="px-4 py-3">Stock</th>
                                <th className="px-4 py-3">Cantidad</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            { stock === undefined || stock.length == 0 ? (
                                <>No hay items</>
                            ) : (
                                stock.items.map((item, index) => (
                                    <tr className="text-gray-700">
                                        <td className="px-4 py-3 border">
                                            <div className="flex items-center text-sm">
                                                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                    <img
                                                        className="object-cover w-full h-full rounded-full"
                                                        src={item.product.image}
                                                        alt=""
                                                        loading="lazy"
                                                    />
                                                    <div
                                                        className="absolute inset-0 rounded-full shadow-inner"
                                                        aria-hidden="true"
                                                    ></div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-black">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {item.product.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-ms font-semibold border">
                                            {item.size.name}
                                        </td>
                                        <td className="px-4 py-3 text-sm border">
                                            {item.product.stock}
                                        </td>
                                        <td className="px-4 py-3 text-sm border">
                                            {item.quantity}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    );
}

export default ItemStock