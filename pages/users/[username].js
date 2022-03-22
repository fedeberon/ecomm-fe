import UserData from "@/components/users/UserData";
import UserNav from "@/components/users/UserNav";
import { getSession } from "next-auth/client";
import { useEffect } from "react";
import { getByUsername } from "services/userService";

const Username = ({userSession})  => {
    
    return (
      <div class="bg-indigo-50 h-screen md:px-20 pt-6">
          <div class="bg-white h-full w-full rounded-md flex">
              <UserNav/>
              <UserData user={userSession}/> 
          </div>
      </div>
    )
}

export default Username;

export async function getServerSideProps({query}) {
    const userSession = await getByUsername(query.username);
    return {
        props: {
            userSession,
        }
    }
}