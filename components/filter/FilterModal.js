import { useEffect, useMemo, useState } from "react";
import { debounce } from 'lodash';

function FilterModal({ filterParams, searchFunction, columnList }) {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedOrderCol, setSelectedOrderCol] = useState(columnList[0].value);
    const [ascOrder, setAscOrder] = useState(false);
    const [queryParameters, setQueryParameters] = useState(filterParams.map(() => []));
    const [searchTerm, setSearchTerm] = useState('');
    const [brandSearch, setBrandSearch] = useState('');
    const [openSections, setOpenSections] = useState({ Categorias: true, Marcas: true });
    const [showAllBrands, setShowAllBrands] = useState(false);

    const customParams = [searchTerm, queryParameters, selectedOrderCol, ascOrder ? "T" : "F"];
    const activeFilters = queryParameters.reduce((total, values) => total + values.length, 0);

    const selectedPills = useMemo(() => {
        const pills = [];
        filterParams.forEach((category, categoryIndex) => {
            const selected = queryParameters[categoryIndex] || [];
            (category.elements || []).forEach((item) => {
                if (selected.includes(String(item.id)) || selected.includes(item.id)) {
                    pills.push({
                        categoryIndex,
                        value: String(item.id),
                        label: `${category.type}: ${item.name}`
                    });
                }
            });
        });
        return pills;
    }, [filterParams, queryParameters]);

    const toggleValue = (value, index) => {
        const normalized = String(value);
        setQueryParameters((prev) => prev.map((arr, i) => {
            if (i !== index) return arr;
            return arr.includes(normalized)
                ? arr.filter((item) => item !== normalized)
                : [...arr, normalized];
        }));
    };

    const clearFilters = () => {
        const emptyFilters = filterParams.map(() => []);
        setQueryParameters(emptyFilters);
        setSelectedOrderCol(columnList[0].value);
        setAscOrder(false);
        setBrandSearch('');
        setShowAllBrands(false);
        searchFunction([searchTerm, emptyFilters, columnList[0].value, "F"]);
    };

    const applyFilters = () => {
        setShowFilter(false);
        searchFunction([...customParams]);
    };

    const toggleSection = (key) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                />
                {searchTerm && (
                    <button type="button" onClick={() => setSearchTerm('')} className="absolute right-28 sm:right-36 w-8 h-8 rounded-full text-gray-400 hover:bg-gray-100">×</button>
                )}
                <button type="button" onClick={() => setShowFilter(true)} className="absolute right-0 top-0 h-full px-5 sm:px-6 bg-palette-sdark hover:bg-palette-dark text-white font-bold text-sm flex items-center gap-2">
                    Filtros
                    {activeFilters > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-white text-palette-sdark text-xs flex items-center justify-center">{activeFilters}</span>}
                </button>
            </div>

            <div className={`fixed z-50 inset-0 ${showFilter ? "" : "hidden"}`}>
                <button type="button" onClick={() => setShowFilter(false)} className="absolute inset-0 bg-gray-800 bg-opacity-60 w-full h-full" aria-label="Cerrar filtros" />

                <div className="relative z-10 flex items-center justify-center h-screen p-3 sm:p-5">
                    <div className="w-full max-w-[1240px] max-h-[88vh] bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col">
                        <div className="px-5 sm:px-7 py-4 flex items-start justify-between border-b border-gray-100 flex-shrink-0">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900">Filtrar productos</h2>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">Elegí las opciones y aplicá los filtros.</p>
                            </div>
                            <button type="button" onClick={() => setShowFilter(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 text-xl">×</button>
                        </div>

                        {selectedPills.length > 0 && (
                            <div className="px-5 sm:px-7 py-3 border-b border-gray-100 flex flex-wrap items-center gap-2 flex-shrink-0">
                                <span className="text-xs font-semibold text-gray-600 mr-1">Filtros aplicados:</span>
                                {selectedPills.map((pill) => (
                                    <button
                                        key={`${pill.categoryIndex}-${pill.value}`}
                                        type="button"
                                        onClick={() => toggleValue(pill.value, pill.categoryIndex)}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] text-gray-700 hover:border-palette-sdark hover:text-palette-sdark"
                                    >
                                        {pill.label}<span className="text-sm leading-none">×</span>
                                    </button>
                                ))}
                                <button type="button" onClick={clearFilters} className="text-[11px] font-semibold text-palette-sdark hover:text-palette-dark ml-1">Limpiar todos</button>
                            </div>
                        )}

                        <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-7 py-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {filterParams?.map((category, arrayIndex) => {
                                    const isBrands = category.type?.toLowerCase().includes('marca');
                                    const sectionKey = isBrands ? 'Marcas' : 'Categorias';
                                    const isOpen = openSections[sectionKey];
                                    let elements = category.elements || [];

                                    if (isBrands && brandSearch.trim()) {
                                        const query = brandSearch.trim().toLowerCase();
                                        elements = elements.filter((item) => item.name?.toLowerCase().includes(query));
                                    }

                                    if (isBrands && !showAllBrands) {
                                        elements = elements.slice(0, 20);
                                    }

                                    return (
                                        <section key={category.type} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => toggleSection(sectionKey)}
                                                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="w-7 h-7 rounded-lg bg-palette-slighter text-palette-sdark flex items-center justify-center text-sm font-bold">{isBrands ? '✿' : '◇'}</span>
                                                    <h3 className="text-sm sm:text-base font-bold text-gray-900">{category.type} <span className="font-normal text-gray-400">({category.elements?.length || 0})</span></h3>
                                                </div>
                                                <span className="text-palette-sdark text-sm">{isOpen ? '⌃' : '⌄'}</span>
                                            </button>

                                            {isOpen && (
                                                <div className="px-4 pb-4">
                                                    {isBrands && (
                                                        <div className="mb-3">
                                                            <input
                                                                type="search"
                                                                value={brandSearch}
                                                                onChange={(e) => setBrandSearch(e.target.value)}
                                                                placeholder="Buscar marca..."
                                                                className="w-full h-9 rounded-xl border border-gray-200 bg-gray-50 px-3 text-xs text-gray-700 focus:bg-white focus:border-palette-sdark focus:ring-palette-sdark"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className={isBrands ? "grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2" : "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-2"}>
                                                        {elements.map((subcategory, index) => {
                                                            const value = String(subcategory.id);
                                                            const checked = queryParameters[arrayIndex]?.includes(value);
                                                            return (
                                                                <label key={subcategory.id || index} className="inline-flex items-center min-w-0 text-[11px] sm:text-xs text-gray-700 cursor-pointer leading-5">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox w-4 h-4 rounded text-palette-sdark focus:ring-palette-sdark flex-shrink-0"
                                                                        checked={checked}
                                                                        onChange={() => toggleValue(value, arrayIndex)}
                                                                    />
                                                                    <span className="ml-2 truncate" title={subcategory.name}>{subcategory.name}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>

                                                    {isBrands && (category.elements?.length || 0) > 20 && !brandSearch.trim() && (
                                                        <button type="button" onClick={() => setShowAllBrands((prev) => !prev)} className="mt-3 text-[11px] font-semibold text-palette-sdark hover:text-palette-dark">
                                                            {showAllBrands ? 'Ver menos marcas' : 'Ver más marcas'} {showAllBrands ? '⌃' : '⌄'}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </section>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="px-5 sm:px-7 py-3 border-t border-gray-200 bg-white flex-shrink-0">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                                {columnList && (
                                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-600">
                                        <span className="font-semibold text-gray-700">Ordenar por</span>
                                        <select className="h-9 min-w-[180px] rounded-lg border-gray-200 text-xs text-gray-700" value={selectedOrderCol} onChange={(e) => setSelectedOrderCol(e.target.value)}>
                                            {columnList.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                                        </select>
                                        <label className="flex items-center"><input type="radio" className="form-radio text-palette-sdark" name="order" checked={!ascOrder} onChange={() => setAscOrder(false)} /><span className="ml-1.5">Mayor a menor</span></label>
                                        <label className="flex items-center"><input type="radio" className="form-radio text-palette-sdark" name="order" checked={ascOrder} onChange={() => setAscOrder(true)} /><span className="ml-1.5">Menor a mayor</span></label>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 sm:gap-3">
                                    <button type="button" onClick={clearFilters} className="px-4 h-9 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 font-semibold hover:bg-gray-50">Limpiar filtros</button>
                                    <button type="button" onClick={applyFilters} className="px-5 h-9 rounded-lg bg-palette-sdark hover:bg-palette-dark text-white text-xs font-bold shadow-sm">Aplicar filtros</button>
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
