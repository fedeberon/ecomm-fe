import UserDetail from "@/components/users/UserDetail";
import {getByUsername} from "../../services/userService";
import {useEffect} from "react";

const Username = ({user})  => {

    useEffect(() => {
        console.log(user)
    }, []);

    return (
            <>
              <UserDetail user={user} />
            </>
        )
}


export async function getServerSideProps({query}) {
    const user = await getByUsername(query.username);
    return {
      props: {
        user
      }
    }
  }

export default Username


