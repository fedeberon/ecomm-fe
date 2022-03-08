import {useState} from "react";

const CreditCard = ({name, setCard, card , coupon, setCoupon}) => {





    return (

            <div className={`flex`}>

            <div id="card" className="relative w-96 h-60 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500"
                 style={{transition: "0.6s", transformStyle: "preserve-3d;"}}>

                <div
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center gap-6 p-6 bg-gradient-to-tr from-gray-900 to-gray-700 transition-all duration-100 delay-200 z-20"
                    style={{transform: "rotateY(0deg);"}}>

                    <div className="flex justify-between items-center">
                        <img
                            src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                            alt='Smart card' className="w-12"/>

                        <img
                            src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${card}.png`}
                            alt="Visa image" className="w-12"/>
                    </div>

                    <div className="">
                        <label htmlFor="" className="hidden">Card Number</label>
                        <input type="text" id="" value="**** **** **** ****" readOnly
                               className="outline-none w-full bg-transparent text-center text-2xl"/>
                    </div>

                    <div className="w-full flex flex-row justify-between">

                        <div className="w-full flex flex-col">
                            <label htmlFor="">Titular</label>
                            <input type="text" id="" value={`${name}`} readOnly
                                   className="outline-none bg-transparent"/>
                        </div>

                        <div className="w-1/4 flex flex-col">
                            <label htmlFor="">Expires</label>
                            <input type="text" id="" value="**/**" readOnly className="outline-none bg-transparent"/>
                        </div>

                    </div>

                </div>

                <div
                    className="absolute top-0 left-0 w-full h-full flex flex-col gap-3 justify-center bg-gradient-to-tr from-gray-900 to-gray-700 transition-all z-10"
                    style={{transform: "rotateY(180deg);"}}>

                    <div className="w-full h-12 bg-black"></div>

                    <div className="px-6 flex flex-col gap-6 justify-center">
                        <div className="flex flex-col items-end">
                            <label htmlFor="">CVV</label>
                            <input type="text" id="" value="123" readOnly
                                   className="outline-none rounded text-black w-full h-8 text-right"
                                   style={{background: "repeating-linear-gradient(45deg, #ededed, #ededed 5px, #f9f9f9 5px, #f9f9f9 10px);"}}/>
                        </div>


                        <div className="flex justify-start items-center">
                            <img
                                src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${card}.png`}
                                alt="" className="w-12"/>
                        </div>

                    </div>

                </div>
            </div>

                <div className="grid grid-cols-1">
                    <div className="relative z-0 mb-6">
                        <input type="email" name="floating_email"
                               className="ml-6 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder="" onChange={(e) => {
                                    setCoupon(e.target.value)
                                }}/>
                        <label htmlFor="floating_email"
                               className="ml-6 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            N&uacute;mero de Cup&oacute;n</label>
                    </div>
                    <div className="relative z-0 mb-6">
                        <label htmlFor="countries"
                               className="ml-6 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                            Seleccione la tarjeta de cr&eacute;dito</label>
                        <select id="countries"
                                onChange={(e) => {
                                    setCard(e.target.value)
                                }}
                                className="ml-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={`visa`}>Visa</option>
                            <option value={`amex`}>Amex</option>
                            <option value={`mastercard`} >Matercard</option>
                            <option>Matercard</option>
                        </select>
                    </div>
                </div>
            </div>

    )
}
export default CreditCard;