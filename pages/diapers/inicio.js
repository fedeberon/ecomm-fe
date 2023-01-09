import Accesories from "@/components/accessories/Accessories"
import PageTitle from "@/components/PageTitle"
import { findAll } from "services/categoriesService";
import { getProducts } from "services/productService";
import * as brandsService from 'services/brandService';
import ProductByCategoriesListings from "@/components/products/ProductByCategoriesListings";
import { useEffect, useState } from "react";

function DiapersPage({categories, products, brands}) {
  const [category, setCategory] = useState(); 
  useEffect(() => {
    categories.map((category) => {
      if(category.name === "Pañaleria"){
        setCategory(category.name)
      }
    })
  }, [])
    return (
        <>
          <div className="mx-auto max-w-6xl">
            <PageTitle text="Pañaleria"/>
          </div>

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
  
  export default DiapersPage