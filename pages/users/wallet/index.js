import {getWalletUser} from "../../../services/walletService";
import { getSession } from "next-auth/client";
import {useEffect} from "react";
import PageTitle from "@/components/PageTitle";
import WalletOfUser from "../../../components/wallet/index";

const Wallet = ({walletOfUser}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Mi Billetera" />
            <WalletOfUser walletOfUser={walletOfUser}/>
        </div>

    )
}
export default Wallet

export async function getServerSideProps(ctx) {
    const user = await getSession(ctx)
    console.log('user', user)
    const  walletOfUser  = await getWalletUser(user.user.username)
    return {
        props: {
            walletOfUser
        }
    }
}