import StoreHeading from '@/components/StoreHeading'
import ProductListings from '@/components/ProductListings'
import { getAllProductsInCollection } from '@/lib/shopify'
import {getProducts} from "../services/productService";

function IndexPage({ products }) {

  return (
    <div className="mx-auto max-w-6xl">
      <StoreHeading />
      <ProductListings products={products} />      
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  return {
    props: {
      products
    },
  }
}

export default IndexPage
