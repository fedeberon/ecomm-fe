import {useState} from "react";

const CreditCard = ({person, setCard, card , coupon, setCoupon}) => {



    return (

            <div className="justify-between">
                
                <div id="card" className={"m-auto w-80 h-48 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500"}
                    style={{transition: "0.6s", transformStyle: "preserve-3d;"}}>

                    <div className={` w-full h-full flex flex-col gap-6 p-6 ${ card == "amex" ? "bg-gradient-to-br from-green-500 via-gray-300 to-green-500" : "" } ${ card == "visa" ? "bg-gradient-to-tr from-blue-900 to-blue-500" : "" } ${ card == "mastercard" ? "bg-gradient-to-tr from-yellow-800 to-yellow-700" : "" } transition-all duration-100 delay-200 z-20`}
                        style={{transform: "rotateY(0deg);"}}>

                        <div className="flex justify-between items-center">
                            <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                                alt='Smart card' className="w-12"/>

                            <img
                                src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${card}.png`}
                                alt="Visa image" className="w-12"/>
                        </div>

                        <div className={`${ card == "amex" ? "text-black" : "text-white" }`}>
                            <label htmlFor="" className="hidden">Card Number</label>
                            <input type="text" id="" value="**** **** **** ****" readOnly
                                className="outline-none w-full  bg-transparent text-center text-2xl"/>
                        </div>

                        <div className="w-full flex flex-row justify-between">

                            <div className={`${ card == "amex" ? "text-black" : "text-white" } w-full flex flex-col`}>
                                <label htmlFor="">Titular</label>
                                <input type="text" id="" value={`${person.name}`} readOnly
                                    className="outline-none bg-transparent"/>
                            </div>

                            <div className={`${ card == "amex" ? "text-black" : "text-white" } w-1/4 flex flex-col`}>
                                <label htmlFor="">Expires</label>
                                <input type="text" id="" value="**/**" readOnly className="outline-none bg-transparent"/>
                            </div>

                        </div>

                    </div>
                </div>

                

                <div className="bg-white w-full items-center flex grid grid-cols-1">
                    <div className=" z-0 my-3">
                        <label htmlFor="floating_email"
                               className="mx-6 block text-sm font-medium text-gray-900 dark:text-gray-400">
                            N&uacute;mero de Cup&oacute;n</label>
                        <input type="email" name="floating_email"
                               className="m-6 block py-2.5 w-80 text-sm text-gray-900 bg-gray-100 rounded-t border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder="******************" onChange={(e) => {
                                    setCoupon(e.target.value)
                                }}/>
                        
                    </div>
                    <div className="">
                        <label htmlFor="countries"
                               className="mx-6 block text-sm font-medium text-gray-900 dark:text-gray-400">
                            Seleccione la tarjeta de cr&eacute;dito</label>
                        <select id="cards"
                                onChange={(e) => {
                                    setCard(e.target.value)
                                }}
                                className="m-6 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={`visa`}>Visa</option>
                            <option value={`amex`}>Amex</option>
                            <option value={`mastercard`} >Matercard</option>
                        </select>
                    </div>
                </div>
            </div>

    )
}
export default CreditCard;