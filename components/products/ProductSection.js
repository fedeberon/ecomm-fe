import ProductImage from '@/components/products/ProductImage'
import ProductDetails from '@/components/products/ProductDetails'
import Gallery from "@/components/products/Gallery";
import {useEffect, useState} from "react";
import * as productService from "../../services/productService";


function ProductSection({ productData }) {
    const [productsRelated, setProductsRelated] = useState([])

    useEffect(async () => {
        let products = await productService.getProductsRelated(productData)
        setProductsRelated(products)
        debugger
    }, [])

    return (
        <>
            <div className="flex flex-wrap my-4 bg-white justify-evenly md:flex-row">
                <div className='w-auto'>
                    <ProductImage images={productData.images} />
                </div>
                <div className='w-auto'>
                    <ProductDetails productData={productData} />
                </div>
            </div>
            <Gallery productData={productsRelated}/>
        </>
  )
}

export default ProductSection
