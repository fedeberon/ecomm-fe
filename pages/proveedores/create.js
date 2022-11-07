import NewProvider from "@/components/proveedores/NewProvider";
import StoreHeading from "@/components/StoreHeading";

const Create = () => {
    return(
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Proveedor"/>
            <NewProvider/>
        </div>
    );
}

export default Create;
