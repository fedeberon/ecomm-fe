import ProductSection from '@/components/products/ProductSection'
import {getProduct, getProducts} from "../../../services/productService";

function Index({ productData }) {

    return (
        <div className="bg-blue-100 lg:px-10 lg:py-2">
            <div className="justify-center">
                <ProductSection productData={productData} />
            </div>
        </div>
    )
}


export async function getStaticPaths() {
    const products = await getProducts();
    const paths = products.map((product) => ({
        params: {
            id: product.id + '',
        },
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const productData = await getProduct(params.id)

    return {
        props: {
            productData,
        },
    }
}

export default Index
