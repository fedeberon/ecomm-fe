import { useState } from "react";
import { getByUsername ,save } from "services/userService";

const UserData = ({user}) => {
 
    const [userToUpdate, setUserToUpdate] = useState(user);

    const [enable, setEnabled] = useState(true);

 
    const enableFields = (e) => {
        e.preventDefault();
        setEnabled(false);
        
    }    


    const handleChange = (e) => {
        debugger    
        setUserToUpdate({
            ...userToUpdate,
            [e.target.name]: e.target.value,
        });
    }  

    const submit = (e) => {
        e.preventDefault();
        save(userToUpdate).then((result) => {
            if (result.status === 202) {
                window.location.href = '/users/' + user.cardId
            }
        }); 
    }
    
    return (

        <>
            <form class="flex-initial shrink w-full max-w-lg p-6">

            <div class="flex flex-wrap mx-3 mb-6"
            onDoubleClick={enableFields}>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Nombre
                </label>
                <input 
                 onChange={handleChange} 
                 
                 disabled = {enable}
                 class={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                 value={userToUpdate?.name} 
                 type="text" 
                 id="name" 
                 name="name" 
                 /> 
                </div>

                <div class="w-full md:w-1/2 px-3"
                onDoubleClick={enableFields}>
                <label 
                htmlFor="lastName"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-last-name">
                    Apellido
                </label>
                <input 
                onChange={handleChange} 
                disabled = {enable}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                value={userToUpdate?.lastName}
                type="text" 
                id="lastName" 
                name="lastName"  
                />
                </div>    
            </div> 

            <div class="flex flex-wrap mx-3 mb-6"
            onDoubleClick={enableFields}>
                <div class="w-full px-3">
                <label 
                htmlFor="email"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Email
                </label>
                <input 
                onChange={handleChange} 
                disabled = {enable}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                value={userToUpdate?.email} 
                type="text"
                id="email" 
                name="email" 
                />    
            </div>
            </div>

            
            <div class="flex flex-wrap mx-3 mb-6"
            onDoubleClick={enableFields}>
                <div class="w-full px-3">
                <label  
                htmlFor="phone"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-password">
                    Telefono
                </label>
                <input 
                onChange={handleChange}
                disabled = {enable}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                value={userToUpdate?.phone} 
                type="text"
                id="phone" 
                name="phone" 
                />
                </div>
            </div>


            <div class="flex flex-wrap mx-3 mb-6"
            onDoubleClick={enableFields}>
                <div class="w-full px-3">
                <label 
                htmlFor="direction"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-password">
                    Direccion
                </label>
                <input 
                onChange={handleChange}
                disabled = {enable}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                value={userToUpdate?.direction} 
                type="text" 
                id="direction" 
                name="direction"
                />
                </div>
            </div>


            <div class="flex flex-wrap mx-3 mb-2"
            onDoubleClick={enableFields}>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label  
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                htmlFor="city"
                for="grid-city">
                    Ciudad
                </label>
                <input 
                    onChange={handleChange}
                    disabled = {enable}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    type="text"  
                    value={userToUpdate?.city}
                    id="city" 
                    name="city" 
                /> 
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0"
                onDoubleClick={enableFields}>
                <label 
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="postal" 
                for="grid-zip">
                    Codigo postal
                </label>
                <input 
                    onChange={handleChange}
                    disabled = {enable}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    type="text" 
                    value={userToUpdate?.postal}
                    id="postal" 
                    name="postal"
                />
                </div>
            </div>
            
            <button onClick={submit}
                class="bg-blue-500 hover:bg-blue-700 ml-6 rounded text-white font-bold mt-2 py-2 px-4">
                    Guardar  
            </button> 
            </form>
    
        </>   
    )
}
 
export async function getServerSideProps({query}) {
    const user  = await getByUsername(query.username);
  
    return {
        props: {
            user
        }
    }
}
export default UserData; 