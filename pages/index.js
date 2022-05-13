import ProductListings from '@/components/products/ProductListings'
import {getProducts} from "../services/productService";
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'


function IndexPage({products, brands, categories}) {
  return (
      <>
          <div className='bg-white'>
            <div className="h-screen max-h-full">
              <Carrusel/>
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
