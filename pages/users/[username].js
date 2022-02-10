import UserNav from "@/components/users/UserNav";
import {getByUsername} from "../../services/userService";
import {useEffect} from "react";

const Username = ({user})  => {

    return (
            <>
              <UserNav user={user} />
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


