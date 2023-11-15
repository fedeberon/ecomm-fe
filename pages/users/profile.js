import UserData from "@/components/users/UserData";
import UserNav from "@/components/users/UserNav";
import { getSession } from "next-auth/react";
import { getByUsername } from "services/userService";

const Profile = ({userSession}) => {



    return (
        <div class="bg-indigo-50 h-screen md:px-20 pt-6">
            <div class="bg-white h-full w-full rounded-md flex">
                <UserNav/>
                <UserData user={userSession}/> 
            </div>
        </div>
    )
    
}

export default Profile

export async function getServerSideProps(ctx) {
    const user = await getSession(ctx)
    const userSession = await getByUsername(user.user.username)

    return {
        props: {
            userSession
        }
    }
}