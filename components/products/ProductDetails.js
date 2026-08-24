import ProductInfo from '@/components/products/ProductInfo'
import ProductForm from '@/components/products/ProductForm'
import logo from "../../images/default.jpeg";
import BackToProductButton from './BackToProductButton';

function ProductDetails({ productData }) {
  const defaultImage = { url: "default.jpeg", link: logo, main: false };
  const image = productData.images && productData.images.length !== 0
    ? productData.images[0].link
    : defaultImage.link

  return (
    <div className="flex flex-col h-full">
      <ProductInfo productData={productData} />
      <div className="mt-3 pt-3 border-t border-slate-100">
        <ProductForm productData={productData} image={image} />
      </div>
      <div className="mt-2">
        <BackToProductButton />
      </div>
    </div>
  )
}

export default ProductDetails
