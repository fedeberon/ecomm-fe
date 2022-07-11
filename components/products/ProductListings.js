import ProductCard from '@/components/products/ProductCard'
import {useEffect, useState} from "react";
import {filterProductsByBrands, filterProductsByCategories, getProducts, getProductsByType, search} from "../../services/productService"
import BrandSearch from '../brands/BrandSearch';
import CategorySearch from '../filter/CategorySearch';
import Loading from "@/components/utils/Loading";

function ProductListings({ products, brands, categories, type}) {

  const [filter, isShowFilter] = useState(false)
  const [productsToShow, setProductsToShow] = useState(products)
  const [brandsToSearch, setBrandsToSearch] = useState([]);
  const [categoriesToSearch, setCategoriesToSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let page = 1;

  
  let handleScroll = async (e) => {
      if(window.innerHeight + e.target.documentElement.scrollTop + 1  >= e.target.documentElement.scrollHeight && !isLoading) {
          const products = await getProducts(page++)
          page = page + 1;
          if(products.last===false){
            setIsLoading(true)
            if (type === "all") { 
                let product = await getProducts(page);
                setProductsToShow(productsToShow => [
                    ...productsToShow.concat (product.content)
                ]);
            } else {
                let product = await getProductsByType(type);
                setProductsToShow(product);
            }
            setIsLoading(false)
          }
    }
  }

  useEffect( ()  => {
      window.addEventListener('scroll', handleScroll);
  }, [products])

  const close = () => {
    isShowFilter(false)
  }

  const open = () => {
    isShowFilter(!filter)
  }

  const handleChangeBrand = (e) => {

      if(e.target.checked) {
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
    setProductsToShow(products);
    close();
  }

  const handleChangeCategory = (e) => {

    if(e.target.checked) {
      
        setCategoriesToSearch(categoriesToSearch =>  [
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

  const searchValue = async (e) => {
    if(e.target.value.trim() === '') {
      return;
    }   
    const result = await search(e.target.value);
    if(result.length == 0) {
        setProductsToShow(products);
        return;
    }
    setProductsToShow(result); 
  } 

  const searchAll = () => {
    searchCategories(); 
    searchBrands();
  }


   return (
          <div className='w-full'>
                <div>
                    <div className='flex justify-center py-2'>
                        <div className='justify-between m-4'>
                            <button className="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold
                                            uppercase
                                            text-xl
                                            p-6
                                            rounded-xl
                                            shadow-lg shadow-indigo-500/50
                                            outline-none
                                            focus:outline-none
                                            ease-linear
                                            transition-all
                                            duration-150"
                                            type="button"
                                            onClick={open}>
                            {filter ? "Cerrar" : "Filtros" }
                            </button>
                        </div>


                        <input type="search"
                            className="w-2/3 m-3 text-2xl bg-purple-200 shadow-lg shadow-indigo-500/50 outline-none rounded-xl p-6"
                            placeholder="Buscar"
                            onChange={searchValue}/>
                      </div>
                    <div className={`fixed z-50  top-0 w-full left-0 ${filter ? "" : "hidden"}  `} id="modal">
                        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div onClick={close} className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-700 opacity-75"/>
                            </div>
                                <span className=" sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                            <div className="w-auto inline-block bg-white  rounded-lg text-left  shadow-xl transform transition-all my-8 align-middle"
                              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                <div className=' absolute mt-20 w-full border-b-2 border-indigo-100 '></div>
                                <div className="flex grid-cols-2 m-auto px-4 pt-6 pb-2 sm:p-6 sm:pb-4">
                                    <CategorySearch categories={categories} onclick={handleChangeCategory}/>
                                    <BrandSearch brands={brands} onclick={handleChangeBrand}/>
                                </div>

                                <div class="p-3  mt-2 text-center space-x-4 md:block">
                                  <button class="mb-2 md:mb-0 bg-red-500 border border-black-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:text-white rounded-full hover:shadow-lg hover:bg-red-700" onClick={close}>Cerrar</button>
                                  <button class="mb-2 md:mb-0 bg-red-500 border border-black-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:text-white rounded-full hover:shadow-lg hover:bg-red-700" onClick={searchAll}>Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


              <div className="mx-auto w-11/12">
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-4 ">
                      {
                          productsToShow
                          ?
                          productsToShow.map((product, index) => (
                              <ProductCard key={index} product={product} />
                          ))
                          :
                          <></>
                      }
                  </div>
              </div>

              {
                        isLoading 
                        ?
                        <div className='flex items-center justify-center py-6'>
                            <div className='w-16 h-16 border-b-2 border-purple-900 rounded-full animate-spin'></div>
                        </div> 
                        : 
                       <></>
              }

          </div>
  )
}

export default ProductListings
