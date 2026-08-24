import { getById } from "../../services/checkoutService";
import Details from "@/components/checkout/details";
import Link from "next/link";
import React from "react";

const Checkout = ({ checkout }) => {
    return (
        <main className="bg-gray-50/70 min-h-screen py-8 sm:py-10">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-palette-slighter px-3 py-1 text-xs font-bold uppercase tracking-wider text-palette-sdark">
                            Pedido
                        </span>
                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Pedido #{checkout?.id}
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Revisá los productos y el total de tu compra.
                        </p>
                    </div>

                    <Link legacyBehavior href="/shoping/mine">
                        <a className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50">
                            ← Volver a mis compras
                        </a>
                    </Link>
                </div>

                <Details checkout={checkout} />
            </div>
        </main>
    );
};

export default Checkout;

export async function getServerSideProps({ query }) {
    const checkout = await getById(query.id);

    return {
        props: {
            checkout,
        },
    };
}
