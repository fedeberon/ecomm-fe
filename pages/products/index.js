import Products from "@/components/products/Products";
import {getProducts} from "../../services/productService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import {updateAsAPromotion} from "../../services/productService"

const ProductsManager = ({products}) => {

    return (
        
        <div className="items-center mx-auto bg-white max-w-6xl">
            <PageTitle text="Articulos" />
            <Products products={products}/>
            <Link href="/products/create" passHref>
                <div className="w-full flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Nuevo Producto
                    </button> 
                </div>
            </Link>
        </div>
    )

}


export async function getServerSideProps() {
    const products = await getProducts(1)
    return {
        props: {
            products: products.content,
        },
    }
}

export default ProductsManager