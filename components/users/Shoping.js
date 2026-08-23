import CheckoutDetail from "@/components/checkout";
import { useState } from "react";
import Link from "next/link";

const PAGE_SIZE = 8;

const Shopping = ({ bills }) => {
    const safeBills = Array.isArray(bills) ? bills : [];
    const [checkout, setCheckout] = useState();
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const normalizedSearch = search.trim().toLowerCase();
    const filteredBills = normalizedSearch
        ? safeBills.filter((bill) => {
            const values = [
                bill.id,
                bill.number,
                bill.cuit,
                bill.checkout?.id,
                bill.totalAmount,
            ];
            return values.some((value) => String(value ?? "").toLowerCase().includes(normalizedSearch));
        })
        : safeBills;

    const totalPages = Math.max(1, Math.ceil(filteredBills.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const visibleBills = filteredBills.slice(start, start + PAGE_SIZE);

    const showCheckout = (id) => {
        const bill = safeBills.find((item) => item.id === id);
        if (bill) {
            setCheckout(bill.checkout);
            setShow(true);
        }
    };

    const goToPage = (nextPage) => {
        setPage(Math.min(Math.max(nextPage, 1), totalPages));
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const clearSearch = () => {
        setSearch("");
        setPage(1);
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1).filter((pageNumber) => {
        if (totalPages <= 7) return true;
        if (pageNumber === 1 || pageNumber === totalPages) return true;
        return Math.abs(pageNumber - currentPage) <= 1;
    });

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-white px-4 py-4 sm:px-5">
                    <div className="relative max-w-xl">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </span>
                        <input
                            type="search"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Buscar por factura, CUIT, checkout o total..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-800 outline-none transition focus:border-palette-sdark focus:bg-white focus:ring-2 focus:ring-palette-sdark/10"
                            aria-label="Buscar compras"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-700"
                                aria-label="Limpiar búsqueda"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-fixed divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="hidden w-[14%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">ID</th>
                                <th className="w-[18%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Factura</th>
                                <th className="hidden w-[22%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">CUIT</th>
                                <th className="w-[18%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Checkout</th>
                                <th className="w-[14%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                                <th className="hidden w-[14%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">Detalle</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {visibleBills.map((bill) => (
                                <tr key={bill.id} className="transition hover:bg-gray-50/70">
                                    <td className="hidden px-4 py-3.5 text-sm font-medium text-gray-800 sm:table-cell">#{bill.id}</td>
                                    <td className="px-4 py-3.5 whitespace-nowrap">
                                        <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                            {bill.number}
                                        </span>
                                    </td>
                                    <td className="hidden truncate px-4 py-3.5 text-sm text-gray-500 sm:table-cell" title={bill.cuit}>{bill.cuit}</td>
                                    <td className="px-4 py-3.5 whitespace-nowrap text-sm">
                                        <Link href={`/checkout/${bill.checkout?.id}`}>
                                            <a className="font-semibold text-palette-sdark hover:underline">#{bill.checkout?.id}</a>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3.5 whitespace-nowrap text-sm font-semibold text-gray-800">{bill.totalAmount}</td>
                                    <td className="hidden px-4 py-3.5 whitespace-nowrap text-sm sm:table-cell">
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
                                    <td colSpan="6" className="px-5 py-12 text-center">
                                        <p className="text-sm font-semibold text-gray-700">
                                            {normalizedSearch ? "No encontramos compras con ese criterio." : "Todavía no tenés compras registradas."}
                                        </p>
                                        {normalizedSearch && (
                                            <button type="button" onClick={clearSearch} className="mt-2 text-xs font-semibold text-palette-sdark hover:underline">
                                                Limpiar búsqueda
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredBills.length > 0 && (
                    <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500">
                            Mostrando {start + 1}-{Math.min(start + PAGE_SIZE, filteredBills.length)} de {filteredBills.length} compras
                            {normalizedSearch && ` · ${safeBills.length} totales`}
                        </p>

                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                            <button
                                type="button"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Anterior
                            </button>

                            {pageNumbers.map((pageNumber, index) => {
                                const previous = pageNumbers[index - 1];
                                const showEllipsis = previous && pageNumber - previous > 1;

                                return (
                                    <div key={pageNumber} className="flex items-center gap-1.5">
                                        {showEllipsis && <span className="px-1 text-xs text-gray-400">…</span>}
                                        <button
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
                                    </div>
                                );
                            })}

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
