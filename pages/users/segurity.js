import UserSegurity from "@/components/users/UserSegurity";
import UserNav from "@/components/users/UserNav";
import { getSession } from "next-auth/client";
import { getByUsername } from "services/userService";

const Profile = ({userSession}) => {

    return (
        <div class="bg-indigo-50 container h-screen md:px-20 pt-6">
            <div class="bg-white h-full w-full rounded-md flex">
                <UserNav user={userSession}/>
                <UserSegurity user={userSession}/> 
            </div>
        </div>
    )
    
}

export default Profile

export async function getServerSideProps(ctx) {
    const user = await getSession(ctx)
    const userSession = await getByUsername(user.user.username)
    console.log('user', user) 
    return {
        props: {
            userSession
        }
    }
}