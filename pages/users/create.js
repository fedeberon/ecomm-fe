import StoreHeading from "@/components/StoreHeading";
import {useState} from "react";
import {save} from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'

const Create = () => {
    

    const [enable, setEnable] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
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
        let isValidPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{7,16}$/i.test(user.password);  
        let isValidDNIoCUIL = /^[0-9.-]*$/i.test(user.cuil);  

        if (user.name && user.lastName != "" && isValidDNIoCUIL && isValidPassword && isValidEmail){
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
                                autocomplete="off" 
                                onChange={handleChange}
                                name={"name"}
                                value={user.name}
                                className="appearance-none block w-full capitalize bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                placeholder="Nombre"/>
                                {
                                   user.name && user.name.length > 3-1
                                   ?
                                   <></>     
                                   :
                                   <p className="text-red-500 text-xs italic">Complete su Nombre.</p>
                                   
                                }
                                
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-last-name">
                                Apellido
                            </label>
                            <input
                                autocomplete="off" 
                                onChange={handleChange}
                                name={"lastName"}
                                value={user.lastName}
                                className="appearance-none block capitalize w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" 
                                placeholder="Ingrese su Apellido"/>
                                {
                                   user.lastName && user.lastName.length > 3-1
                                   ?
                                   <></>     
                                   :
                                   <p className="text-red-500 text-xs italic">Complete su Apellido.</p>
                                   
                                }

                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                E-mail
                            </label>
                            <input 
                                autocomplete="off" 
                                onChange={handleChange} 
                                value={user.email}
                                name={"email"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" 
                                placeholder="Ingrese un e-mail"/>  
                                {
                                   user.email && user.email.length > 10-1
                                   ?
                                   <></>     
                                   :
                                   <p className="text-red-500 text-xs italic">Ingrese Una Direccion De Correo Electronico.</p>
                                   
                                }
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                DNI ó CUIL
                             </label>
                            <input 
                                autocomplete="off"
                                onChange={handleChange} 
                                value={user.cuil}
                                name={"cuil"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text"  
                                placeholder="Ingrese su DNI &oacute; CUIL"/> 
                                {
                                   user.cuil && user.cuil.length > 8-1
                                   ?
                                   <></>     
                                   :
                                   <p className="text-red-500 text-xs italic">Complete su DNI o CUIL.</p>
                                   
                                }
                        </div>
                    </div>
                    <div className="relative">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-password">
                                Contraseña
                             </label>
                        <input
                            autoComplete="off"
                            onChange={handleChange}
                            value={user.password}
                            name="password"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white"
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingrese una contraseña"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 py-9">
                            <input
                                autoComplete="off"
                                type="checkbox"
                                id="showPasswordCheckbox"
                                onChange={() => setShowPassword(!showPassword)}
                                checked={showPassword}
                                className="hidden"
                            />
                            <label htmlFor="showPasswordCheckbox" >{showPassword ? <FontAwesomeIcon icon={faEye} className="w-5 m-auto"/>:<FontAwesomeIcon icon={faEyeSlash} className="w-5 m-auto"/>}</label>
                        </div>
                    </div>
                    <div>
                        {
                            user.password && user.password.length > 7
                            ?
                            <></>     
                            :
                            <p className="text-red-500 text-xs italic py-3">Complete su Contraseña (de 8 a 16 caracteres al menos 1 mayuscula y 1 digito)</p>   
                        }
                    </div>  

                    <div
                        className="grid justify-items-center py-2">               
                            <button type="submit" onClick={submit}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `}>
                                Listo !
                            </button> 
                    </div>
                </form>

            </div>

        </>
    )
}

export default Create