import { getByUsername ,save } from "services/userService";
import { useState} from "react";

const UserSegurity = ({user}) => {
    const[userUpdate, setUserUpdate] = useState(user)

    

    const handleChange = (e) => {
        setUserUpdate({
            ...userUpdate,
            [e.target.name]: e.target.value,
        });
       
    }



    const[msgbox,setMsgbox]=useState(false)

    const viewBox = () =>{
        setMsgbox(!msgbox)
    }

    
    const submit = (e) => {
        e.preventDefault();
        save(userUpdate).then((result) => {
            if (result.status === 202) {
                window.location.href = '/login'
            }
        }); 
    }
  

    return (
            <form class="flex-initial shrink w-full max-w-lg p-6">
            <div class="flex flex-wrap mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Nueva Contraseña
                </label>
                <input name="password" onChange={handleChange} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="text" placeholder="******************"/>
                    <p class="text-gray-600 text-xs italic">*Ingrese una nueva contraseña</p>
                </div>
            </div>
                <div className="justify-center w-full">
                    <button onClick={submit} className="flex m-auto bg-indigo-400 rounded-full px-4 py-2">guardar</button>
                </div>
            </form>
             
    )
}
export default UserSegurity;


export async function getServerSideProps({query}) {
    const user  = await getByUsername(query.username);
  
    return {
        props: {
            user
        }
    }
}