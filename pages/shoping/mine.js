import PageTitle from "@/components/PageTitle";
import Shopping from "@/components/users/Shoping";
import {getSession} from 'next-auth/react';
import getMyShopping from "../../services/shoppingService";


const Mine = ({myShopping}) => {
    return (
        <>
            <div className="mx-auto max-w-6xl">
                <PageTitle text="Mis Compras" />
                <Shopping bills={myShopping}/>
            </div>
        </>
    )
}

export default Mine

export async function getServerSideProps(context) {
    const session = await getSession(context)
    const myShopping = await getMyShopping(session.user.username);
    return {
        props: {
            myShopping
        },
    }
}