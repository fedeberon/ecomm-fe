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
        setQueryParameters((prev) => prev.map((arr, i) => {
            if (i !== index) return arr;
            return arr.includes(e.target.value)
                ? arr.filter((value) => value !== e.target.value)
                : [...arr, e.target.value];
        }));
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
                <input className="w-full h-full pl-14 pr-40 sm:pr-48 border-0 bg-white text-base text-gray-700 placeholder-gray-400 outline-none focus:ring-0"
                    placeholder="Buscar productos para tu bebé..." id="search" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} autoComplete="off" />
                {searchTerm && <button type="button" onClick={() => setSearchTerm('')} className="absolute right-28 sm:right-36 w-8 h-8 rounded-full text-gray-400 hover:bg-gray-100">×</button>}
                <button type="button" onClick={() => setShowFilter(true)} className="absolute right-0 top-0 h-full px-5 sm:px-6 bg-palette-sdark hover:bg-palette-dark text-white font-bold text-sm flex items-center gap-2">
                    Filtros
                    {activeFilters > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-white text-palette-sdark text-xs flex items-center justify-center">{activeFilters}</span>}
                </button>
            </div>

            <div className={`fixed z-50 inset-0 ${showFilter ? "" : "hidden"}`} id="modal">
                <button type="button" onClick={() => setShowFilter(false)} className="absolute inset-0 bg-gray-800 bg-opacity-70 w-full h-full" aria-label="Cerrar filtros" />
                <div className="relative z-10 flex items-center justify-center h-screen p-2 sm:p-3">
                    <div className="w-full max-w-[1120px] max-h-[82vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="px-4 sm:px-5 py-3 flex items-start justify-between border-b border-gray-100 flex-shrink-0">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold leading-tight text-gray-800">Filtrar productos</h2>
                                <p className="text-xs text-gray-500 mt-0.5">Elegí las opciones y aplicá los filtros.</p>
                            </div>
                            <button type="button" onClick={() => setShowFilter(false)} className="w-7 h-7 rounded-full hover:bg-gray-100 text-gray-500 text-lg">×</button>
                        </div>

                        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-2.5">
                            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.4fr] gap-3">
                                {filterParams?.map((category, arrayIndex) => {
                                    const isBrands = category.type?.toLowerCase().includes('marca');
                                    const limit = 20;
                                    const visibleElements = isBrands && !showAllBrands ? (category.elements || []).slice(0, limit) : (category.elements || []);
                                    return (
                                        <section key={category.type} className="rounded-lg border border-gray-200 px-3 py-2.5 bg-white">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-sm font-bold text-gray-800">{category.type} <span className="font-normal text-gray-400">({category.elements?.length || 0})</span></h3>
                                                {isBrands && (category.elements?.length || 0) > limit && (
                                                    <button type="button" onClick={() => setShowAllBrands((prev) => !prev)} className="text-[10px] font-semibold text-palette-sdark whitespace-nowrap">
                                                        {showAllBrands ? 'Ver menos' : 'Ver más marcas'} {showAllBrands ? '⌃' : '⌄'}
                                                    </button>
                                                )}
                                            </div>
                                            <div className={isBrands ? "grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-1" : "grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1"}>
                                                {visibleElements.map((subcategory, index) => (
                                                    <label key={subcategory.id || index} className="inline-flex items-center min-w-0 text-[10px] sm:text-[11px] text-gray-700 cursor-pointer leading-4 h-6">
                                                        <input type="checkbox" className="form-checkbox w-3.5 h-3.5 rounded text-palette-sdark focus:ring-palette-sdark flex-shrink-0"
                                                            onChange={(e) => handleChangeSubCat(e, arrayIndex)}
                                                            checked={queryParameters[arrayIndex]?.includes(String(subcategory.id)) || queryParameters[arrayIndex]?.includes(subcategory.id)} value={subcategory.id} />
                                                        <span className="ml-1.5 truncate" title={subcategory.name}>{subcategory.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </section>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="px-4 sm:px-5 py-2.5 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                                {columnList && <div className="flex flex-wrap items-center gap-2 text-[11px]">
                                    <span className="font-semibold text-gray-700">Ordenar por</span>
                                    <select className="h-8 min-w-[150px] rounded-md border-gray-200 text-[11px] text-gray-700" value={selectedOrderCol} onChange={(e) => setSelectedOrderCol(e.target.value)}>
                                        {columnList.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                                    </select>
                                    <label className="flex items-center"><input type="radio" className="form-radio text-palette-sdark" name="order" checked={!ascOrder} onChange={() => setAscOrder(false)} /><span className="ml-1">Mayor a menor</span></label>
                                    <label className="flex items-center"><input type="radio" className="form-radio text-palette-sdark" name="order" checked={ascOrder} onChange={() => setAscOrder(true)} /><span className="ml-1">Menor a mayor</span></label>
                                </div>}
                                <div className="flex justify-end gap-2">
                                    <button type="button" className="px-3.5 h-8 rounded-md border border-gray-200 bg-white text-[11px] text-gray-700 font-semibold" onClick={clearFilters}>Limpiar filtros</button>
                                    <button type="button" className="px-4 h-8 rounded-md bg-palette-sdark hover:bg-palette-dark text-white text-[11px] font-bold" onClick={applyFilters}>Aplicar filtros</button>
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
