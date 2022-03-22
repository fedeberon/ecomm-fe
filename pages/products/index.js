import Products from "@/components/products/Products";
import {getProducts} from "../../services/productService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import {updateAsAPromotion} from "../../services/productService"

const ProductsManager = ({products}) => {

    return (
        <div className="bg-blue-100 ">
        <div className="mx-auto bg-white max-w-6xl">
            <PageTitle text="Articulos" />

            <Products products={products}/>
            <Link href="/products/create" passHref>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 ml-10 rounded">
                    Nuevo Producto
                </button>    
            </Link>
        </div>
        </div>
    )

}


export async function getServerSideProps() {
    const products = await getProducts()
    const promo = await updateAsAPromotion()
    return {
        props: {
            products,
            promo,
        },
    }
}

export default ProductsManager