import Products from "@/components/products/Products";
import {getProducts} from "../../services/productService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

const ProductsManager = ({products}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Articulos" />

            <Products products={products}/>
            <Link href="/products/create" passHref>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 ml-10 rounded">
                    Nuevo Producto
                </button>
            </Link>
        </div>
    )

}


export async function getServerSideProps() {
    const products = await getProducts()
    return {
        props: {
            products
        },
    }
}

export default ProductsManager