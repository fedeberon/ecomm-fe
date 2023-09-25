import StoreHeading from "@/components/StoreHeading";
import NewCategory from "@/components/categories/NewCategory";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return (
        <div className="min-h-screen">
            <StoreHeading title="Categorias"/>
            <NewCategory/>
        </div>
    );
}

export default withAuthorization(Create);
