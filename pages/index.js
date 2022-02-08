import ProductListings from '@/components/products/ProductListings'
import {getProducts} from "../services/productService";
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';

function IndexPage({products, brands}) {
  return (
      <>
        <div className="flex">
            <Carrusel/>
        </div>

        <ProductListings products={products} brands={brands}/>
     </>
  )
}

export async function getServerSideProps() {
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
