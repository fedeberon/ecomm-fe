import ProductCard from '@/components/products/ProductCard'
import FilterModal from '@/components/filter/FilterModal'
import { useEffect, useState } from "react";
import { searchList } from "../../services/productService"

function ProductListings({ brands, categories }) {
    const [isLoading, setIsLoading] = useState(false);
    //Parametros de busqueda
    const [termToSearch, setTermToSearch] = useState("");
    const [categoriesToSearch, setCategoriesToSearch] = useState([]);
    const [brandsToSearch, setBrandsToSearch] = useState([]);
    const [orderBy, setOrderBy] = useState("");
    const [asc, setAsc] = useState(true);

    const [results, setResults] = useState(null);               //Carga lo obtenido desde el endpoint
    const [productsToShow, setProductsToShow] = useState([]);   //Contiene los productos a mostrar
    const [page, setPage] = useState(0);                        //Pagina actual
    const [totalPages, setTotalPages] = useState(0);            //Total de paginas

    const columnList = [
        { value: 'sales', label: 'Popularidad' },
        { value: 'price', label: 'Precio' },
        { value: 'stock', label: 'Stock' },
        { value: 'name', label: 'Nombre' },
    ];

    const filterParams = [
        { "type": "Categorias", "elements": categories, "column": true },
        { "type": "Marcas", "elements": brands, "column": false }
    ];

    //Vuelve al inicio de la pantalla
    function backToTopButton() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    //1 - Configura una nueva busqueda.
    const initialSearch = async (q) => {
        //Obtiene resultados de la busqueda hecha desde cero (se recarga desde 1er pagina).
        setResults(q ? await searchList(q[0], q[1][0], q[1][1], q[2], q[3] === "T", 1) : await searchList());
        //Se guardan los parametros de esta busqueda para despues obtener nuevas paginas.
        setInitParams(q)
    }

    //2 - Cuando haya resultados nuevos, cambia las paginas. Sino las deja como estan...
    useEffect(() => {
        if (results != null) {
            setProductsToShow(results.content)
        }
    }, [results]);

    

    //3 - Indica los parametros para la primer pagina y para las subsecuentes cada vez que hay cambios en el fitro o se hace clic en Buscar.
    function setInitParams(q) {
        if (q) {
            setTermToSearch(q[0]);
            setCategoriesToSearch(q[1][0] || []);
            setBrandsToSearch(q[1][1] || []);
            setOrderBy(q[2]);
            setAsc(q[3] === "T");
        }
    }

    // 4 - Tras ello, configuramos la pagina inicial
    useEffect(() => {
        //Si hay paginas para cargar, vamos a la 1era, de lo contrario no hay paginas.
        if (totalPages > 0) {
            setPage(1);
            setProductsToShow(results.content);
        } else setPage(0);
        
    }, [totalPages]);

    // 5 - Carga la pagina indicada
    useEffect(() => {
        console.log("Pagina ", page, "; Total ", totalPages);
    
        // Define an async function to fetch data
        const fetchData = async () => {
            if (page !== 0) {
                const result = await searchList(termToSearch, categoriesToSearch, brandsToSearch, orderBy, asc, page);
                console.log(productsToShow);
    
                // Use proper conditional assignment for 'productsToShow'
                setProductsToShow((prevProducts) => {
                    if (prevProducts.length === 0) {
                        return result.content;
                    } else {
                        return [...prevProducts, ...result.content];
                    }
                });
            }
        };
    
        // Call the async function
        fetchData();
    }, [page]);
    
    //Cuando se hace scroll al fin de la pagina, carga la proxima pagina
    let handleScroll = async (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 > e.target.documentElement.scrollHeight && !isLoading) {
            console.log("CHANGE")
            if (page < totalPages) setPage((prevPage) => prevPage + 1);
            console.log(page)
        }
    }

    //Añade el listener de scroll a la pagina
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (() => { window.removeEventListener('scroll', handleScroll) });
    }, []);

    return (
        <div className='w-full'>
            <FilterModal
                filterParams={filterParams}
                searchFunction={initialSearch}
                columnList={columnList}
            ></FilterModal>
            <div className="mx-auto mt-3 w-11/12">
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-4 ">
                    {
                        productsToShow.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>
                <button
                    type="button"
                    data-mdb-ripple="true"
                    onClick={backToTopButton}
                    data-mdb-ripple-color="light"
                    className="z-0 -mx-9 md:-mx-7 shadow-lg invisible md:visible ease-out duration-500 sticky p-2 bg-palette-secondary animate-bounce text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-palette-sdark hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bottom-5 right-2"
                    id="btn-back-to-top"
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        className="w-5 h-5"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="currentColor"
                            d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                        ></path>
                    </svg>
                </button>
            </div>
            {
                isLoading
                    ?
                    <div className='flex items-center justify-center py-6'>
                        <div className='w-16 h-16 border-b-2 border-palette-secondary rounded-full animate-spin'></div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}

export default ProductListings;
