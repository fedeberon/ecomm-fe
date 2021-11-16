import ProductCard from '@/components/products/ProductCard'
import Filter from "@/components/filter";
import {useState} from "react";

function ProductListings({ products }) {
  const [filter, isShowFilter] = useState(true)

  const open = () => {
      debugger
    isShowFilter(!filter)
  }

    const close = () => {
        isShowFilter(false)
    }

  return (
          <>
            <button onClick={open}>Filtros</button>
              <div className="relative absolute min-h-screen md:flex w-1/4  z-10">
                  <div className={`sidebar   top-10 rounded-xl bg-white shadow-lg py-3 pl-3
                    inset-y-0 left-0 transform -translate-x-full  transition duration-200 ease-in-out
                      ${filter ? "md:relative md:translate-x-0" : "" }`}>


                      <div className="h-full flex flex-col justify-between">
                          <img className="px-5 pt-3 mx-auto mb-10" src="https://v1.tailwindcss.com/_next/static/media/tailwindcss-logotype.5d127e1d767d06efa2b03fe4de5f3d84.svg" />

                          <div className="hover:overflow-auto overflow-hidden">
                              <div className="mb-10">
                                  <div className="text-sm text-gray-500">Overview</div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Overview</span>
                                  </div>
                              </div>

                              <div className="mb-10">
                                  <div className="text-sm text-gray-500">Header 1</div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 1</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 2</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 3</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 4</span>
                                  </div>
                              </div>

                              <div className="mb-10">
                                  <div className="text-sm text-gray-500">Header 2</div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 1</span>
                                  </div>
                              </div>

                              <div className="mb-10">
                                  <div className="text-sm text-gray-500">Header 3</div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 1</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 2</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 3</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 4</span>
                                  </div>
                              </div>

                              <div className="mb-10">
                                  <div className="text-sm text-gray-500">Header 4</div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 1</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 2</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 3</span>
                                  </div>
                                  <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                      <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                      <span className="text-gray-500">Menu 4</span>
                                  </div>
                              </div>
                          </div>

                          <div className="mt-10">
                              <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                  <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                  <span className="text-gray-500">Account Mgnt</span>
                              </div>
                          </div>

                          <div className="mt-6">
                              <div className="flex items-center cursor-pointer">
                                  <i className="animate-pulse h-5 w-5 rounded-full bg-gray-300 mr-2"></i>
                                  <span className="text-gray-500 truncate">Firstname Lastname</span>
                                  <i className="animate-pulse h-5 w-1 bg-gray-300 mx-3"></i>
                              </div>
                          </div>
                          <div className="flex justify-end mt-2">
                              <button onClick={close} className="text-green-500 font-bold bg-gray-200 px-3 py-1 rounded-full  text-right mr-3 cursor-pointer"> Cerrar </button>
                          </div>
                      </div>
                  </div>



              </div>


            <div className="py-12 w-3/4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
              {
                products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))
              }
            </div>
          </>
  )
}

export default ProductListings
