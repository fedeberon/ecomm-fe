import {getBills} from "../../services/billingService";
import Bills from "@/components/bill/Bills";
import PageTitle from "@/components/PageTitle";
import withAuthorization from 'components/withAuthorization';

const Index = ({bills}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Facturacion`} />
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
