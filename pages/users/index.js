import {findAll} from "../../services/userService";
import UserList from "@/components/users/UserList";
import PageTitle from "@/components/PageTitle";
import withAuthorization from 'components/withAuthorization';

const Index = ({users}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Usuarios" />

            <UserList users={users}/>
        </div>
    )
}

export async function getStaticProps() {
    const users = await findAll()
    return {
        props: {
            users
        },
    }
}

export default withAuthorization(Index);