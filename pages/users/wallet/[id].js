import {getWalletUser} from "../../../services/walletService";
import PageTitle from "@/components/PageTitle";
import WalletOfUser from "../../../components/wallet";
import { getByUsername } from "services/userService";


const Wallet = ({walletOfUser, user}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Mi Billetera" />
            <WalletOfUser walletOfUser={walletOfUser} user={user}/>
        </div>

    )
}
export default Wallet

export async function getServerSideProps({query}) {
    const user = await getByUsername(query.id)
    const walletOfUser  = await getWalletUser(query.id)
    return {
        props: {
            user,
            walletOfUser, 
        }
    }
}

