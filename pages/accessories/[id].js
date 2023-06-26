import PageTitle from "@/components/PageTitle"
import { findAll } from "services/categoriesService";
import {getProducts, getProductsByType} from "services/productService";
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

  export async function getServerSideProps({params}) {
    const brands = await brandsService.findAll();
    const categories = await findAll();
    const products = await getProductsByType(params.id)

    return {
      props: {
        products: products,
        brands,
        categories
      },
    }
  }
  
  export default AccessoriesPage