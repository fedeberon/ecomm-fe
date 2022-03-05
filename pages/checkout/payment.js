import {useEffect, useState} from "react";
import CreditCard from "@/components/cart/CreditCard";
import {getSession} from "next-auth/client";
import {getBilling} from "../../services/billingService";
import {useRouter} from "next/router";
import {createCheckout} from "../../services/productService";
import {useCartContext, useCleanCartContext} from "@/context/Store";
import Loading from "@/components/utils/Loading";

const Payment = () => {
    const [checkout, setCheckout] = useState()
    const [error, setError] = useState();
    const router = useRouter()
    const [cart, checkoutUrl] = useCartContext()
    const [loading, setLoading] = useState(false)
    const cleanCart = useCleanCartContext()

    useEffect(async () => {
        setLoading(true)
        let checkout = await createCheckout(cart);
        setCheckout(checkout.data)
        setLoading(false)
    }, [])

    const [person, setPerson] = useState({
        "name": "",
        "lastName": "",
        "address" : "",
        "cuit": ""
    })

    const [tabs, setTabs] = useState({
        data: true,
        creditCard: false,
        pointCard: false
    });

    const handleClick = (e) => {
        const {name} = e.target;
        setTabs({
            data: false,
            creditCard: false,
            pointCard: false
        });
        setTabs({
            [name]: true
        });
    }

    const submit = async (type) => {
        setLoading(true)
        let session =  await getSession()
        const response = await getBilling(person, checkout, type, session);
        if (response.status === 200) {
            router.push('/bills/' + response.data.id)
            cleanCart();
        }
        if(response.status === 500) {
            setError(response.data)
            console.log(response.data)
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value,
        });
    }

    return(
        <>
            {
                checkout
                ?
                    <div className="w-1/2 mx-auto mt-4  rounded">
                        <h1>#{checkout.id}</h1>
                    <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
                        <li className={`px-4 py-2 -mb-px font-semibold text-gray-800 border-b-2 ${tabs.data ? `border-blue-400` : ``} rounded-t opacity-50`}>
                            <a id="default-tab" name={`data`} href="#" onClick={handleClick}>Datos Personales</a>
                        </li>

                        <li className={`px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50 ${tabs.creditCard ? `border-blue-400` : ``}`}>
                            <a name={`creditCard`} href="#" onClick={handleClick}>Tarjeta Credito</a>
                        </li>

                        <li className={`px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50 ${tabs.pointCard ? `border-blue-400` : ``}`}>
                            <a name={`pointCard`} href="#" onClick={handleClick}>Tarjeta Puntos</a>
                        </li>
                    </ul>

                    <div id="tab-contents">
                        <div id="first" className={`${tabs.data ? `` : `hidden`} p-4`}>

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
                                    <input id="cuit"  name="cuit" onChange={handleChange} value={person.cuit} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="XX-XXXXXXXX-X" />
                                </div>
                                <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                    Nombre y Apellido
                                </label>
                                <div className="relative mb-5 mt-2">
                                    <input id="name" name="name"  onChange={handleChange} value={person.name} className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Nombre y Apellido" />
                                </div>

                                <label htmlFor="email" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                    e-Mail
                                </label>
                                <div className="relative mb-5 mt-2">
                                    <input id="email"  name="email" className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="e-Mail" />
                                </div>

                                <div className="flex items-center justify-start w-full">
                                    <a onClick={() => submit('A')}
                                       aria-label="checkout-products"
                                       className="bg-gray-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                          justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-gray-700 rounded-md mr-4">
                                        Factura A
                                    </a>

                                    <a onClick={() => submit('B')}
                                       aria-label="checkout-products"
                                       className="bg-yellow-600 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                          justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-yellow-700 rounded-md ml-4">
                                        Factura B
                                    </a>

                                    <a onClick={() => submit('C')}
                                       aria-label="checkout-products"
                                       className="bg-yellow-600 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                         justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-yellow-700 rounded-md ml-4">
                                        Consumidor Final
                                    </a>
                                </div>
                                <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </div>
                            </div>

                        </div>
                        <div id="second" className={`${tabs.creditCard ? `` : `hidden`}   p-4`}>
                            <CreditCard name={person.name}/>
                        </div>
                        <div id="third" className={`${tabs.pointCard ? `` : `hidden`}   p-4`}>
                            Third tab
                        </div>
                    </div>
                </div>
                :
                    <></>
            }

            {
                loading
                    ?
                    <Loading message={"Un momento por favor ..."}/>
                    :
                    <></>
            }
        </>
    )
}


export default Payment;
