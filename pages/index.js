import ProductListings from '@/components/products/ProductListings'
import {getProducts} from "../services/productService";
import Carrusel from "@/components/Carrusel";
import { findAll } from 'services/brandService';

function IndexPage({ products, brands }) {
  return (
    <div className=" max-w-full">
        <div className="flex justify-center">
            <Carrusel/>
        </div>

        <ProductListings products={products}  brands={brands} />
    </div>
  )
}

export async function getServerSideProps() {
  const products = await getProducts();
  const brands = await findAll();

  return {
    props: {
      products,
      brands
    },
  }
}

export default IndexPage
