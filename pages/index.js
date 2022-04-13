import ProductListings from '@/components/products/ProductListings'
import {getProducts} from "../services/productService";
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'


function IndexPage({products, brands, categories}) {
  return (
      <>
        <div className='bg-blue-100 lg:px-6'>
          <div className='bg-white'>
            <div className="flex container mx-auto min-h-full">
              <Carrusel/>
            </div>
            <ProductListings products={products} brands={brands} categories={categories}/>
          </div>
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
