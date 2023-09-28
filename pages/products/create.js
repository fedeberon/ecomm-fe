import NewProduct from "@/components/products/NewProduct";
import StoreHeading from "@/components/StoreHeading";
import * as brandsService from 'services/brandService';
import * as categoriesService from "services/categoriesService";
import * as sizeService  from "services/sizeService";
import withAuthorization from 'components/withAuthorization';

const Create = ({brands, categories, sizes}) => {
    return(
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Articulo"/>
            <NewProduct brands={brands} categories={categories} sizes={sizes}/>
        </div>
    )
}

export async function getServerSideProps() {
    const categories = await categoriesService.findAll();
    const brands = await brandsService.findAll();
    const sizes = await sizeService.findAll();
    return {
      props: {
        brands,
        categories,
        sizes
      },
    }
  }
  

  export default withAuthorization(Create);

