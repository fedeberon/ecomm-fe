import ProductCard from '@/components/products/ProductCard'
import {useEffect, useState} from "react";
import FilterComponent from '../filter/FilterComponent';
import {filterProductsByBrands, search} from "../../services/productService"
import BrandList from '../brands/BrandList';
import BrandSearch from '../brands/BrandSearch';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faWindowClose} from "@fortawesome/free-solid-svg-icons";


function ProductListings({ products, brands }) {

  const [filter, isShowFilter] = useState(false)
  const [productsToShow, setProductsToShow] = useState(products)
  const [brandsToSearch, setBrandsToSearch] = useState([]);



  useEffect(() => {
    setProductsToShow(products)
  }, products);
  

  const close = () => {
    isShowFilter(false)
  }

  const open = () => {
    isShowFilter(!filter)
  }

  const handleChangeBrand = (e) => {
      debugger
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
  
   return (
          <div className=''>
                <div>
                    <div className='flex justify-center py-2'>    
                        <div className='justify-between m-4'>
                            <button className="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold 
                                            uppercase 
                                            text-xs
                                            p-4
                                            rounded-full
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
                            className="w-2/3 m-3 bg-gray-100 shadow-lg shadow-indigo-500/50 outline-none rounded-full p-3"
                            placeholder="Buscar"
                            onChange={searchValue}/>
                        
                    </div>
                    <div className={`fixed z-50 overflow-y-auto top-0 w-full left-0 ${filter ? "" : "hidden"}  `} id="modal">
                        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-700 opacity-75"/>
                            </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                            <div className="inline-block  bg-white overflow-y-auto rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg "
                              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                <div className="grid gap-4 px-4 pt-6 pb-2 sm:p-6 sm:pb-4">
                                  <BrandSearch brands={brands} onclick={handleChangeBrand}/>
                                </div>

                                <div class="flex justify-end pt-2 pb-2 pr-2">
                                  <button class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" onClick={close}>Cerrar</button>
                                  <button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400" onClick={searchBrands}>Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


              <div className="mx-auto max-w-6xl">
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-40 ">
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
          </div>
  )
}

export default ProductListings
