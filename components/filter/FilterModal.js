import { useEffect, useState } from "react";
import { debounce } from 'lodash';

function FilterModal({ filterParams, searchFunction, columnList }) {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedOrderCol, setSelectedOrderCol] = useState(columnList[0].value);
    const [ascOrder, setAscOrder] = useState(false);
    const [queryParameters, setQueryParameters] = useState(filterParams.map(() => []));
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllBrands, setShowAllBrands] = useState(false);

    const customParams = [searchTerm, queryParameters, selectedOrderCol, ascOrder ? "T" : "F"];
    const activeFilters = queryParameters.reduce((total, values) => total + values.length, 0);

    const handleChangeSubCat = (e, index) => {
        setQueryParameters((prevQueryParameters) => {
            return prevQueryParameters.map((arr, i) => {
                if (i !== index) return arr;
                const existingIndex = arr.indexOf(e.target.value);
                return existingIndex !== -1
                    ? arr.filter((_, itemIndex) => itemIndex !== existingIndex)
                    : [...arr, e.target.value];
            });
        });
    };

    const handleChangeColumn = (e) => {
        setSelectedOrderCol(e.target.value);
    };

    const applyFilters = () => {
        setShowFilter(false);
        searchFunction([...customParams]);
    };

    const clearFilters = () => {
        const emptyFilters = filterParams.map(() => []);
        setQueryParameters(emptyFilters);
        setSelectedOrderCol(columnList[0].value);
        setAscOrder(false);
        setShowAllBrands(false);
        searchFunction([searchTerm, emptyFilters, columnList[0].value, "F"]);
    };

    useEffect(() => {
        const debouncedSearch = debounce(() => searchFunction(customParams), 500);
        debouncedSearch();
        return () => debouncedSearch.cancel();
    }, [searchTerm]);

    return (
        <div className="w-full bg-transparent py-2">
            <div className="relative flex items-center w-full h-12 sm:h-14 rounded-full border-2 border-palette-sdark bg-white shadow-sm overflow-hidden">
                <span className="absolute left-5 text-xl text-gray-400 pointer-events-none">⌕</span>
                <input
                    className="w-full h-full pl-14 pr-40 sm:pr-48 border-0 bg-white text-base text-gray-700 placeholder-gray-400 outline-none focus:ring-0"
                    placeholder="Buscar productos para tu bebé..."
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                />

                {searchTerm && (
                    <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="absolute right-28 sm:right-36 w-8 h-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                        aria-label="Limpiar búsqueda"
                    >
                        ×
                    </button>
                )}

                <button
                    type="button"
                    onClick={() => setShowFilter(true)}
                    className="absolute right-0 top-0 h-full px-5 sm:px-6 bg-palette-sdark hover:bg-palette-dark text-white font-bold text-sm flex items-center gap-2 transition-colors"
                >
                    <span>Filtros</span>
                    {activeFilters > 0 && (
                        <span className="min-w-5 h-5 px-1.5 rounded-full bg-white text-palette-sdark text-xs flex items-center justify-center">
                            {activeFilters}
                        </span>
                    )}
                </button>
            </div>

            <div className={`fixed z-50 inset-0 ${showFilter ? "" : "hidden"}`} id="modal">
                <button
                    type="button"
                    onClick={() => setShowFilter(false)}
                    className="absolute inset-0 bg-gray-800 bg-opacity-70 w-full h-full"
                    aria-label="Cerrar filtros"
                />

                <div className="relative z-10 flex items-center justify-center min-h-screen p-3 sm:p-4">
                    <div className="w-full max-w-[1180px] max-h-[86vh] bg-white rounded-2xl text-left shadow-2xl overflow-hidden flex flex-col">
                        <div className="px-5 sm:px-7 pt-4 pb-3 flex items-start justify-between gap-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-2xl font-bold leading-tight text-gray-800">Filtrar productos</h2>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">Elegí las opciones y aplicá los filtros.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowFilter(false)}
                                className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 text-lg flex items-center justify-center"
                                aria-label="Cerrar"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-7 py-4">
                            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.35fr] gap-4">
                                {filterParams?.map((category, arrayIndex) => {
                                    const isBrands = category.type?.toLowerCase().includes('marca');
                                    const visibleElements = isBrands && !showAllBrands
                                        ? (category.elements || []).slice(0, 24)
                                        : (category.elements || []);

                                    return (
                                        <section key={category.type} className="rounded-xl border border-gray-200 px-4 py-3 bg-white">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm sm:text-base font-bold text-gray-800">
                                                    {category.type} <span className="font-normal text-gray-400">({category.elements?.length || 0})</span>
                                                </h3>
                                                {isBrands && (category.elements?.length || 0) > 24 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowAllBrands((prev) => !prev)}
                                                        className="text-[11px] sm:text-xs font-semibold text-palette-sdark hover:text-palette-dark whitespace-nowrap"
                                                    >
                                                        {showAllBrands ? 'Ver menos' : 'Ver más marcas'} {showAllBrands ? '⌃' : '⌄'}
                                                    </button>
                                                )}
                                            </div>

                                            <div className={isBrands
                                                ? "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-2"
                                                : "grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2"
                                            }>
                                                {visibleElements.map((subcategory, index) => (
                                                    <label
                                                        key={subcategory.id || index}
                                                        className="inline-flex items-center min-w-0 text-[11px] sm:text-xs text-gray-700 cursor-pointer leading-5"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox w-4 h-4 rounded text-palette-sdark focus:ring-palette-sdark flex-shrink-0"
                                                            onChange={(e) => handleChangeSubCat(e, arrayIndex)}
                                                            checked={queryParameters[arrayIndex]?.includes(String(subcategory.id)) || queryParameters[arrayIndex]?.includes(subcategory.id)}
                                                            value={subcategory.id}
                                                        />
                                                        <span className="ml-2 truncate" title={subcategory.name}>{subcategory.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </section>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="px-5 sm:px-7 py-3 border-t border-gray-200 bg-gray-50">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                                {columnList && (
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                                        <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">Ordenar por</span>
                                        <select
                                            className="h-9 min-w-[180px] rounded-lg border-gray-200 text-xs text-gray-700 focus:border-palette-sdark focus:ring-palette-sdark"
                                            id="orderBy"
                                            value={selectedOrderCol}
                                            onChange={handleChangeColumn}
                                        >
                                            {columnList.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>

                                        <div className="flex flex-wrap gap-3 text-[11px] text-gray-600">
                                            <label className="flex items-center cursor-pointer whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-palette-sdark focus:ring-palette-sdark"
                                                    name="order"
                                                    checked={!ascOrder}
                                                    onChange={() => setAscOrder(false)}
                                                />
                                                <span className="ml-1.5">Mayor a menor</span>
                                            </label>
                                            <label className="flex items-center cursor-pointer whitespace-nowrap">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-palette-sdark focus:ring-palette-sdark"
                                                    name="order"
                                                    checked={ascOrder}
                                                    onChange={() => setAscOrder(true)}
                                                />
                                                <span className="ml-1.5">Menor a mayor</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 font-semibold hover:bg-gray-50"
                                        onClick={clearFilters}
                                    >
                                        Limpiar filtros
                                    </button>
                                    <button
                                        type="button"
                                        className="px-5 py-2 rounded-lg bg-palette-sdark hover:bg-palette-dark text-white text-xs font-bold shadow-sm"
                                        onClick={applyFilters}
                                    >
                                        Aplicar filtros
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterModal;
