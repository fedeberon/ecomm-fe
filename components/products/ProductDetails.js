import ProductInfo from '@/components/products/ProductInfo'
import ProductForm from '@/components/products/ProductForm'
import logo from "../../images/default.jpeg";
import BackToProductButton from './BackToProductButton';


function ProductDetails({ productData}) {
    const defaultImage =
        {
            "url": "default.jpeg",
            "link": logo,
            "main": false
        };
        true
   const image = productData.images && productData.images.length != 0 ? productData.images[0].link : defaultImage.link

  return (

    <div className="flex py-6 flex-col justify-between h-full w-full max-w-xs mx-auto space-y-4 min-h-128">  
      <div>
        <ProductInfo 
          title={productData.name}
          description={productData.description}
          price={productData.price}
        />
      </div>

      <ProductForm 
        title={productData.name}
        mainImg={image}
        id={productData.id}
        images={productData.images}
        price={productData.price}
        isPromo={productData.promo}
      />
      <div className=''>
        <BackToProductButton />
      </div>
    </div>
    
  )
}

export default ProductDetails
