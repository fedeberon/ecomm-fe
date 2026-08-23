import Shopping from "@/components/users/Shoping";
import { getSession } from "next-auth/client";
import getMyShopping from "../../services/shoppingService";

const Mine = ({ myShopping }) => {
    return (
        <section className="bg-gray-50/70 py-6 sm:py-8">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <Shopping bills={myShopping} />
            </div>
        </section>
    );
};

export default Mine;

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const myShopping = await getMyShopping(session.user.username);

    return {
        props: {
            myShopping,
        },
    };
}
