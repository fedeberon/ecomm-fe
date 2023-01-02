import Accesories from "@/components/accessories/Accessories"
import PageTitle from "@/components/PageTitle"
import { findAll } from "services/categoriesService";
import { getProducts } from "services/productService";
import * as brandsService from 'services/brandService';
import ProductByCategoriesListings from "@/components/products/ProductByCategoriesListings";
import { useState } from "react";

function AccessoriesPage({categories, products, brands}) {
  const [category, setCategory] = useState(); 
  if(category){
    
    console.log(category);
  }
    return (
        <>
          <div className="mx-auto max-w-6xl">
            <PageTitle text="Accesorios"/>
          </div>

            <Accesories categories={categories} setCategory={setCategory}/>

            <ProductByCategoriesListings products={products} brands={brands} categories={categories} category={category}/>
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