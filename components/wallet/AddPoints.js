import React, { useState } from "react";


function addPoints({visible, onClose}){
    const handleOnClose = (e) => {
        if(e.target.id === "container") onClose()
    }

    const [amount, setAmount] = useState()
    const [errors, setErrors] = useState("")

    function validate(value) {
        if(value !== "^[0-9]*$"){
            return "Solo numeros permitidos *"
        }
    }

    function handleInputAmount(e){
        setAmount(e.target.value)
    }

    function handleCheckErrors(e){
        e.preventDefault();
        setErrors(validate(e.target.value))
        handleSubmit(e)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(amount >= 1){
        alert("Cantidad de puntos añadidos " + amount)
        setAmount("")
        setErrors("")
        onClose()
        }
    }

    if(!visible) return null;

    return (
                <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
                <div className="w-auto bg-white text-sm text-palette-primary font-bold px-5 py-2 rounded mb-5">
                    <div className="m-2 -ml-4 text-2xl flex justify-center">Sumar Puntos</div>
                    <div className="flex flex-col">
                        <input 
                            type="text"
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="Cantidad"
                            value={amount}
                            onChange={(e) => handleInputAmount(e)}
                        />

                    </div>
                    {errors && (<p className="m-2 -ml-4 text-2xl flex justify-center">{errors}</p>)}
                    <div className="flex justify-between items-center w-50 h-10">
                        <a
                        onClick={onClose}
                        aria-label="back-to-products"
                        className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 py-2 px-4
                        justify-center items-center md:-mt-2  focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm cursor-pointer">
                        Cancelar
                        </a> 
                        <a
                        onClick={(e) => handleCheckErrors(e)}
                        aria-label="back-to-products"
                        className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 py-2 px-4
                        justify-center items-center md:-mt-2  focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm cursor-pointer">
                        Aceptar
                        </a> 
                    </div>
                </div>
                    
            </div>

    )

}
export default addPoints;


