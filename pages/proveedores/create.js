import NewProvider from "@/components/proveedores/NewProvider";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return(
        <div className="min-h-screen">
            <StoreHeading title="Nuevo Proveedor"/>
            <NewProvider/>
        </div>
    );
}


export default withAuthorization(Create);
