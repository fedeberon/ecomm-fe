import {getProductsByType} from "../../services/productService";
import ProductListings from "@/components/products/ProductListings";
import StoreHeading from "@/components/StoreHeading";

function Shop({title, products }) {

    return (
        <>
            <StoreHeading title={title}/>

            {
                products == null
                ?
                    <>Not found</>
                :
                    <ProductListings products={products} />
            }
        </>
    )

}

export async function getServerSideProps({ params }) {
    const products = await getProductsByType(params.type);

    return {
        props: {
            title: params.type,
            products: products
        },
    }
}


export default Shop;