import { useState } from "react";

const UserData = ({user}) => {
 
    const [userToUpdate, setUserToUpdate] = useState(user);

    const [enable, setEnabled] = useState("disabled");

 
    const enableFields = (event) => {
        event.preventDefault();
        setEnabled("");
        document.querySelector("#name").focus();
    }    


    const handleChange = (e) => {
        setUserToUpdate({
            ...userToUpdate,
            [e.target.name]: e.target.value,
        });
    } 
    
    return (

        <>
            <form class="flex-initial shrink w-full max-w-lg p-6">

            <div class="flex flex-wrap mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                htmlFor="name" 
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Nombre
                </label>
                <input 
                 onClick={handleChange}
                 disabled = {enable}
                 class={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                 value={userToUpdate?.name} 
                 autoFocus
                 type="text" 
                 id="name" 
                 name="name" 
                 onChange={(e) => setUserToUpdate(e.target.value) }
                 /> 
                </div>

                <div class="w-full md:w-1/2 px-3">
                <label 
                htmlFor="lastName"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-last-name">
                    Apellido
                </label>
                <input 
                onClick={handleChange} 
                disabled = {enable}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                value={userToUpdate?.lastName}
                type="text" 
                id="lastName" 
                name="lastName" 
                onChange={(e) => setUserToUpdate(e.target.value)} 
                />
                </div>    
            </div> 

            <div class="flex flex-wrap mx-3 mb-6">
                <div class="w-full px-3">
                <label 
                htmlFor="email"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                    Email
                </label>
                <input 
                onClick={handleChange} 
                disabled = {enable}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                value={userToUpdate?.email} 
                type="text"
                id="email" 
                name="email" 
                onChange={(e) => setUserToUpdate(e.target.value)} 
                />    
            </div>
            </div>

            
            <div class="flex flex-wrap mx-3 mb-6">
                <div class="w-full px-3">
                <label  
                htmlFor="phone"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-password">
                    Telefono
                </label>
                <input 
                onClick={handleChange}
                disabled = {enable}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                value={userToUpdate?.phone} 
                type="text"
                id="phone" 
                name="phone" 
                onChange={(e) => setUserToUpdate(e.target.value)} 
                />
                </div>
            </div>


            <div class="flex flex-wrap mx-3 mb-6">
                <div class="w-full px-3">
                <label 
                htmlFor="address"
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                for="grid-password">
                    Direccion
                </label>
                <input 
                onClick={handleChange}
                disabled = {enable}
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                value={userToUpdate?.direcction} 
                type="text" 
                id="address" 
                name="address" 
                onChange={(e) => setUserToUpdate(e.target.value)} 
                />
                </div>
            </div>


            <div class="flex flex-wrap mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label  
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" 
                htmlFor="city"
                for="grid-city">
                    Ciudad
                </label>
                <input 
                    onClick={handleChange}
                    disabled = {enable}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    type="text"  
                    
                    value={userToUpdate?.city}
                    id="city" 
                    name="city" 
                    onChange={(e) => setUserToUpdate(e.target.value)} 
                /> 
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label 
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="postalCode" 
                for="grid-zip">
                    Codigo postal
                </label>
                <input 
                    onClick={handleChange}
                    disabled = {enable}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    type="text" 
                    value={userToUpdate?.postal}
                    id="postalCode" 
                    name="postalCode"
                    onChange={(e) => setUserToUpdate(e.target.value)}
                />
                </div>
            </div>
           
            <button onClick={enableFields}
            id="Editar"
            class="bg-green-500 hover:bg-green-700 ml-6 rounded text-white font-bold mt-2 py-2 px-4">
                Editar Campos
            </button>  
            


            <button
                class="bg-blue-500 hover:bg-blue-700 ml-6 rounded text-white font-bold mt-2 py-2 px-4">
                    Guardar  
            </button>    

            <div class="font-medium text-sm text-red-600 mt-2 ml-2" 
            id="Esconder"
            > 
            (Doble click para habilitar)
            </div>
            

            </form>
            
        
            </>   
    )
}
 


export default UserData;