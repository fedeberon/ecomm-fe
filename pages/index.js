import ProductListings from '@/components/products/ProductListings'
import {getProducts} from "../services/productService";
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import Banner from '@/components/products/ProductBanner.js';
import bg from "../public/images/inicio.jpg"




function IndexPage({products, brands, categories}) {
  return (
      <>
          <div className='bg-palette-bg'>
               <Carrusel/>
              {/*<div className='flex justify-center'>
                <img src="images/inicio4.jpg" className='w-full h-screen'></img>
              </div>*/}
            <div className="w-full h-full ">
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
  const products = await getProducts(0);
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();

  return {
    props: {
      products: products.content,
      brands, 
      categories,
    },
  }
}

export default IndexPage
