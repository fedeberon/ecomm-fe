import StoreHeading from "@/components/StoreHeading";
import NewSize from "@/components/sizes/NewSize";
import withAuthorization from 'components/withAuthorization';

const Create = () => {
    return (
        <div className="min-h-screen">
            <StoreHeading title="Talles"/>
            <NewSize/>
        </div>
    );
}

export default withAuthorization(Create);