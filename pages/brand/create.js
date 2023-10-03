import StoreHeading from "@/components/StoreHeading";
import NewBrand from "@/components/brands/NewBrand";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return (
        <div className="min-h-screen">
            <StoreHeading title="Marcas"/>
            <NewBrand/>
        </div>
    );
}

export default withAuthorization(Create);
