import ProductCard from '@/components/products/ProductCard'
import {useEffect, useState} from "react";
import FilterComponent from '../filter/FilterComponent';
import {search} from "../../services/productService"
import BrandList from '../brands/BrandList';
import BrandSearch from '../brands/BrandSearch';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faWindowClose} from "@fortawesome/free-solid-svg-icons";


function ProductListings({ products, brands }) {

  const [filter, isShowFilter] = useState(false)
  const [productsToShow, setProductsToShow] = useState(products)
  
  useEffect(() => {
    setProductsToShow(products)
  }, products);
  

  const close = () => {
    isShowFilter(false)
  }

  const open = () => {
    isShowFilter(!filter)
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
          <>
                  <button className="text-purple-500
                                    bg-transparent
                                    border border-solid border-purple-500
                                    hover:bg-purple-500 hover:text-white
                                    active:bg-purple-600
                                    font-bold
                                    uppercase
                                    text-xs
                                    px-4
                                    py-2
                                    ml-24
                                    mt-4
                                    mb-4
                                    rounded-full
                                    outline-none
                                    focus:outline-none
                                    mr-1
                                    mb-1
                                    ease-linear
                                    transition-all
                                    duration-150"
                                    type="button"
                                    onClick={open}>
                      {filter ? "Cerrar" : "Filtros" }
              </button>

              <input type="search"
                     className="w-2/3 ml-12 bg-purple-white shadow rounded border-0 p-3"
                     placeholder="Buscar"
                     onChange={searchValue}/>


              <>
                  <div className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${filter ? "" : "hidden"}  `} id="modal">

                      <div
                          className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div className="fixed inset-0 transition-opacity">
                              <div className="absolute inset-0 bg-gray-700 opacity-75"/>
                          </div>
                          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                          <div
                              className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                              <div className="bg-white px-4 pt-6 pb-2 sm:p-6 sm:pb-4">
                                  <button className="absolute top-0 right-0 h-19 w-6" >
                                      <FontAwesomeIcon icon={faWindowClose} className="w-5" onClick={()=>close()}/>
                                  </button>
                                  <BrandSearch brands={brands}/>
                              </div>

                              <div class="flex justify-end pt-2 pb-2 pr-2">
                                  <button class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2" onClick={close}>Cerrar</button>
                                  <button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Buscar</button>
                              </div>

                          </div>
                      </div>
                  </div>
              </>


              <div className="mx-auto max-w-6xl">
                  <div className={`grid grid-cols-3`}>
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
          </>
  )
}

export default ProductListings
