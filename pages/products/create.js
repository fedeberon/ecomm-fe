import NewProduct from "@/components/products/NewProduct";
import StoreHeading from "@/components/StoreHeading";

const Create = () => {
    return(
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Articulo"/>
            <NewProduct/>
        </div>
    )
}

export default Create;