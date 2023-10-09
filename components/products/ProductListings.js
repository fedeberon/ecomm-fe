import ProductCard from '@/components/products/ProductCard'
import FilterModal from '@/components/filter/FilterModal'
import { useEffect, useState, useRef } from "react";
import { searchList } from "../../services/productService"

function ProductListings({ brands, categories, initialSearch }) {
    //Control de pagina
    const productListRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);          //Indica si esta cargando nuevos productos
    const [scrolling, setScrolling] = useState(false)          //Indica si se esta scrolleando ahora o no

    //Obtiene todos los parametros, posee parametros por defecto
    const [q, setQ] = useState();

    //Carga los productos y el total de paginas                             
    const [results, setResults] = useState({
        products: initialSearch.content,
        totalPages: initialSearch.totalPages
    });

    const [productsToShow, setProductsToShow] = useState(initialSearch.content);    //Muestra los productos obtenidos
    const [page, setPage] = useState(0);                                            //Pagina actual

    const columnList = [
        { value: 'sales', label: 'Popularidad' },
        { value: 'price', label: 'Precio' },
        { value: 'stock', label: 'Stock' },
        { value: 'name', label: 'Nombre' },
    ];

    const filterParams = [
        { type: "Categorias", elements: categories, column: true },
        { type: "Marcas", elements: brands, column: false }
    ];

    //Vuelve al inicio de la pantalla
    function backToTopButton() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    //NUEVA BUSQUEDA
    //======================================================================================================

    //A - Añade el listener de scroll a la pagina
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (() => { window.removeEventListener('scroll', handleScroll) });
    }, []);

    //1 - Obtiene los parametros de la nueva busqueda
    const search = async (query) => {
        await setQ(query);
    }

    //2 - Si hay consulta nueva, busca los resultados y los coloca en results.
    useEffect(async () => {
        if (q) {
            const newData = await searchList(0, q.term, q.params[0], q.params[1], q.orderBy, q.asc == "T" ? true : false);
            await setResults({
                products: newData.content,
                totalPages: newData.totalPages
            });
            await setPage(0);
        }
    }, [q]);

    //3 - Genera la lista de productos nueva desde cero
    useEffect(() => {
        setProductsToShow(results.products);
    }, [results])

    //------------------------------------- SCROLLING -------------------------------------

    //1 - Inicia el scrolling
    const handleScroll = async (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 > e.target.documentElement.scrollHeight && !isLoading) {
            await setScrolling(true);
        }
    }

    //2 - Añade una pagina mas para scrollear (si se hizo scroll)
    useEffect(() => {
        if (scrolling) {
            if (page < results.totalPages) setPage((prevPage) => prevPage + 1);
        }
    }, [scrolling]);

    //3 - Si esta haciendo scroll trae mas resultados y los añade a la lista de productos a mostrar.
    useEffect(() => {
        console.log("Pag.:", page, "; Total pag.: ", results.totalPages)
        if (scrolling) {
            setIsLoading(true);
            (async () => {
                if (page !== 0) {
                    const newResults = q ?
                        await searchList(page, q.term, q.params[0], q.params[1], q.orderBy, q.asc == "T" ? true : false)
                        :
                        await searchList(page, "", [], [], "sales", false);
                    const products = [...productsToShow, ...newResults.content];
                    setProductsToShow(products);
                }
            })();
            setScrolling(false);
            setIsLoading(false);
        }
    }, [page]);

    useEffect(()=>{
        productListRef.current.scrollIntoView({
            behavior: "smooth", block: "start", offsetTop: -50
        });
    },[results.totalPages])

    return (
        
        <div  className='w-full'>
            <div ref={productListRef}></div>
            <FilterModal
                filterParams={filterParams}
                searchFunction={search}
                columnList={columnList}
            ></FilterModal>
            <div className="mx-auto mt-3 w-11/12">
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-4 ">
                    {
                        productsToShow.map((product, index) => {
                            return <ProductCard key={index} product={product} />;
                        })
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
