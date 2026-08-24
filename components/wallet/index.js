import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/client";
import logo from "/images/Logo Dulce bb.png";
import logo2 from "/images/logo3buhos.png";
import AddPoints from "./AddPoints";
import RemovePoints from "./RemovePoints";
import { getPoints } from "services/walletService";

const PAGE_SIZE = 8;

const WalletOfUser = ({ walletOfUser, user }) => {
    const movements = Array.isArray(walletOfUser) ? walletOfUser : [];
    const [points, setPoints] = useState(0);
    const [addPoints, setAddPoints] = useState(false);
    const [removePoints, setRemovePoints] = useState(false);
    const [filterText, setFilterText] = useState("");
    const [page, setPage] = useState(1);
    const [session] = useSession();

    useEffect(() => {
        let mounted = true;
        const loadPoints = async () => {
            try {
                const value = await getPoints(user.username);
                if (mounted) setPoints(value || 0);
            } catch (error) {
                if (mounted) setPoints(0);
            }
        };
        loadPoints();
        return () => {
            mounted = false;
        };
    }, [user.username, movements.length]);

    const getExpiration = (date) => {
        if (!date) return null;
        const purchaseDate = new Date(date);
        if (Number.isNaN(purchaseDate.getTime())) return null;
        const expiration = new Date(purchaseDate);
        expiration.setMonth(purchaseDate.getMonth() + 3);
        expiration.setDate(1);
        expiration.setHours(23, 59, 59, 999);
        return expiration;
    };

    const formatDate = (date) => {
        if (!date) return "—";
        const value = new Date(date);
        if (Number.isNaN(value.getTime())) return "—";
        return new Intl.DateTimeFormat("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(value);
    };

    const isExpired = (movement) => {
        const expiration = getExpiration(movement.date);
        return expiration ? new Date() > expiration : false;
    };

    const filteredItems = useMemo(() => {
        const term = filterText.trim().toLowerCase();
        if (!term) return movements;
        return movements.filter((item) => {
            const searchable = [
                item.id,
                item.product?.name || "Puntos",
                item.points,
                item.quantity,
                formatDate(item.date),
            ]
                .filter((value) => value !== undefined && value !== null)
                .join(" ")
                .toLowerCase();
            return searchable.includes(term);
        });
    }, [movements, filterText]);

    useEffect(() => {
        setPage(1);
    }, [filterText]);

    const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const visibleItems = filteredItems.slice(start, start + PAGE_SIZE);

    const activeMovements = movements.filter((movement) => !movement.isConsumed && !isExpired(movement)).length;
    const admin = session?.user?.role?.includes("ADMIN");

    return (
        <div className="space-y-5">
            <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="flex items-center justify-center">
                    {user.twins ? (
                        <div className="w-80 h-48 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-green-400 p-4 py-3 px-5 font-mono text-white shadow-md">
                            <div className="relative flex justify-between">
                                <div>
                                    <h2 className="relative text-left text-xl font-bold">Tarjeta Mellizos</h2>
                                    <h2 className="relative italic">20% de descuento</h2>
                                </div>
                                <div className="relative flex items-center">
                                    <img src={logo2.src} className="relative mt-2 w-24 lg:w-32" alt="Dulce Bebé" />
                                </div>
                            </div>
                            <div className="relative mt-8 flex w-48 justify-between">
                                <div>
                                    <h3 className="relative text-xs">Titular</h3>
                                    <p className="relative font-bold">{user.name} {user.lastName}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-80 h-48 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 p-4 py-5 px-5 font-mono text-white shadow-md">
                            <div className="flex justify-between">
                                <div>
                                    <h2>Mis puntos</h2>
                                    <p className="text-2xl font-bold">{points}</p>
                                </div>
                                <div className="flex items-center">
                                    <img src={logo.src} className="relative w-16 lg:w-24" alt="Dulce Bebé" />
                                </div>
                            </div>
                            <div className="mt-8 flex w-48 justify-between">
                                <div>
                                    <h3 className="text-xs">Titular</h3>
                                    <p className="font-bold">{user.name} {user.lastName}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Movimientos</p>
                        <p className="mt-2 text-3xl font-extrabold text-gray-900">{movements.length}</p>
                        <p className="mt-1 text-xs text-gray-500">Historial de puntos</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Activos</p>
                        <p className="mt-2 text-3xl font-extrabold text-green-600">{activeMovements}</p>
                        <p className="mt-1 text-xs text-gray-500">Movimientos vigentes</p>
                    </div>
                    <div className="col-span-2 rounded-2xl border border-pink-100 bg-pink-50/60 p-4">
                        <div className="flex gap-3">
                            <span className="text-xl">💡</span>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Usá tus puntos en tus compras</p>
                                <p className="mt-1 text-xs leading-5 text-gray-600">Los puntos tienen vigencia según la fecha en que fueron acreditados. Revisá el estado de cada movimiento en el historial.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {admin && (
                <div className="flex flex-wrap justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setRemovePoints(true)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
                    >
                        − Quitar puntos
                    </button>
                    <button
                        type="button"
                        onClick={() => setAddPoints(true)}
                        className="rounded-xl bg-palette-sdark px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                    >
                        + Añadir puntos
                    </button>
                </div>
            )}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-extrabold text-gray-900">Historial de puntos</h2>
                        <p className="mt-0.5 text-xs text-gray-500">Acreditaciones, consumos y vencimientos</p>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">⌕</span>
                        <input
                            value={filterText}
                            onChange={(event) => setFilterText(event.target.value)}
                            placeholder="Buscar movimiento..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-palette-sdark focus:bg-white focus:ring-2 focus:ring-palette-sdark/10"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] table-fixed">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                <th className="w-[10%] px-5 py-3">ID</th>
                                <th className="w-[30%] px-5 py-3">Concepto</th>
                                <th className="w-[14%] px-5 py-3">Puntos</th>
                                <th className="w-[12%] px-5 py-3">Cantidad</th>
                                <th className="w-[18%] px-5 py-3">Fecha</th>
                                <th className="w-[16%] px-5 py-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {visibleItems.map((item) => {
                                const expired = isExpired(item);
                                const consumed = item.isConsumed === true;
                                const status = consumed ? "Consumido" : expired ? "Vencido" : "Disponible";
                                return (
                                    <tr key={item.id} className="transition hover:bg-gray-50/70">
                                        <td className="px-5 py-3.5 text-sm font-semibold text-gray-700">#{item.id}</td>
                                        <td className="px-5 py-3.5">
                                            <p className="truncate text-sm font-semibold text-gray-900">{item.product?.name || "Carga de puntos"}</p>
                                        </td>
                                        <td className="px-5 py-3.5 text-sm font-extrabold text-palette-sdark">{item.points ?? 0}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-600">{item.quantity ?? "—"}</td>
                                        <td className="px-5 py-3.5 text-sm text-gray-600">{formatDate(item.date)}</td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                                consumed || expired
                                                    ? "bg-red-50 text-red-600"
                                                    : "bg-green-50 text-green-700"
                                            }`}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}

                            {visibleItems.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-5 py-12 text-center text-sm text-gray-500">
                                        No encontramos movimientos con ese criterio.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredItems.length > 0 && (
                    <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-gray-500">
                            Mostrando {start + 1}-{Math.min(start + PAGE_SIZE, filteredItems.length)} de {filteredItems.length} movimientos
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 disabled:opacity-40"
                            >
                                Anterior
                            </button>
                            <span className="rounded-lg bg-palette-sdark px-3 py-1.5 text-xs font-bold text-white">{currentPage} / {totalPages}</span>
                            <button
                                type="button"
                                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 disabled:opacity-40"
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
            </section>

            <AddPoints onClose={() => setAddPoints(false)} visible={addPoints} user={user} />
            <RemovePoints onClose={() => setRemovePoints(false)} visible={removePoints} user={user} />
        </div>
    );
};

export default WalletOfUser;
