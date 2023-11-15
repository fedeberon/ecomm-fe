import Products from "@/components/products/Products";
import {all, getProducts} from "../../services/productService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import {PlusIcon} from "@heroicons/react/20/solid";
import withAuthorization from 'components/withAuthorization';

const ProductsManager = ({products}) => {

    return (

        <div className="items-center mx-auto bg-white max-w-6xl relative">
            <PageTitle text="Articulos" />
            <Link legacyBehavior href="/products/create" passHref>
                <div className="absolute top-0 right-0 mt-4 mr-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                        <PlusIcon className="h-5 w-5" />
                        <span className="ml-2">Nuevo Producto</span>
                    </button>
                </div>

            </Link>
            <Products products={products}/>
        </div>

    )

}

export async function getServerSideProps() {
    const products = await all()
    return {
        props: {
            products: products,
        },
    }
}

export default withAuthorization(ProductsManager)