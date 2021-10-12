import ProductSection from '@/components/ProductSection'
import {getProduct} from "../../services/productService";
import {useEffect} from "react";

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
