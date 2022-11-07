import {useEffect, useState} from "react";
import CartTable from '@/components/cart/Pretable'
import {useCartContext, useCleanCartContext} from '@/context/Store'
import {getSession} from "next-auth/client";
import {getPoints} from "../../services/walletService";
import {findAll, getByUsername} from "../../services/userService";
import PreTable from "@/components/cart/Pretable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint , faWallet, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import PageTitle from '@/components/PageTitle'
import Link from "next/link";


const Presupuesto = ({userSession, myPoints, users}) => {
    const [cart, checkoutUrl] = useCartContext()
    const cleanCart = useCleanCartContext()
    const [points, setPoints] = useState(myPoints)
    
    
    const [person, setPerson] = useState({
        "username": "",
        "name": "",
        "lastName": "",
        "username": "",
        "address" : "",
        "cuit": ""
    })

    const handleChange = (e) => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value,
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


    const print = () => {
        let mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title + '</h1>');
        mywindow.document.write(document.getElementById("presupuesto").innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
        return true
    }
    return(
        <div>
            <div id="presupuesto">
                <div><PageTitle text="Presupuesto" /></div>
                {
                    userSession?.role?.includes("ADMIN") 
                    ?
                    <div className="m-auto w-1/2">
                        <select id="user" className="text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                    onChange={handleChangeUsers}>
                                        <option value=""> Seleccione el usuario </option>
                                        {
                                            users.map((user, index) => {
                                                return (
                                                    <option key={index} value={user.username} name={`${user.name}`}>{user.name}</option>
                                                )
                                            })
                                        }
                        </select>
                    </div>
                    :
                    <></>

                }

                
                <div className="max-h-96"><PreTable cart={cart}/></div>
            </div>
            <div className="flex w-full justify-center">
                <button onClick={print} className="w-20 h-20 bg-indigo-500 m-10 rounded-full hover:bg-indigo-700"><FontAwesomeIcon icon={faPrint} className="m-auto w-10 h-10 text-white"/></button>
                <button className="w-20 h-20 bg-red-500 m-10 rounded-full hover:bg-red-700"><FontAwesomeIcon icon={faTrash} className="m-auto w-10 h-10 text-white"/></button>
                {
                    userSession?.role?.includes("ADMIN") 
                    ?
                        <div>
                            <button className="w-20 h-20 bg-green-500 m-10 rounded-full hover:bg-green-700"><FontAwesomeIcon icon={faCheck} className="m-auto w-10 h-10 text-white" />
                            </button><Link href={"/checkout/payment"} passHref><button className="w-20 h-20 bg-yellow-500 m-10 rounded-full hover:bg-yellow-700"><FontAwesomeIcon icon={faWallet} className="m-auto w-10 h-10 text-white" /></button></Link>
                        </div>
        
                    :
                        <>
                        </>
                }
                
            </div>
        </div>
    )
}
 

export default Presupuesto;


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
    const userSession = session.user;
    return {
        props: {
            myPoints,
            userSession,
            users
        },
    }
}

