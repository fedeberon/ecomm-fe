import ProductCard from '@/components/products/ProductCard'
import {useEffect, useState} from "react";
import {getProductsByType} from "../../services/productService"

function ProductByCategoriesListings({ products, brands, categories, category, categoryId }) {
    const [isLoading, setIsLoading] = useState(false);

   return (
              <div className='w-full'>
                  <div className="mx-auto mt-3 w-11/12">
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-4 ">
                      {
                          products?.length >= 1
                          ?
                              products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                             ))
                          :
                          <div className=" ">No hay productos disponibles en {category}</div>
                      }
                  </div>
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

export default ProductByCategoriesListings;
