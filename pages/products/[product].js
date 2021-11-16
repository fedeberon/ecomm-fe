import ProductSection from '@/components/products/ProductSection'
import {getProduct} from "../../services/productService";

function ProductPage({ productData }) {  

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection productData={productData} />
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const productData = await getProduct(params.product)

  return {
    props: {
      productData,
    },
  }
}

export default ProductPage
