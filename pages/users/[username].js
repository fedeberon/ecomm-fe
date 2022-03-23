import UserData from "@/components/users/UserData";
import UserNav from "@/components/users/UserNav";
import UserSegurity from "@/components/users/UserSegurity";
import { getSession } from "next-auth/client";
import { useEffect ,useState} from "react";
import { getByUsername } from "services/userService";

const Username = ({userSession})  => {
   
    console.log(userSession);

    const [tabs, setTabs] = useState({
        usuarios: true,
        activity: false,
        segurity: false,
        preference: false
    });

    const handleClick = (e) => {
        const {name} = e.target;
        setTabs({
            usuarios: false,
            activity: false,
            segurity: false,
            preference: false
        });
        setTabs({
            [name]: true
        });
    }

    return (
      <div className="bg-blue-100 lg:px-3">
          <div className="lg:mx-6 bg-white flex min-h-screen">
              {/* <UserNav/>
              <Userdata user={userSession}/>  */}
            <div className="bg-gray-100 w-1/5 h-auto ">
                <ul id="tabs" className="w-full ">
                    <li className={`font-semibold hover:bg-gray-200 py-3 flex justify-center ${tabs.usuarios ? `bg-gray-300` : ``}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <a name={`usuarios`} className="hidden sm:block" href="#" onClick={handleClick}>Usuario</a>
                    </li>
                    <li className={`hover:bg-gray-200 py-3 font-semibold flex ${tabs.activity ? `bg-gray-300` : ``} justify-center`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <a id="default-tab" className="hidden sm:block" name={`activity`} href="#" onClick={handleClick}>Actividad</a>
                    </li>

                    <li className={`hover:bg-gray-200 py-3 font-semibold flex justify-center ${tabs.segurity ? `bg-gray-300 py-3` : ``}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <a name={`segurity`} className="hidden sm:block" href="#" onClick={handleClick}>Seguridad</a>
                    </li>

                    <li className={`hover:bg-gray-200 py-3 flex font-semibold justify-center ${tabs.preference ? `bg-gray-300` : ``}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <a name={`preference`} className="hidden sm:block" href="#" onClick={handleClick}>Preferencias</a>
                    </li>
                </ul>
            </div>
            <div id="first" className={`${tabs.usuarios ? `` : `hidden`}  flex bg-white justify-center p-2 `}>
                <UserData user={userSession}/>
            </div>
            <div id="second" className={`${tabs.activity ? `` : `hidden`}  flex bg-white justify-center p-2 `}>
                historial
            </div>
            <div id="thirt" className={`${tabs.segurity ? `` : `hidden`}  flex bg-white justify-center p-2 `}>
                <UserSegurity user={userSession}/>
            </div>
            <div id="quarter" className={`${tabs.preference ? `` : `hidden`}  flex bg-white justify-center p-2 `}>
                preferencias
            </div>
          </div>
      </div>
    )
}

export default Username;

 

export async function getServerSideProps({query}) {
    const userSession = await getByUsername(query.username);
  
    return {
        props: {
            userSession
        }
    }
}