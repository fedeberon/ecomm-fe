import {getBills} from "../../services/billingService";
import Bills from "@/components/bill/Bills";

const Index = ({bills}) => {

    return (
       <Bills bills={bills}/>
    )

}

export async function getStaticProps() {
    const bills = await getBills();
    return {
        props: {
            bills
        },
    }
}

export default Index
