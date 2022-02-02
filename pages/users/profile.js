import UserDetail from "@/components/users/UserDetail"
import { getSession } from "next-auth/client";
import { getByUsername } from "services/userService";

const Profile = ({userSession}) => {
    return (
        <><h1>Hola Mundo</h1>
            // <UserDetail></UserDetail>
            <UserDetail user={userSession} /></>
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