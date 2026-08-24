import withAuthorization from "components/withAuthorization";

const formatPrice = (value) => {
    const number = Number(value ?? 0);
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(number);
};

const CheckoutDetail = ({ checkout, setShow }) => {
    const products = Array.isArray(checkout?.products) ? checkout.products : [];
    const total = products.reduce((sum, item) => sum + Number(item?.price ?? 0), 0);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/45 px-4 py-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-detail-title"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) setShow(false);
            }}
        >
            <div className="flex max-h-[84vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl">
                <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-palette-sdark">Compra</p>
                        <h3 id="checkout-detail-title" className="mt-1 text-xl font-bold text-gray-900">
                            Detalle de productos
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {products.length} {products.length === 1 ? "producto" : "productos"} en esta compra
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShow(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-xl leading-none text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                        aria-label="Cerrar detalle"
                    >
                        ×
                    </button>
                </div>

                <div className="overflow-y-auto px-5 py-4 sm:px-6">
                    {products.length === 0 ? (
                        <div className="rounded-2xl bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
                            No hay productos para mostrar.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {products.map((item, index) => {
                                const product = item?.product ?? {};
                                return (
                                    <div
                                        key={`${product.id ?? product.name ?? "product"}-${index}`}
                                        className="grid gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_90px_130px_130px] sm:items-center"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold text-gray-900" title={product.name}>
                                                {product.name || "Producto"}
                                            </p>
                                            {product.description && (
                                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Cantidad</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">{item.quantity ?? 0}</p>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Precio unitario</p>
                                            <p className="mt-1 text-sm font-semibold text-gray-800">{formatPrice(product.price)}</p>
                                        </div>

                                        <div className="sm:text-right">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Subtotal</p>
                                            <p className="mt-1 text-sm font-bold text-palette-sdark">{formatPrice(item.price)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400">Total del detalle</p>
                        <p className="text-lg font-bold text-gray-900">{formatPrice(total)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShow(false)}
                        className="rounded-xl bg-palette-sdark px-5 py-2.5 text-sm font-bold text-white transition hover:bg-palette-dark"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withAuthorization(CheckoutDetail);
