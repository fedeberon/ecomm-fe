import ProductSection from '@/components/products/ProductSection'
import {getProduct, getProducts} from "../../../services/productService";

function Index({ productData }) {

    return (
            <div className="justify-center">
                <ProductSection productData={productData} />
            </div>
    )
}
 
export async function getServerSideProps({ params }) {
    const productData = await getProduct(params.id)

    return {
        props: {
            productData,
        },
    }
}

export default Index
