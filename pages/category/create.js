import StoreHeading from "@/components/StoreHeading";
import NewCategory from "@/components/categories/NewCategory";

const Create = () => {
    return (
        <div className="min-h-screen">
            <StoreHeading title="Categorias"/>
            <NewCategory/>
        </div>
    );
}

export default Create;
