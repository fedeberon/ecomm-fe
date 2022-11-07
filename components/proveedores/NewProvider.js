import { NotificationContainer } from "react-notifications";
import useProvider from "../../hooks/useProvider";
import {useEffect, useState, useMemo } from "react";


const NewProvider = () => {
    const initialForm = useMemo(() => ({
        name: "",
        address: "",
        cuit: "",
    })
);

    const validationsForm = (form) => {
        let errors = {};
        let regexName = /^[A-Za-z]+$/;

        if (!form.name.trim()) {
            errors.name = "El campo 'Nombre' es requerido";
        }
        if (!form.address.trim()) {
            errors.address = "El campo 'Direccion' es requerido";
        }
        if (!form.cuit.trim()) {
            errors.cuit = "El campo 'Cuit' es requerido";
        }
        return errors;
    };

    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit, } = useProvider(initialForm, validationsForm);

    return (
            <>
            <NotificationContainer />
            <div className="flex justify-center">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="name">
                                Nombre
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="name" type="text"
                                placeholder="Nombre del proveedor"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.name && <p className={`text-red-500 text-xs italic`}>{errors.name}</p>}
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="name">
                                Direccion
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="name" type="text"
                                placeholder="Direccion del proveedor"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.address && <p className={`text-red-500 text-xs italic`}>{errors.address}</p>}
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="name">
                                CUIT
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="name" type="text"
                                placeholder="Cuit"
                                name="cuit"
                                value={form.cuit}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.cuit && <p className={`text-red-500 text-xs italic`}>{errors.cuit}</p>}
                        </div>
                    </div>

                    <button type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8`}
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </>)
}

export default NewProvider;