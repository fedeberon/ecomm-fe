import { useEffect, useState } from "react";
import { debounce } from 'lodash';

function FilterModal({ filterParams, searchFunction, columnList }) {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedOrderCol, setSelectedOrderCol] = useState(columnList[0].value);
    const [ascOrder, setAscOrder] = useState(false);
    const [queryParameters, setQueryParameters] = useState(new Array(filterParams.length).fill([]));
    const [searchTerm, setSearchTerm] = useState('');
    const customParams = [searchTerm, queryParameters, selectedOrderCol, ascOrder ? "T" : "F"];

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

    function searchButton() {
        setShowFilter(false);
        searchFunction([...customParams]);
    }

    useEffect(() => {
        const debouncedSearch = debounce(searchFunction, 500);
        debouncedSearch(customParams);
        return () => debouncedSearch.cancel();
    }, [searchTerm]);

    return (
        <div className="w-full bg-white py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-stretch gap-3 p-3 rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <button
                        className="sm:w-auto px-5 h-11 rounded-xl bg-palette-sdark hover:bg-palette-dark text-white text-sm font-bold transition-colors"
                        type="button"
                        onClick={() => setShowFilter(true)}
                    >
                        Filtros
                    </button>

                    <input
                        className="flex-1 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:bg-white focus:border-palette-sdark focus:ring-1 focus:ring-palette-sdark transition-all"
                        placeholder="Buscar productos"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoComplete="off"
                    />
                </div>
            </div>

            <div className={`fixed z-50 top-0 w-full left-0 ${showFilter ? "" : "hidden"}`} id="modal">
                <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center">
                    <div onClick={() => setShowFilter(false)} className="fixed inset-0 bg-gray-800 bg-opacity-70" />

                    <div className="relative z-10 w-full max-w-4xl max-h-screen overflow-y-auto bg-white rounded-2xl text-left shadow-2xl">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-5">Filtrar productos</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filterParams?.map((category, arrayIndex) => (
                                    <div key={category.type} className="rounded-xl border border-gray-100 p-4">
                                        <h3 className="text-lg font-bold text-gray-800 mb-3">{category.type}</h3>
                                        <div className={category.column
                                            ? "overflow-y-auto max-h-64 no-scrollbar space-y-2"
                                            : "overflow-y-auto max-h-64 no-scrollbar grid grid-cols-1 sm:grid-cols-2 gap-2"
                                        }>
                                            {category.elements?.map((subcategory, index) => (
                                                <label key={index} className="inline-flex items-center text-sm text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox rounded text-palette-sdark"
                                                        onChange={(e) => handleChangeSubCat(e, arrayIndex)}
                                                        value={subcategory.id}
                                                    />
                                                    <span className="ml-2">{subcategory.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {columnList && (
                                <div className="mt-6 rounded-xl border border-gray-100 p-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-3">Ordenar por</h3>
                                    <select
                                        className="w-full rounded-xl border-gray-200 text-gray-700"
                                        id="orderBy"
                                        value={selectedOrderCol}
                                        onChange={handleChangeColumn}
                                    >
                                        {columnList.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>

                                    <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-700">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-palette-sdark"
                                                name="order"
                                                checked={!ascOrder}
                                                onChange={() => setAscOrder(false)}
                                            />
                                            <span className="ml-2">Mayor a menor</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio text-palette-sdark"
                                                name="order"
                                                checked={ascOrder}
                                                onChange={() => setAscOrder(true)}
                                            />
                                            <span className="ml-2">Menor a mayor</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
                                    onClick={() => setShowFilter(false)}
                                >
                                    Cerrar
                                </button>
                                <button
                                    className="px-5 py-2.5 rounded-xl bg-palette-sdark hover:bg-palette-dark text-white font-semibold"
                                    onClick={searchButton}
                                >
                                    Aplicar filtros
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterModal;
