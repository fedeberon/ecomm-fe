import ProductImage from '@/components/products/ProductImage'
import ProductDetails from '@/components/products/ProductDetails'


function ProductSection({ productData }) {
  return (
    <div className="flex flex-wrap my-4 bg-white rounded-lg shadow-lg justify-evenly md:flex-row">

      <div className='m-4'>
        <ProductImage images={productData.images} />
      </div>
      <div >
        <ProductDetails productData={productData} />
      </div>
    </div>
  )
}

export default ProductSection
