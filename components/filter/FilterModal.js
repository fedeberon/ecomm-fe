import { useEffect, useMemo, useState } from "react";
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { searchList } from '../../services/productService';

function FilterModal({ filterParams, searchFunction, columnList }) {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedOrderCol, setSelectedOrderCol] = useState(columnList[0].value);
    const [ascOrder, setAscOrder] = useState(false);
    const [queryParameters, setQueryParameters] = useState(filterParams.map(() => []));
    const [searchTerm, setSearchTerm] = useState('');
    const [brandSearch, setBrandSearch] = useState('');
    const [openSections, setOpenSections] = useState({ Categorias: true, Marcas: true });
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1);
    const router = useRouter();

    const customParams = [searchTerm, queryParameters, selectedOrderCol, ascOrder ? "T" : "F"];
    const activeFilters = queryParameters.reduce((total, values) => total + values.length, 0);

    const selectedPills = useMemo(() => {
        const pills = [];
        filterParams.forEach((category, categoryIndex) => {
            const selected = queryParameters[categoryIndex] || [];
            (category.elements || []).forEach((item) => {
                if (selected.includes(String(item.id)) || selected.includes(item.id)) {
                    pills.push({ categoryIndex, value: String(item.id), label: `${category.type}: ${item.name}` });
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

    useEffect(() => {
        setHighlightedSuggestion(-1);
        const query = searchTerm.trim();
        if (query.length < 2) {
            setSuggestions([]);
            return undefined;
        }

        let cancelled = false;
        const loadSuggestions = async () => {
            setSuggestionsLoading(true);
            try {
                const result = await searchList(query, '', '', 'sales', false, 0, 6);
                if (!cancelled) setSuggestions(result?.content || []);
            } finally {
                if (!cancelled) setSuggestionsLoading(false);
            }
        };

        const timer = setTimeout(loadSuggestions, 250);
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [searchTerm]);

    const openProduct = (product) => {
        setSuggestions([]);
        router.push(`/products/${product.id}`);
    };

    const handleSuggestionKeyDown = (event) => {
        const isOpen = searchTerm.trim().length >= 2;
        if (!isOpen || suggestionsLoading) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHighlightedSuggestion((current) => suggestions.length ? (current + 1) % suggestions.length : -1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHighlightedSuggestion((current) => suggestions.length ? (current <= 0 ? suggestions.length - 1 : current - 1) : -1);
        } else if (event.key === 'Enter' && highlightedSuggestion >= 0 && suggestions[highlightedSuggestion]) {
            event.preventDefault();
            openProduct(suggestions[highlightedSuggestion]);
        } else if (event.key === 'Escape') {
            setSuggestions([]);
            setHighlightedSuggestion(-1);
        }
    };

    return (
        <div className="w-full bg-transparent py-2">
        <div className="relative">
            <div className="relative flex h-12 w-full items-center overflow-hidden rounded-full border-2 border-palette-sdark bg-white shadow-sm sm:h-14">
                <span className="pointer-events-none absolute left-5 text-xl text-gray-400">⌕</span>
                <input className="h-full w-full border-0 bg-white pl-14 pr-40 text-base text-gray-700 placeholder-gray-400 outline-none focus:ring-0 sm:pr-48" placeholder="Buscar productos para tu bebé..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSuggestionKeyDown} autoComplete="off" role="combobox" aria-expanded={searchTerm.trim().length >= 2} aria-controls="product-suggestions" aria-activedescendant={highlightedSuggestion >= 0 ? `product-suggestion-${highlightedSuggestion}` : undefined} />
                {searchTerm && <button type="button" onClick={() => setSearchTerm('')} className="absolute right-28 h-8 w-8 rounded-full text-gray-400 hover:bg-gray-100 sm:right-36">×</button>}
                <button type="button" onClick={() => setShowFilter(true)} className="absolute right-0 top-0 flex h-full items-center gap-2 bg-palette-sdark px-5 text-sm font-bold text-white hover:bg-palette-dark sm:px-6">Filtros {activeFilters > 0 && <span className="flex min-h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs text-palette-sdark">{activeFilters}</span>}</button>
            </div>

            <div id="product-suggestions" className={`absolute left-3 right-3 top-[calc(100%+8px)] z-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-all duration-300 ease-out sm:left-5 sm:right-5 ${searchTerm.trim().length >= 2 ? 'max-h-96 translate-y-0 opacity-100' : 'pointer-events-none max-h-0 -translate-y-2 border-transparent opacity-0'}`}>
                    {suggestionsLoading ? <p className="px-4 py-3 text-sm text-slate-500">Buscando productos...</p> : suggestions.length > 0 ? suggestions.map((product, index) => (
                        <button id={`product-suggestion-${index}`} key={product.id} type="button" onMouseDown={() => openProduct(product)} className={`flex w-full items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 text-left transition last:border-0 hover:bg-cyan-50 ${highlightedSuggestion === index ? 'bg-cyan-50' : 'bg-white'}`}>
                            <span className="min-w-0 truncate text-sm font-semibold text-slate-800">{product.name}</span>
                            <span className="shrink-0 text-sm font-bold text-palette-sdark">$ {Number(product.price || 0).toLocaleString('es-AR')}</span>
                        </button>
                    )) : <p className="px-4 py-3 text-sm text-slate-500">No encontramos productos con ese nombre.</p>}
            </div>
        </div>

            <div className={`fixed inset-0 z-50 ${showFilter ? '' : 'hidden'}`}>
                <button
                    type="button"
                    onClick={() => setShowFilter(false)}
                    className="absolute inset-0 h-full w-full bg-slate-900/35 backdrop-blur-[3px]"
                    aria-label="Cerrar filtros"
                />

                <div className="relative z-10 flex h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="flex w-full max-w-[1160px] max-h-[84vh] flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.22)]">
                        <div className="flex flex-shrink-0 items-start justify-between bg-gradient-to-b from-white to-slate-50/70 px-6 py-4 sm:px-8">
                            <div>
                                <h2 className="text-[28px] font-bold leading-tight text-slate-900">Filtrar productos</h2>
                                <p className="mt-1 text-[13px] text-slate-500">Elegí las opciones y aplicá los filtros.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowFilter(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-500 shadow-sm transition hover:bg-slate-50"
                            >×</button>
                        </div>

                        {selectedPills.length > 0 && (
                            <div className="flex flex-shrink-0 flex-wrap items-center gap-2 border-y border-slate-100 bg-white px-6 py-3 sm:px-8">
                                <span className="mr-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Filtros aplicados</span>
                                {selectedPills.map((pill) => (
                                    <button
                                        key={`${pill.categoryIndex}-${pill.value}`}
                                        type="button"
                                        onClick={() => toggleValue(pill.value, pill.categoryIndex)}
                                        className="inline-flex max-w-[220px] items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-medium text-slate-700 transition hover:border-palette-sdark hover:bg-white hover:text-palette-sdark"
                                    >
                                        <span className="truncate">{pill.label}</span>
                                        <span className="text-[14px] leading-none">×</span>
                                    </button>
                                ))}
                                <button type="button" onClick={clearFilters} className="ml-1 text-[11px] font-semibold text-palette-sdark hover:text-palette-dark">Limpiar todos</button>
                            </div>
                        )}

                        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/40 px-6 py-4 sm:px-8">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {filterParams?.map((category, arrayIndex) => {
                                    const isBrands = category.type?.toLowerCase().includes('marca');
                                    const sectionKey = isBrands ? 'Marcas' : 'Categorias';
                                    const isOpen = openSections[sectionKey];
                                    let elements = category.elements || [];

                                    if (isBrands && brandSearch.trim()) {
                                        const query = brandSearch.trim().toLowerCase();
                                        elements = elements.filter((item) => item.name?.toLowerCase().includes(query));
                                    }

                                    if (isBrands && !showAllBrands) elements = elements.slice(0, 16);

                                    return (
                                        <section key={category.type} className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
                                            <button
                                                type="button"
                                                onClick={() => toggleSection(sectionKey)}
                                                className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-palette-slighter text-sm font-bold text-palette-sdark">{isBrands ? '✿' : '◇'}</span>
                                                    <h3 className="text-[15px] font-bold text-slate-900">{category.type} <span className="font-normal text-slate-400">({category.elements?.length || 0})</span></h3>
                                                </div>
                                                <span className="text-sm font-bold text-palette-sdark">{isOpen ? '⌃' : '⌄'}</span>
                                            </button>

                                            {isOpen && (
                                                <div className="px-4 pb-4">
                                                    {isBrands && (
                                                        <input
                                                            type="search"
                                                            value={brandSearch}
                                                            onChange={(e) => setBrandSearch(e.target.value)}
                                                            placeholder="Buscar marca..."
                                                            className="mb-3 h-9 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-palette-sdark focus:bg-white focus:ring-palette-sdark"
                                                        />
                                                    )}

                                                    <div className={isBrands ? "grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4" : "grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 xl:grid-cols-4"}>
                                                        {elements.map((subcategory, index) => {
                                                            const value = String(subcategory.id);
                                                            const checked = queryParameters[arrayIndex]?.includes(value);
                                                            return (
                                                                <label key={subcategory.id || index} className="inline-flex min-w-0 cursor-pointer items-center text-[11px] leading-5 text-slate-700 sm:text-xs">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox h-4 w-4 flex-shrink-0 rounded border-slate-300 text-palette-sdark focus:ring-palette-sdark"
                                                                        checked={checked}
                                                                        onChange={() => toggleValue(value, arrayIndex)}
                                                                    />
                                                                    <span className="ml-2 truncate" title={subcategory.name}>{subcategory.name}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>

                                                    {isBrands && (category.elements?.length || 0) > 16 && !brandSearch.trim() && (
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

                        <div className="flex-shrink-0 border-t border-slate-200 bg-white px-6 py-3 sm:px-8">
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                {columnList && (
                                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                                        <span className="font-semibold text-slate-700">Ordenar por</span>
                                        <select className="h-9 min-w-[180px] rounded-xl border-slate-200 text-xs text-slate-700 focus:border-palette-sdark focus:ring-palette-sdark" value={selectedOrderCol} onChange={(e) => setSelectedOrderCol(e.target.value)}>
                                            {columnList.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                                        </select>
                                        <label className="flex items-center"><input type="radio" className="form-radio text-palette-sdark" name="order" checked={!ascOrder} onChange={() => setAscOrder(false)} /><span className="ml-1.5">Mayor a menor</span></label>
                                        <label className="flex items-center"><input type="radio" className="form-radio text-palette-sdark" name="order" checked={ascOrder} onChange={() => setAscOrder(true)} /><span className="ml-1.5">Menor a mayor</span></label>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 sm:gap-3">
                                    <button type="button" onClick={clearFilters} className="h-9 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">Limpiar filtros</button>
                                    <button type="button" onClick={applyFilters} className="h-9 rounded-xl bg-palette-sdark px-5 text-xs font-bold text-white shadow-sm transition hover:bg-palette-dark">Aplicar filtros</button>
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
