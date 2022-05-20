import ProductListings from '@/components/products/ProductListings'
import {getProducts} from "../services/productService";
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import Banner from '@/components/products/ProductBanner.js';


function IndexPage({products, brands, categories}) {
  return (
      <>
          <div className='bg-white'>
            <div className="h-full overflow-hidden shadow-lg max-h-full">
              <Carrusel/>
            </div>
            <div className="w-full h-full">
              <div className='flex justify-center'>
                <Banner/>
              </div>
            </div>
            <ProductListings products={products} brands={brands} categories={categories}/>
          </div>
     </>
  )
}

export async function getServerSideProps() {
  const products = await getProducts();
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();

  return {
    props: {
      products,
      brands, 
      categories,
    },
  }
}

export default IndexPage
