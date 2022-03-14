import {getProductsByType} from "../../services/productService";
import ProductListings from "@/components/products/ProductListings";
import StoreHeading from "@/components/StoreHeading";

function Shop({title, products }) {

    return (
        <>
            <div className="bg-blue-100 lg:px-6">
                <div className="bg-white ">
                    <StoreHeading title={title}/>

                    {
                        products == null
                        ?
                            <>Not found</>
                        :
                            <ProductListings products={products} />
                    }
                </div>
            </div>
        </>
    )

}

export async function getServerSideProps({ params }) {
    const products = await getProductsByType(params.type);

    return {
        props: {
            title: params.type,
            products
        },
    }
}


export default Shop;