import ProductListings from '@/components/products/ProductListings'
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import Banner from '@/components/products/ProductBanner.js';




function IndexPage({brands, categories}) {
  return (
      <>
          <div className='bg-white'>
            <div >
              {/* <Carrusel/>*/}
              {/*<img src="images/inicio.jpg" className="w-full h-screen"></img>*/}
            </div>
            <div className="w-full h-full">
              <div className='flex justify-center'>
                <Banner/>
              </div>
            </div>
            <ProductListings brands={brands} categories={categories}/>
          </div>
     </>
  )
}

export async function getServerSideProps() {
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();

  return {
    props: {
      brands,
      categories,
    },
  }
}

export default IndexPage
