import StoreHeading from "@/components/StoreHeading";
import {useState} from "react";
import {save} from "../../services/userService";

const Create = () => {

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
    }

    const submit = (e) => {
        e.preventDefault();
        save(user).then((result) => {
            if (result.status === 202) {
                window.location.href = '/users/' + result.data.username
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
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                                name={"email"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" placeholder="Ingrese un e-mail"/>
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
                                name={"password"}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                type="text" placeholder="Ingrese una contraseña"/>
                        </div>
                    </div>

                    <button type="submit" onClick={submit}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded `}>
                        Listo !
                    </button>

                </form>

            </div>

        </>
    )
}

export default Create