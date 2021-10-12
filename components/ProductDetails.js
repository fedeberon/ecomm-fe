import { useState } from 'react'
import BackToProductButton from '@/components/BackToProductButton'
import ProductInfo from '@/components/ProductInfo'
import ProductForm from '@/components/ProductForm'

function ProductDetails({ productData }) {
  const [variantPrice, setVariantPrice] = useState(productData.price)

  return (
    <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
      <BackToProductButton />
      <ProductInfo 
        title={productData.name}
        description={productData.description}
        price={productData.price}
      />
      <ProductForm 
        title={productData.name}
        mainImg={productData.images[0].link}
        id={productData.id}
        images={productData.images}
      />
    </div>
  )
}

export default ProductDetails
