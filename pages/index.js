import ProductListings from '@/components/products/ProductListings'
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import * as productService from 'services/productService'
import Banner from '@/components/products/ProductBanner.js';

function IndexPage({brands, categories, initialSearch}) {
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
            <ProductListings brands={brands} categories={categories} initialSearch={initialSearch}/>
          </div>
     </>
  )
}

export async function getServerSideProps() {
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();
  const initialSearch = await productService.searchList();

  return {
    props: {
      brands,
      categories,
      initialSearch,
    },
  }
}

export default IndexPage
