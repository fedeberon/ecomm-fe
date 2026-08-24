import Image from "@/components/products/Image";
import Link from "next/link";

const currency = (value) => {
    const number = Number(value || 0);
    return `$ ${number.toLocaleString("es-AR")}`;
};

const Details = ({ checkout }) => {
    const products = Array.isArray(checkout?.products) ? checkout.products : [];
    const total = products.reduce((acc, item) => acc + Number(item?.price || 0), 0);

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-[minmax(0,2.4fr)_0.7fr_0.9fr_1fr_1fr] gap-4 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <span>Producto</span>
                    <span>Cantidad</span>
                    <span>Talle</span>
                    <span>Precio unitario</span>
                    <span className="text-right">Subtotal</span>
                </div>

                <div className="divide-y divide-gray-100">
                    {products.map((item, index) => (
                        <div
                            key={`${item?.product?.id || "product"}-${index}`}
                            className="grid grid-cols-1 gap-4 px-5 py-5 md:grid-cols-[minmax(0,2.4fr)_0.7fr_0.9fr_1fr_1fr] md:items-center"
                        >
                            <Link legacyBehavior href={`/products/${item?.product?.id}`}>
                                <a className="flex min-w-0 items-center gap-4 group">
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                                        <Image product={item.product} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-gray-900 group-hover:text-palette-sdark">
                                            {item?.product?.name || "Producto"}
                                        </p>
                                        {item?.product?.description && (
                                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                                                {item.product.description}
                                            </p>
                                        )}
                                    </div>
                                </a>
                            </Link>

                            <div className="flex items-center justify-between md:block">
                                <span className="text-xs font-semibold uppercase text-gray-400 md:hidden">Cantidad</span>
                                <span className="text-sm font-semibold text-gray-700">{item?.quantity ?? 0}</span>
                            </div>

                            <div className="flex items-center justify-between md:block">
                                <span className="text-xs font-semibold uppercase text-gray-400 md:hidden">Talle</span>
                                <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                                    {item?.size?.name || "Sin talle"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between md:block">
                                <span className="text-xs font-semibold uppercase text-gray-400 md:hidden">Precio unitario</span>
                                <span className="text-sm text-gray-600">{currency(item?.product?.price)}</span>
                            </div>

                            <div className="flex items-center justify-between md:block md:text-right">
                                <span className="text-xs font-semibold uppercase text-gray-400 md:hidden">Subtotal</span>
                                <span className="text-sm font-bold text-gray-900">{currency(item?.price)}</span>
                            </div>
                        </div>
                    ))}

                    {products.length === 0 && (
                        <div className="px-5 py-10 text-center text-sm text-gray-500">
                            Este pedido no tiene productos asociados.
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:w-80">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Productos</span>
                        <span>{products.length}</span>
                    </div>
                    <div className="mt-3 border-t border-gray-100 pt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-800">Total del pedido</span>
                        <span className="text-xl font-extrabold text-palette-sdark">{currency(total)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
