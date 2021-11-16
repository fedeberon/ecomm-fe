import ProductListings from '@/components/products/ProductListings'
import {getProducts} from "../services/productService";
import Carrusel from "@/components/Carrusel";

function IndexPage({ products }) {
  return (
    <div className="mx-auto max-w-full">
        <div className="flex justify-center">
            <Carrusel/>
        </div>

        <ProductListings products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products
    },
  }
}

export default IndexPage
