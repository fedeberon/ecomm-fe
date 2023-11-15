import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {getPersonByCUIT} from "../../services/personService";
import Loading from "@/components/utils/Loading";
import {getBilling} from "../../services/billingService";
import {useCleanCartContext} from "@/context/Store";
import {getSession} from "next-auth/react";

const Billing = ({isShowing, checkout, type}) => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState();
    const cleanCart = useCleanCartContext()

    const [person, setPerson] = useState({
        "name": "",
        "lastName": "",
        "address" : "",
        "cuit": ""
    })

    const handleChange = (e) => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value,
        });
    }

    const closeBillingModal = () => {
        isShowing(false);
    }

    const handleFindCUIT = async () => {
        setShow(true)
        const data = await getPersonByCUIT(person.cuit);
        setPerson({
            ...person,
            "name": data.name + ` ` + data.lastName,
            "lastName": data.lastName,
            "address": data.addresses[0].direccion
        })
        setShow(false)
    }

    const submit = async () => {
        let session =  await getSession()
        setShow(true);
        const response = await getBilling(person, checkout, type, session);
        if (response.status === 200) {
            window.location.href = '/bills/' + response.data.id
        }
        if(response.status === 500) {
            setShow(false);
            setError(response.data)
        }
        cleanCart();
    }

    return (
        <>
            <div>
                <div className="py-12 bg-gray-700 transition duration-100 ease-in-out z-10 absolute top-10 right-0 bottom-0 left-0" id="modal">
                    <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                            <div className="w-full flex justify-start text-gray-600 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width={52} height={52} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                </svg>
                            </div>
                            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Detalle de Facturaci&oacute;n</h1>
                            <label htmlFor="cuit" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                CUIT
                            </label>
                            <br/>
                            <label htmlFor="cuit" className="text-red-600 uppercase text-sm font-bold leading-tight tracking-normal">
                                {error ? error : ""}
                            </label>
                            <div className="relative mb-5 mt-2">
                                <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                    <FontAwesomeIcon icon={faArrowRight} className="w-4 ml-2" onClick={handleFindCUIT}/>
                                </div>
                                <input id="cuit"  name="cuit" onChange={handleChange} value={person.cuit} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="XX-XXXXXXXX-X" />
                            </div>
                            <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                Nombre y Apellido
                            </label>
                            <div className="relative mb-5 mt-2">
                                <input id="name" name="name"  onChange={handleChange} value={person.name} className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Nombre y Apellido" />
                            </div>
                            <label htmlFor="address" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                Direcci&oacute;n
                            </label>
                            <div className="relative mb-5 mt-2">
                                <input id="address" name="address"  onChange={handleChange}  value={person.address} className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Direccion" />
                            </div>
                            <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                e-Mail
                            </label>
                            <div className="relative mb-5 mt-2">
                                <input id="email"  name="email" className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="e-Mail" />
                            </div>

                            {/*<CreditCard />*/}

                            <div className="flex items-center justify-start w-full">
                                <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={submit}>Crear Factura</button>
                                <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={closeBillingModal}>
                                    Cancelar
                                </button>
                            </div>
                            <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out" onClick={closeBillingModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={18} y1={6} x2={6} y2={18} />
                                    <line x1={6} y1={6} x2={18} y2={18} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    show
                        ?
                        <Loading message={"Espere un segundo por favor"} />
                        :
                        <></>
                }
            </div>

        </>
    );
};

export default Billing;


