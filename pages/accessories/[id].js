import PageTitle from "@/components/PageTitle"
import { findAll } from "services/categoriesService";
import { getProducts } from "services/productService";
import * as brandsService from 'services/brandService';
import ProductByCategoriesListings from "@/components/products/ProductByCategoriesListings";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


function AccessoriesPage({categories, products, brands}) {
  const [category, setCategory] = useState();
  const router = useRouter()
  const { id } = router.query;

  useEffect(() => {
    
    if(id){
      categories?.filter((element) => { 
        if(element.id === Number(id)){
          setCategory(element)
        }}
      
    ) 
  }
},[id])

    return (
        <>
          <div className="mx-auto max-w-6xl">
            <PageTitle text={category?.name}/>
          </div>

            <ProductByCategoriesListings products={products} brands={brands} categories={categories} category={category?.name}/>
       </>
    )
  }

  export async function getServerSideProps() {
    const products = await getProducts(0);
    const brands = await brandsService.findAll();
    const categories = await findAll();
  
    return {
      props: {
        products: products.content,
        brands, 
        categories,
      },
    }
  }
  
  export default AccessoriesPage