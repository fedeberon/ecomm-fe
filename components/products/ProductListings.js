import ProductCard from '@/components/products/ProductCard'
import FilterModal from '@/components/filter/FilterModal'
import { useEffect, useState } from "react";
import { searchList } from "../../services/productService"

function ProductListings({ brands, categories }) {
    const [isLoading, setIsLoading] = useState(false);
    const [termToSearch, setTermToSearch] = useState("");
    const [categoriesToSearch, setCategoriesToSearch] = useState([]);
    const [brandsToSearch, setBrandsToSearch] = useState([]);
    const [orderBy, setOrderBy] = useState("");
    const [asc, setAsc] = useState(true);
    
    const [triggerSearch, setTriggerSearch] = useState(true);

    const [productsToShow, setProductsToShow] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    
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

    function backToTopButton() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Function to perform the initial search
    const initialSearch = async (query) => {
        if (query) {
            setInitParams(query)
            const result = await searchList(query[0], query[1][0], query[1][1], query[2], query[3] === "T", 1); // Fetch the first page
            if (result.totalPages > 0) {
                setTotalPages(result.totalPages);
                setProductsToShow(result.content);
            }else{
                setTotalPages(0);
                setProductsToShow([])
            }
        }
    }

    //Set the initial parameters for the search. This will change any time something is modified in the filter
    function setInitParams(query){
        setPage(1);
        setTermToSearch(query[0]);
        setCategoriesToSearch(query[1][0] || []);
        setBrandsToSearch(query[1][1] || []);
        setOrderBy(query[2]);
        setAsc(query[3] === "T");
    }

    // Function to fetch additional pages
    const fetchData = async () => {
        console.log(page, totalPages)
        if (page < totalPages) {
            setIsLoading(true);
            setPage(page + 1); 
            const result = await searchList(termToSearch, categoriesToSearch, brandsToSearch, orderBy, asc, page + 1); // Fetch the next page
            setProductsToShow([...productsToShow, ...result.content]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("Effected")
        fetchData();
    }, [triggerSearch]);

    let handleScroll = async (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 > e.target.documentElement.scrollHeight && !isLoading ) {
            setTriggerSearch((prevTriggerSearch) => {
                console.log("Scrolled", !prevTriggerSearch);
                return !prevTriggerSearch;
            });
        }
    }

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
