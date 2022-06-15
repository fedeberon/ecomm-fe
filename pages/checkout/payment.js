import {useEffect, useState} from "react";
import CreditCard from "@/components/cart/CreditCard";
import {getSession} from "next-auth/client";
import {getBilling} from "../../services/billingService";
import {useRouter} from "next/router";
import {buyWithPoints, createCheckout} from "../../services/productService";
import {useCartContext, useCleanCartContext} from "@/context/Store";
import Loading from "@/components/utils/Loading";
import {getPoints} from "../../services/walletService";
import logo from "../../images/Logo Dulce bb.png";
import {findAll, getByUsername} from "../../services/userService";
import CartTable from '@/components/cart/CartTable'
import {getPersonByCUIT}from "../../services/personService.js"

const Payment = ({user, myPoints, users}) => {
    const [checkout, setCheckout] = useState()
    const [error, setError] = useState();
    const router = useRouter()
    const [cart, checkoutUrl] = useCartContext()
    const [loading, setLoading] = useState(false)
    const cleanCart = useCleanCartContext()
    const [card, setCard] = useState("visa");
    const [coupon, setCoupon] = useState("")
    const [points, setPoints] = useState(myPoints)
    const [check,setCheck]=useState(false)
    const [cross,setCross]= useState(false)
  
    useEffect(async () => {
        setLoading(true)
        let checkout = await createCheckout(cart);
        setCheckout(checkout.data)
        setLoading(false)
    }, [])

    const [person, setPerson] = useState({
        "username": "",
        "name": "",
        "lastName": "",
        "username": "",
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
            factura: false,
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
        const response = await getBilling(person, checkout, type, session, coupon, card);
        if (response.status === 200) {
            await router.push('/bills/' + response.data.id)
            cleanCart();
        }
        if(response.status === 500 || response.status === 400){
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

    const handleCreditPoints = (username) => {
        setLoading(true);
        let walletDiscount = {
            "username": username,
            "checkoutId": checkout.id,
        };
        buyWithPoints(walletDiscount).then((res) => {
            setCheckout(res.data);
            setLoading(false);
            router.push(`/users/wallet/${username}`)
            cleanCart();
        });
    }

    const handleChangeUsers = (e) => {
        const {value} = e.target;
        getPoints(value).then((res) => {
            setPoints(res)
        })

        getByUsername(value).then((res) => {
            setPerson({
                "username": res.username,
                "name": res.name,
                "lastName": res.lastName,
                "address": res.address,
                "cuit": res.cuit
            })
        })
    }

    const handleCUIT = async (cuit)=>{
        let dataCuit = await getPersonByCUIT(cuit)
         if (dataCuit.status === undefined){setCheck(true)}else{setCheck(false)}
         if (dataCuit.status === 400){setCross(true)}else{setCross(false)}
    } 
    
    

    return(
        <>
            {
                checkout
                ?
                <div className="bg-blue-100 lg:px-3">
                    <div className="lg:mx-6 bg-white  min-h-screen">
                        
                        <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
                            <li className={`px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50 border-b-2 ${tabs.factura ? `border-blue-400` : ``}`}>
                                <a name={`factura`} href="#" onClick={handleClick}>Detalle</a>
                            </li>
                            <li className={`px-4 py-2 -mb-px font-semibold text-gray-800 border-b-2 ${tabs.data ? `border-blue-400` : ``} rounded-t opacity-50`}>
                                <a id="default-tab" name={`data`} href="#" onClick={handleClick}>Datos Personales</a>
                            </li>

                            <li className={`px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50 border-b-2 ${tabs.creditCard ? `border-blue-400` : ``}`}>
                                <a name={`creditCard`} href="#" onClick={handleClick}>Tarjeta Credito</a>
                            </li>

                            <li className={`px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50 border-b-2 ${tabs.pointCard ? `border-blue-400` : ``}`}>
                                <a name={`pointCard`} href="#" onClick={handleClick}>Tarjeta Puntos</a>
                            </li>
                        </ul>

                    <div>
                        <div id="first" className={`${tabs.factura ? `` : `hidden`}  flex bg-white justify-center p-2 `}>
                        <CartTable cart={cart}/>  
                        </div>
                        <div id="second" className={`${tabs.data ? `` : `hidden`} justify-center  p-4`}>

                            <div className=" py-8 px-5 md:px-10 bg-white m-auto w-full md:w-1/2">
                                <div className="w-full flex justify-start text-gray-600 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width={52} height={52} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                        <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                    </svg>
                                </div>
                                <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Detalle de Facturaci&oacute;n</h1>

                                <select id="user"
                                        className="text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        onChange={handleChangeUsers}
                                >
                                    <option value="">Seleccione el usuario </option>
                                    {
                                        users.map((user, index) => {
                                            return (
                                                <option key={index} value={user.username} name={`${user.name}`}>{user.name}</option>
                                            )
                                        })
                                    }
                                </select>

                                <label htmlFor="cuit" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                    CUIT
                                </label>
                                <br/>
                                <label htmlFor="cuit" className="text-red-600 uppercase text-sm font-bold leading-tight tracking-normal">
                                    {error ? error : ""}
                                </label>
                                <div className="relative mb-5 mt-2">
                                    {/* <div className="absolute w-10 right-0 bg-green-600 h-10"></div> */}
                                    <input id="cuit"  name="cuit" onChange={handleChange} value={person.cuit} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="XX-XXXXXXXX-X"></input>
                                    <button 
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {handleCUIT(person.cuit)}}> 
                                        Verificar CUIT
                                    </button>
                                    {
                                        cross
                                        ?
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute right-1 top-2" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        
                                        :
                                        <></>
                                    }
                                    {
                                        check
                                        ?
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute right-1 top-2" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        :
                                        <></>
                                    }
                                </div>
                                <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                    Nombre y Apellido
                                </label>
                                <div className="relative mb-5 mt-2">
                                    <input id="name" name="name"  onChange={handleChange} value={person.name +" "+ person.lastName} className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Nombre y Apellido" />
                                </div>

                                <label htmlFor="email"  className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                                    e-Mail
                                </label>
                                <div className="relative mb-5 mt-2">
                                    <input id="email"  name="email" onChange={handleChange} value={person.username} className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="e-Mail" />
                                </div>
            

                                <div className="flex items-center justify-center m-auto w-full">
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
                        <div id="third" className={`${tabs.creditCard ? `` : `hidden`}  flex bg-white justify-center p-2 `}>
                            <CreditCard person={person} setCard={setCard} card={card} coupon={coupon} setCoupon={setCoupon}/>
                        </div>
                        <div id="quarter" className={`${tabs.pointCard ? `` : `hidden`}  p-4`}>

                            <div className='text-white max-w-xs my-auto mx-auto bg-gradient-to-r from-pink-500 to-purple-500 p-4 py-5 px-5 rounded-xl'>
                                <div className="flex justify-between">
                                    <div>
                                        <h2>Puntos: </h2>
                                        <p className='text-2xl font-bold'> {points}</p>
                                    </div>
                                    <div className="flex items-center ">
                                        <img src={logo.src} className={"w-16 relative lg:w-24"} />
                                    </div>
                                </div>
                                <div className='flex justify-between mt-5 w-48 '>
                                    <div>
                                        <h3 className="text-xs"> Titular </h3>
                                        <p className="font-bold"> {person.name} { person.lastName} </p>
                                    </div>
                                </div>
                            </div>
                            <hr className='my-5'/>
                            <div className="justify-center">

                                <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Detalle de Facturaci&oacute;n</h1>

                                <select id="user"
                                        className="text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        onChange={handleChangeUsers}
                                >
                                    <option value="">Seleccione el usuario </option>
                                    {
                                        users.map((user, index) => {
                                            return (
                                                <option key={index} value={user.username} name={`${user.name}`}>{user.name}</option>
                                            )
                                        })
                                    }
                                </select>

                                <a onClick={() => handleCreditPoints(person.username)}
                                    aria-label="checkout-products"
                                    className="mt-8 w-80 bg-gradient-to-r from-blue-900 to-blue-500 mx-auto text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                    justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-blue-600 rounded-sm"
                                >Tarjeta de Puntos. Saldo: {points}</a>

                                


                            </div>
                        </div>
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


export async function getServerSideProps(context) {
    const session = await getSession(context)
    const users = await findAll();
    if(session == null) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props:{},
        };
    }
    const myPoints = await getPoints(session.user.username);
    const user = session.user;
    return {
        props: {
            myPoints,
            user,
            users
        },
    }
}

