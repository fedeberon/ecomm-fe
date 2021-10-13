import Products from "@/components/products/Products";
import {getProducts} from "../../services/productService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

const ProductsManager = ({products}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Articulos" />

            <Products products={products}/>
            <Link href="/products//create" passHref>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Nuevo Producto
                </button>
            </Link>
        </div>
    )

}
export async function getStaticProps() {
    const products = await getProducts()
    console.table(products);
    return {
        props: {
            products
        },
    }
}

export default ProductsManager