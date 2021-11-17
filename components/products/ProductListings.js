import ProductCard from '@/components/products/ProductCard'
import Filter from "@/components/filter";
import {useState} from "react";

function ProductListings({ products }) {
  const [filter, isShowFilter] = useState(false)

  const open = () => {
      debugger
    isShowFilter(!filter)
  }

    const close = () => {
        isShowFilter(false)
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

              <input type="search" className="w-2/3 ml-12 bg-purple-white shadow rounded border-0 p-3"
                     placeholder="Search by name..."/>

              <Filter activeClass={filter} showing={isShowFilter}/>

              <div className="py-2 max-w-6xl mx-auto grid grid-cols-1 flex w-3/4 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
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
