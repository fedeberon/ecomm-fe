import { getWalletUser } from "../../../services/walletService";
import WalletOfUser from "../../../components/wallet";
import { getByUsername } from "services/userService";
import userAuthorization from "@/components/userAuthorization";

const Wallet = ({ walletOfUser, user }) => {
    return (
        <main className="bg-gray-50/60 py-6 sm:py-8">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-palette-sdark">Programa de beneficios</p>
                    <h1 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">Mi billetera</h1>
                    <p className="mt-1 text-sm text-gray-500">Consultá tu saldo y todos los movimientos de puntos.</p>
                </div>
                <WalletOfUser walletOfUser={walletOfUser} user={user} />
            </div>
        </main>
    );
};

export default userAuthorization(Wallet);

export async function getServerSideProps({ query }) {
    const user = await getByUsername(query.id);
    const walletOfUser = await getWalletUser(query.id);
    return {
        props: {
            user,
            walletOfUser,
        },
    };
}
