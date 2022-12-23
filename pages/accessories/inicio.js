import Accesories from "@/components/accessories/Accessories"
import PageTitle from "@/components/PageTitle"
import { findAll } from "services/categoriesService";

function AccessoriesPage({categories}) {
    return (
        <>
            <div className="mx-auto max-w-6xl">
            <PageTitle text="Accesorios"/>

            <Accesories categories={categories}/>
        </div>
       </>
    )
  }

  export async function getServerSideProps() {
    // const products = await getProducts(0);
    // const brands = await brandsService.findAll();
    const categories = await findAll();
  
    return {
      props: {
        // products: products.content,
        // brands, 
        categories,
      },
    }
  }
  
  export default AccessoriesPage