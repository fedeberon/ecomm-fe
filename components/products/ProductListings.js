import ProductCard from '@/components/products/ProductCard'
import FilterModal from '@/components/filter/FilterModal'
import { useEffect, useState } from "react";
import { filterProductsByBrands, filterProductsByCategories, getProducts, search } from "../../services/productService"

function ProductListings({ brands, categories }) {
    const [isLoading, setIsLoading] = useState(false);
    const [productsToShow, setProductsToShow] = useState([])
    const [page, setPage] = useState(0);

    //A ELIMINAR - SEARCHALL DEBERA REEMPLAZARLO
    const searchBrands = async () => {
        const products = await filterProductsByBrands(brandsToSearch)
        setProductsToShow(products);
        close();
    }
    
    //A ELIMINAR - SEARCHALL DEBERA REEMPLAZARLO
    const searchCategories = async () => {
        const products = await filterProductsByCategories(categoriesToSearch)
        setProductsToShow(products)
        close();
    }

    //A ELIMINAR - SEARCHALL DEBERA REEMPLAZARLO
    const searchValue = (valor) => {
        search(valor).then((result) => {
            setProductsToShow(result);
        });
    }

    //SERA LA UNICA FUNCION PARA BUSQUEDA PARA PRODUCTOS
    //LA FUNCION ESPECIFICA DE BUSQUEDA DEBERA SER PASADA COMO PARAMETRO PARA FILTERMODAL...
    const searchAll = () => {
        searchCategories();
        searchBrands();
    }

    //PROPIA DE PRODUCTLISTINGS
    function backToTopButton() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    //PROPIA DE PRODUCTLISTINGS
    let handleScroll = async (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 > e.target.documentElement.scrollHeight && !isLoading) {
            if (brandsToSearch.length > 0) {
                let product = await filterProductsByBrands(brandsToSearch)
                setProductsToShow(product);
            } else if (categoriesToSearch.length > 0) {
                let product = await filterProductsByCategories(categoriesToSearch)
                setProductsToShow(product)
            } else if (document.getElementById("search").value !== '') {
                return;
            } else {
                setIsLoading(true)
                let result = await getProducts(page + 1);
                console.log("page", page)
                setPage(page + 1);
                setProductsToShow(productsToShow => [
                    ...productsToShow.concat(result.content)
                ]);
            }
            setIsLoading(false)
        }
    }

    //PROPIA DE PRODUCTLISTINGS
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return (() => { window.removeEventListener('scroll', handleScroll) });
    }, [handleScroll])

    return (        
        <div className='w-full'>
            <FilterModal 
                clasifications={[brands, categories]} 
                searchFunction={searchAll}>
            </FilterModal>
            <div className="mx-auto mt-3 w-11/12">
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-4 ">
                    {
                        productsToShow.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>

                <button type="button" data-mdb-ripple="true" onClick={backToTopButton} data-mdb-ripple-color="light" className="z-0 -mx-9 md:-mx-7 shadow-lg invisible md:visible ease-out duration-500 sticky p-2 bg-palette-secondary animate-bounce text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-palette-sdark hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bottom-5 right-2" id="btn-back-to-top">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
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

export default ProductListings
