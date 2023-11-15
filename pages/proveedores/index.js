import List from "@/components/proveedores/List";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { all } from "services/providersService";
import withAuthorization from 'components/withAuthorization';

const ProductsManager = ({provider}) => {

    return (
        <div className="items-center mx-auto bg-white max-w-6xl">
            <PageTitle text={`Proveedores`}/>
            <List provider={provider}/>
            <Link legacyBehavior href="/proveedores/create" passHref>
                <div className="w-full flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Nuevo Proveedor
                    </button> 
                </div>
            </Link>
        </div>
    )

}


export async function getServerSideProps() {
    const provider = await all()
    return {
        props: {
            provider
        },
    }
}

export default withAuthorization(ProductsManager);