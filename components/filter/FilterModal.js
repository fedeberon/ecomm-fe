import { useEffect, useState } from "react";
import { debounce } from 'lodash';

function FilterModal({ filterParams, searchFunction, columnList }) {
    const [showFilter, setShowFilter] = useState(false);

    const [selectedOrderCol, setSelectedOrderCol] = useState(columnList[0].value);
    const [ascOrder, setAscOrder] = useState(false);
    const [queryParameters, setQueryParameters] = useState(new Array(filterParams.length).fill([]));
    const [searchTerm, setSearchTerm] = useState('');
    const customParams = [searchTerm, queryParameters, selectedOrderCol, ascOrder ? "T" : "F"];


    //Prepares the parameters for the query 
    const handleChangeSubCat = (e, index) => {
        setQueryParameters((prevQueryParameters) => {
            const updatedParameters = prevQueryParameters.map((arr, i) => {
                // If the current index matches the provided index, we create a new array.
                if (i === index) {
                    const existingIndex = arr.indexOf(e.target.value);
                    if (existingIndex !== -1) {
                        //Removes the element from the array
                        return arr.filter((_, i) => i !== existingIndex);
                    } else {
                        //Adds the element to the array
                        return [...arr, e.target.value];
                    }
                }
                // For other indices, return the original array as is.
                return arr;
            });
            return updatedParameters;
        });
    };

    //Changes the column of the table used for the search
    const handleChangeColumn = (e) => {
        setSelectedOrderCol(e.target.value);
    }

    //Executes the search function that's passed to a specific instance of this component.
    function searchButton() {
        setShowFilter(false);
        const updatedCustomParams = [...customParams];
        updatedCustomParams[0] = searchTerm;
        searchFunction(updatedCustomParams);
    }


    //Debounces the search reducing the updating time for the   
    useEffect(() => {
        const debouncedSearch = debounce(searchFunction, 500);
        debouncedSearch(customParams);
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchTerm]);

    return (
        <div className='sticky top-16 pt-4 md:top-14 md:pt-0 z-30 bg-white'>
            <div className='flex justify-center py-2 h-20 '>
                <button
                    className="justify-between my-auto mx-4 text-white  bg-palette-secondary border 
                                border-solid border-palette-secondary hover:bg-palette-slight 
                                hover:text-white active:bg-palette-slight font-bold
                                uppercase
                                text-xl
                                p-2
                                my-auto
                                rounded-xl
                                shadow-lg shadow-indigo-500/50
                                outline-none
                                focus:outline-none
                                ease-linear
                                transition-all
                                duration-150"
                    type="button"
                    onClick={() => setShowFilter(true)}>
                    Filtros
                </button>
                <input
                    className="w-2/3 text-palette-secondary border border-solid border-palette-secondary placeholder-palette-slighter font-semibold text-xl p-2 my-auto rounded-xl shadow-lg shadow-indigo-500/50 outline-none transition-all"
                    placeholder="Buscar"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off" />
            </div>
            <div className={`fixed z-50  top-0 w-full left-0 ${showFilter ? "" : "hidden"}  `} id="modal">
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div onClick={() => setShowFilter(false)} className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-700 opacity-75" />
                    </div>
                    <span className=" sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div className="w-auto inline-block bg-white  rounded-lg text-left  shadow-xl transform transition-all my-8 align-middle"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="flex grid-cols-2 m-auto px-4 pt-6 pb-2 sm:p-6 sm:pb-4">
                            {
                                filterParams
                                    ?
                                    filterParams.map((category, arrayIndex) => (
                                        <div className="flex-center col-span-2 w-auto rounded">
                                            <div className="w-auto bg-white text-sm text-palette-primary font-bold px-5 py-2">
                                                <div className="m-2 -ml-4 text-2xl">{category.type}</div>
                                            </div>
                                            <div id="menu" className={category.column ?
                                                `overflow-y-auto max-h-96 no-scrollbar`
                                                :
                                                `overflow-y-auto max-h-96 no-scrollbar lg:grid lg:grid-cols-4`}>
                                                {
                                                    category.elements
                                                        ?
                                                        category.elements.map((subcategory, index) => (
                                                            <div key={index} className=" block mt-2 px-2">
                                                                <label className="inline-flex items-center">
                                                                    <input type="checkbox"
                                                                        className="form-checkbox rounded text-red-500 "
                                                                        onChange={(e) => handleChangeSubCat(e, arrayIndex)}
                                                                        value={subcategory.id} />
                                                                    <span className="ml-2">{subcategory.name}</span>
                                                                </label>
                                                            </div>
                                                        )) : <></>
                                                }
                                            </div>
                                        </div>
                                    )) : <></>
                            }
                        </div>
                        {columnList ? (
                            <div className="flex grid-cols-2 m-auto px-4 pt-6 pb-2 sm:p-6 sm:pb-4">
                                <div className="flex flex-col col-span-2 w-auto rounded">
                                    <div className="w-auto bg-white text-sm text-palette-primary font-bold px-5 py-2 m-2 -ml-4 text-2xl">Ordenar por:</div>
                                    <select
                                        className="text-palette-primary px-5 py-2"
                                        id="orderBy"
                                        value={selectedOrderCol}
                                        onChange={handleChangeColumn}
                                    >
                                        {columnList.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="flex items-center mt-2 px-2">
                                        <input
                                            type="radio"
                                            className="form-radio rounded text-red-500"
                                            id="ascRadio"
                                            name="order"
                                            checked={!ascOrder}
                                            onChange={() => setAscOrder(false)}                                    
                                        />
                                        <span className="ml-2">Mayor a menor</span>
                                    </label>
                                    <label className="flex items-center mt-2 px-2">
                                        <input
                                            type="radio"
                                            className="form-radio rounded text-red-500"
                                            id="descRadio"
                                            name="order"
                                            checked={ascOrder}
                                            onChange={() => setAscOrder(true)}
                                        />
                                        <span className="ml-2">Menor a mayor</span>
                                    </label>
                                </div>
                            </div>
                        ) : <></>}

                        <div className="p-3  mt-2 text-center space-x-4 md:block">
                            <button className="mb-2 md:mb-0 bg-palette-slight border border-black-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:text-white rounded-full hover:shadow-lg hover:bg-palette-secondary" onClick={() => setShowFilter(false)}>Cerrar</button>
                            <button className="mb-2 md:mb-0 bg-palette-slight border-black-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:text-white rounded-full hover:shadow-lg hover:bg-palette-secondary" onClick={() => searchButton()}>Buscar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterModal;