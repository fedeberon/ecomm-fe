    import ProductCard from '@/components/products/ProductCard'
    import {useEffect, useState} from "react";
    import {filterProductsByBrands, filterProductsByCategories, getProducts, search} from "../../services/productService"
    import BrandSearch from '../brands/BrandSearch';
    import CategorySearch from '../filter/CategorySearch';
    import { debounce } from 'lodash';

    function ProductListings({ brands, categories}) {

    const [filter, isShowFilter] = useState(false)
    const [brandsToSearch, setBrandsToSearch] = useState([]);
    const [categoriesToSearch, setCategoriesToSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [productsToShow, setProductsToShow] = useState([])


    const [page, setPage] = useState(0);

    const close = () => {
     isShowFilter(false)
    }

    const open = () => {
     isShowFilter(!filter)
    }

    const handleChangeBrand = (e) => {
      if (e.target.checked) {
          setBrandsToSearch(brandsToSearch =>  [
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

    const searchBrands = async () => {
        const products = await filterProductsByBrands(brandsToSearch)
        setProductsToShow([])
        setProductsToShow(products);
        close();
    }

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

    const searchCategories = async () => {
      const products =  await filterProductsByCategories(categoriesToSearch)
      setProductsToShow(products)
      close();
    }

    const searchValue =  (valor) => {
        search(valor).then((result) => {
            setProductsToShow(result);
        });
    }

    const searchAll = () => {
        searchCategories();
        searchBrands();
    }

    function backToTopButton() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    let handleScroll = async (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 1  > e.target.documentElement.scrollHeight && !isLoading) {
            if (brandsToSearch.length > 0 ) {
                let product = await filterProductsByBrands(brandsToSearch)
                setProductsToShow(product);
            } else if (categoriesToSearch.length > 0){
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
                    ...productsToShow.concat (result.content)
                ]);
            }
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const debouncedSearch = debounce(searchValue, 500); // Retraso de 500 ms

        debouncedSearch(searchTerm);

        return () => {
            debouncedSearch.cancel(); // Cancela la ejecución del debouncedSearch al desmontar el componente
        };
    }, [searchTerm]);

    function handleChange(event) {
        const { value } = event.target;
        setSearchTerm(value);
    }

    useEffect( ()  => {
        window.addEventListener('scroll', handleScroll);

        return(() => { window.removeEventListener('scroll', handleScroll) });
    }, [handleScroll])

        return (
          <div className='w-full'>
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
                                            onClick={open}>
                            Filtros
                            </button>
                        </div>
                        <input
                            className="w-2/3 text-palette-secondary border border-solid border-palette-secondary placeholder-palette-slighter font-semibold text-xl p-2 my-auto rounded-xl shadow-lg shadow-indigo-500/50 outline-none transition-all"
                            placeholder="Buscar"
                            id="search"
                            value={searchTerm}
                            onChange={handleChange}
                            autoComplete="off"/>
                    </div>
                    <div className={`fixed z-50  top-0 w-full left-0 ${filter ? "" : "hidden"}  `} id="modal">
                        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div onClick={close} className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-700 opacity-75"/>
                            </div>
                                <span className=" sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                            <div className="w-auto inline-block bg-white  rounded-lg text-left  shadow-xl transform transition-all my-8 align-middle"
                              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                <div className='absolute mt-20 w-full border-b-2 border-indigo-100 '></div>
                                <div className="flex grid-cols-2 m-auto px-4 pt-6 pb-2 sm:p-6 sm:pb-4">
                                    <CategorySearch categories={categories} onclick={handleChangeCategory}/>
                                    <BrandSearch brands={brands} onclick={handleChangeBrand}/>
                                </div>

                                <div className="p-3  mt-2 text-center space-x-4 md:block">
                                  <button className="mb-2 md:mb-0 bg-palette-slight border border-black-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:text-white rounded-full hover:shadow-lg hover:bg-palette-secondary" onClick={close}>Cerrar</button>
                                  <button className="mb-2 md:mb-0 bg-palette-slight border-black-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:text-white rounded-full hover:shadow-lg hover:bg-palette-secondary" onClick={searchAll}>Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


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
