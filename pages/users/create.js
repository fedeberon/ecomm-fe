import StoreHeading from "@/components/StoreHeading";
import {useState} from "react";
import {save} from "../../services/userService";

const Create = () => {


    const [enable, setEnable] = useState(false)

    const [user, setUser] = useState({
        "name": "",
        "lastName": "",
        "cardId": "",
        "password": "",
        "cuit": "",
        "phone": "",
        "email": ""
    })


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
        validate();
    }


    function validate() {
        let isValidEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(user.email);
        let isValidPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i.test(user.password);  
        let isValidDNIoCUIT = /^[0-9.-]*$/i.test(user.cuit);  

        console.log(user.name != "", user.lastName != "",  isValidDNIoCUIT, isValidPassword, isValidEmail);


        if (user.name && user.lastName != "" && isValidDNIoCUIT && isValidPassword && isValidEmail){
            setEnable(true)  
        }  
        else {
            setEnable(false)
        }
                
    } 

     

    const submit = (e) => {
        e.preventDefault();
        save(user).then((result) => {
            if (result.status === 202) {
                window.location.href = '/login'
            }
        });
    }

    return (
        <>
            <StoreHeading title="Registrarse"/>

            <div className="min-h-full flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">

                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-first-name">
                                Nombre
                            </label>
                            <input
                                onChange={handleChange}
                                name={"name"}
                                value={user.name}
                                className="appearance-none block w-full capitalize bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Nombre"/>
                                <p className="text-red-500 text-xs italic">Complete su Nombre.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-last-name">
                                Apellido
                            </label>
                            <input
                                onChange={handleChange}
                                name={"lastName"}
                                value={user.lastName}
                                className="appearance-none block capitalize w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" placeholder="Ingrese su Apellido"/>
                            <p className="text-red-500 text-xs italic">Complete su Apellido.</p>

                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                E-mail
                            </label>
                            <input
                                onChange={handleChange} 
                                value={user.email}
                                name={"email"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" placeholder="Ingrese un e-mail"/> 
                                <p className="text-red-500 text-xs italic">Ingrese Una Direccion De Correo Electronico.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                DNI ó CUIT
                             </label>
                            <input
                                onChange={handleChange} 
                                value={user.cuit}
                                name={"cuit"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" placeholder="Ingrese su DNI &oacute; CUIT"/>
                            <p className="text-red-500 text-xs italic">Complete su DNI o CUIT.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Contraseña
                            </label>
                            <input
                                onChange={handleChange} 
                                value={user.password}
                                name={"password"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" placeholder="Ingrese una contraseña"/> 
                                <p className="text-red-500 text-xs italic">Complete su Contraseña</p>
                        </div>
                    </div>                    
                    {
                        enable
                            ?    
                            <button type="submit" onClick={submit}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `}>
                                Listo !
                            </button> 
                            : 
                        <></>
                    }  
                   

                    


                </form>

            </div>

        </>
    )
}

export default Create