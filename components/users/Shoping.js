import CheckoutDetail from "@/components/checkout";
import { useState } from "react";
import Link from "next/link";

const PAGE_SIZE = 8;

const Shopping = ({ bills }) => {
    const safeBills = Array.isArray(bills) ? bills : [];
    const [checkout, setCheckout] = useState();
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(safeBills.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const visibleBills = safeBills.slice(start, start + PAGE_SIZE);

    const showCheckout = (id) => {
        const bill = safeBills.find(item => item.id === id);
        if (bill) {
            setCheckout(bill.checkout);
            setShow(true);
        }
    };

    const goToPage = (nextPage) => {
        setPage(Math.min(Math.max(nextPage, 1), totalPages));
    };

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">ID</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Factura</th>
                                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">CUIT</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Checkout</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                                <th className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">Detalle</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {visibleBills.map((bill) => (
                                <tr key={bill.id} className="transition hover:bg-gray-50/70">
                                    <td className="hidden px-5 py-4 text-sm font-medium text-gray-800 sm:table-cell">#{bill.id}</td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                            {bill.number}
                                        </span>
                                    </td>
                                    <td className="hidden px-5 py-4 text-sm text-gray-500 sm:table-cell">{bill.cuit}</td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm">
                                        <Link href={`/checkout/${bill.checkout?.id}`}>
                                            <a className="font-semibold text-palette-sdark hover:underline">#{bill.checkout?.id}</a>
                                        </Link>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{bill.totalAmount}</td>
                                    <td className="hidden px-5 py-4 whitespace-nowrap text-sm sm:table-cell">
                                        <button
                                            type="button"
                                            onClick={() => showCheckout(bill.id)}
                                            className="font-semibold text-palette-sdark hover:underline"
                                        >
                                            Ver detalle
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {visibleBills.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-5 py-10 text-center text-sm text-gray-500">
                                        Todavía no tenés compras registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {safeBills.length > 0 && (
                    <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500">
                            Mostrando {start + 1}-{Math.min(start + PAGE_SIZE, safeBills.length)} de {safeBills.length} compras
                        </p>

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    type="button"
                                    onClick={() => goToPage(pageNumber)}
                                    className={`h-8 min-w-8 rounded-lg px-2 text-xs font-bold ${
                                        currentPage === pageNumber
                                            ? "bg-palette-sdark text-white"
                                            : "border border-gray-200 bg-white text-gray-600"
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {show && <CheckoutDetail checkout={checkout} setShow={setShow} />}
        </>
    );
};

export default Shopping;
