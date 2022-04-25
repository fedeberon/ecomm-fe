import {getProductsByType} from "../../services/productService";
import ProductListings from "@/components/products/ProductListings";
import StoreHeading from "@/components/StoreHeading";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'

function Shop({title, products, brands, categories }) {

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
                            <ProductListings products={products} brands={brands} categories={categories}/>
                    }
                </div>
            </div>
        </>
    )

}

export async function getServerSideProps({ params }) {
    const products = await getProductsByType(params.type);
    const brands = await brandsService.findAll();
    const categories = await categoriesService.findAll();


    return {
        props: {
            title: params.type,
            products,
            brands,
            categories,
        },
    }
}


export default Shop;