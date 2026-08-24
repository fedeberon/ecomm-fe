import {getBills} from "../../services/billingService";
import Bills from "@/components/bill/Bills";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';

const Index = ({bills}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <StoreHeading title="Facturación" />
            <Bills bills={bills}/>
        </div>
    )

}

export async function getServerSideProps() {
    const bills = await getBills();
    return {
        props: {
            bills
        },
    }
}

export default withAuthorization(Index);
