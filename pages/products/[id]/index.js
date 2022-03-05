import ProductSection from '@/components/products/ProductSection'
import {getProduct, getProducts} from "../../../services/productService";

function Index({ productData }) {

    return (
        <div className="min-h-screen py-12 sm:pt-20">
            <ProductSection productData={productData} />
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
