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

    const initialSearch = async (query) => {
        if (query) {
            setInitParams(query);
            const result = await searchList(query[0], query[1][0], query[1][1], query[2], query[3] === "T", 1);
            if (result.totalPages > 0) {
                setTotalPages(result.totalPages);
                setProductsToShow(result.content);
            } else {
                setTotalPages(0);
                setProductsToShow([]);
            }
        }
    }

    function setInitParams(query){
        setPage(1);
        setTermToSearch(query[0]);
        setCategoriesToSearch(query[1][0] || []);
        setBrandsToSearch(query[1][1] || []);
        setOrderBy(query[2]);
        setAsc(query[3] === "T");
    }

    const fetchNextPage = async () => {
        if (page < totalPages) {
            setIsLoading(true);
            setPage(page + 1);
            const result = await searchList(termToSearch, categoriesToSearch, brandsToSearch, orderBy, asc, page + 1);
            setProductsToShow([...productsToShow, ...result.content]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNextPage();
    }, [triggerSearch]);

    useEffect(() => {
        const handleScroll = (e) => {
            if (window.innerHeight + e.target.documentElement.scrollTop + 1 > e.target.documentElement.scrollHeight && !isLoading) {
                setTriggerSearch((prev) => !prev);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, page, totalPages]);

    return (
        <section className="w-full bg-gray-50 pb-6">
            <div className="sticky top-[61px] z-40 w-full bg-gray-50/95 border-b border-gray-200 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        <FilterModal
                            filterParams={filterParams}
                            searchFunction={initialSearch}
                            columnList={columnList}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Productos destacados</h2>
                    <p className="text-sm text-gray-500 mt-1">Encontrá lo que necesitás y compará opciones fácilmente.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                    {productsToShow.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {!isLoading && productsToShow.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500">
                        No encontramos productos para esta búsqueda.
                    </div>
                )}

                {isLoading && (
                    <div className='flex items-center justify-center py-8'>
                        <div className='w-10 h-10 border-2 border-gray-200 border-t-palette-secondary rounded-full animate-spin'></div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductListings;
