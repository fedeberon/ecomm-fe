import UserData from "@/components/users/UserData";
import UserSegurity from "@/components/users/UserSegurity";
import {useState} from "react";
import { getByUsername } from "services/userService";
import BillsOfUser from "@/components/users/BillsOfUser";
import { findAllByUsername } from "services/billingService";
import StoreHeading from "@/components/StoreHeading";
import userAuthorization from "@/components/userAuthorization";

const Username = ({userSession, billsOfUSer})  => {
  

    const [tabs, setTabs] = useState({
        usuarios: true,
        activity: false,
        segurity: false,
    });

    const handleClick = (e) => {
        const {name} = e.target;
        setTabs({
            usuarios: false,
            activity: false,
            segurity: false,
        });
        setTabs({
            [name]: true
        });
    }
 

    return (
      <div className="bg-blue-100 lg:px-3">
          <div className="lg:mx-6 bg-white flex min-h-screen">
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

                </ul>
            </div>
            <div id="first" className={`${tabs.usuarios ? `` : `hidden`}  flex bg-white justify-center p-2 `}>
                <UserData user={userSession}/>
            </div>

            <div id="second" className={`${tabs.activity ? `` : `hidden`}  flex bg-white justify-center mx-auto w-full `}>
            <div className="justify-center w-4/5">
                <div className="mt-6">
                    <StoreHeading title="Tus Facturas"/>
                </div>
                <div className="md:-mt8 -mt-6">
                    <BillsOfUser bills={billsOfUSer}/>
                </div>
            </div>
            </div>
            <div id="thirt" className={`${tabs.segurity ? `` : `hidden`}  flex bg-white justify-center p-2 `}>
                <UserSegurity user={userSession}/>
            </div>
          </div>
      </div>

    )
}

export default userAuthorization(Username);

 

export async function getServerSideProps({query}) {
    const userSession = await getByUsername(query.username);
    const billsOfUSer = await findAllByUsername(query.username)
 

    return {
        props: {
            userSession,
            billsOfUSer
        }
    }
}