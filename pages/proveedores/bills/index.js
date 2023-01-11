import { getBills } from "services/billingService";
import PageTitle from "@/components/PageTitle";

const Index = () => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Facturacion`} />
            <p className="text-center py-2 sm:py-4">No hay registros disponibles</p>
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

export default Index