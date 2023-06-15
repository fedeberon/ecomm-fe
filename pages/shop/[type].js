import {getProductsByType} from "../../services/productService";
import StoreHeading from "@/components/StoreHeading";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import ProductListings from "@/components/products/ProductListings";

function Shop({title, products, brands, categories }) {

    return (
        <>
            <div className="bg-white">
                <div className="bg-white ">
                    <StoreHeading title={title}/>
                    {
                        products == null 
                        ?
                            <>Not found</>
                        :
                            <ProductListings brands={brands} categories={categories} type={title} />
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