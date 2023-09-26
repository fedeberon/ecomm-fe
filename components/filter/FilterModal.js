//Componente nuevo a definir a futuro
import { useEffect, useState } from "react";
//import BrandSearch from '../brands/BrandSearch';        //A ELIMINAR, SERAN UNA FUNCION PROPIA Y UNICA
//import CategorySearch from '../filter/CategorySearch';  //A ELIMINAR, SERAN UNA FUNCION PROPIA Y UNICA
import { debounce } from 'lodash';

function FilterModal({ filterParams, searchFunction }) {
    const [showFilter, setShowFilter] = useState(false)
    const [queryParameters, setQueryParameters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    //PERTENECERA A NUEVO COMPONENTE - A UNIFICAR CON SIGUIENTE
    /*
    const handleChangeBrand = (e) => {
        if (e.target.checked) {
            setBrandsToSearch(brandsToSearch => [
                ...brandsToSearch,
                {
                    "id": e.target.value
                }
            ]);
        } else {
            const brands = brandsToSearch.filter((brand) => brand.id !== e.target.value)
            setBrandsToSearch(brands);
        }
    }

    //PERTENECERA A NUEVO COMPONENTE - A UNIFICAR CON ANTERIOR
    const handleChangeCategory = (e) => {
        if (e.target.checked) {
            setCategoriesToSearch(categoriesToSearch => [
                ...categoriesToSearch,
                {
                    "id": e.target.value
                }
            ]);
        } else {
            const categories = categoriesToSearch.filter((category) => category.id !== e.target.value)
            setCategoriesToSearch(categories);
        }
    }
    */

    //REEMPLAZO A GENERAR DE LOS 2 ANTERIORES
    const handleChangeSubCat = (e) => {
        console.log("Listo, ahora como hacemo?")
    }

    //PERTENECERA A NUEVO COMPONENTE    
    function handleChangeSearch(event) {
        const { value } = event.target;
        setSearchTerm(value);
    }

    function searchButton(){
        setShowFilter(false);
        searchFunction();
    }

    //PERTENECERA A NUEVO COMPONENTE    
    useEffect(() => {
        const debouncedSearch = debounce(searchFunction, 500); // Retraso de 500 ms
        debouncedSearch(searchTerm);

        return () => {
            debouncedSearch.cancel(); // Cancela la ejecución del debouncedSearch al desmontar el componente
        };
    }, [searchTerm]);



    return (
        <div className=' sticky top-16 pt-4 md:top-14 md:pt-0 z-30 bg-white'>
            <div className='flex justify-center py-2 h-20 '>
                <div className='justify-between my-auto mx-4'>
                    <button className="text-white  bg-palette-secondary border 
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
                </div>
                <input
                    className="w-2/3 text-palette-secondary border border-solid border-palette-secondary placeholder-palette-slighter font-semibold text-xl p-2 my-auto rounded-xl shadow-lg shadow-indigo-500/50 outline-none transition-all"
                    placeholder="Buscar"
                    id="search"
                    value={searchTerm}
                    onChange={handleChangeSearch}
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
                        <div className='absolute mt-20 w-full border-b-2 border-indigo-100 '></div>
                        <div className="flex grid-cols-2 m-auto px-4 pt-6 pb-2 sm:p-6 sm:pb-4">
                            {
                                filterParams()
                                    ?
                                    filterParams().map((category, index) => (
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
                                                            <div key={index}>
                                                                <div className="block">
                                                                    <div className="mt-2 px-2">
                                                                        <label className="inline-flex items-center">
                                                                            <input type="checkbox" 
                                                                                   className="form-checkbox rounded text-red-500 " 
                                                                                   onChange={handleChangeSubCat}
                                                                                   value={subcategory.id} />
                                                                            <span className="ml-2">{subcategory.name}</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                        :
                                                        <></>
                                                }
                                            </div>
                                        </div>
                                    ))
                            :
                                    <></>
                            }
                        </div>
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