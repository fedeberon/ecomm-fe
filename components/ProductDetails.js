import BackToProductButton from '@/components/BackToProductButton'
import ProductInfo from '@/components/ProductInfo'
import ProductForm from '@/components/ProductForm'
import logo from "../images/default.jpeg";

function ProductDetails({ productData }) {
    const defaultImage =
        {
            "url": "default.jpeg",
            "link": logo,
            "main": false
        };

   const image = productData.images && productData.images.length != 0 ? productData.images[0].link : defaultImage.link

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
        mainImg={image}
        id={productData.id}
        images={productData.images}
      />
    </div>
  )
}

export default ProductDetails
