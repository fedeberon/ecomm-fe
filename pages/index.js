import ProductListings from '@/components/products/ProductListings'
import {getProducts} from "../services/productService";
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';

function IndexPage({products, brands}) {
  return (
      <>
        <div className='bg-blue-100 lg:px-6'>
          <div className='bg-white'>
            <div className="flex container mx-auto min-h-full">
              <Carrusel/>
            </div>

            <ProductListings products={products} brands={brands}/>
          </div>
        </div>
     </>
  )
}

export async function getStaticProps() {
  const products = await getProducts();
  const brands = await brandsService.findAll();
   
  return {
    props: {
      products,
      brands, 
    },
  }
}

export default IndexPage
