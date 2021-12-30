import {getProduct} from "../../../services/productService";
import useForm from "../../../hooks/useForm";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {  useState } from "react";
/*https://www.npmjs.com/package/react-notifications*/


const Update = ({product}) => {

    console.log(product)
    
    const validationsForm = (form) =>{
        console.log("Entro a valitacions")
        let errors ={};

        if (!form.name.trim()){
            errors.name = "El campo 'Nombre' es requerido";
        }

        if (form.price <= 0){
            errors.price = "El campo 'Precio' es requerido";
        }

        if (!form.description.trim()){
            errors.description = "El campo 'Descripcion' es requerido";
        }

        if (form.category.id == 0){
            errors.category = "El campo 'Categoria' es requerido";
        }

        if (!form.code.trim()){
            errors.code = "El campo 'Codigo' es requerido";
        }

        if (form.stock <= 0){
            errors.stock = "El campo 'Stock' es requerido";
        }

        if (form.points <0 &&  form.points.length() == 0){
            console.log("Entro a points error")
            errors.points = "El campo 'Puntos' es requerido";
        }
        
        return errors
    };
    
    const { 
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,} = useForm(product, validationsForm);
        
        const goToProductList = () => {
            window.location.href = '/products'
        }
        
        const showOnShop = () => {
            window.location.href = '/products/' + product.id
        }
        

    return (
        <>
            <NotificationContainer/>
            <div className="flex justify-center">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2 text-3xl" htmlFor="grid-first-name">
                               ID #{product.id}
                            </label>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="name">
                                Nombre
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="name" type="text"
                                placeholder="Nombre del Producto"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            /> 
                            {errors.name &&  <p className={`text-red-500 text-xs italic`}>{errors.name}</p>}
                        </div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-last-name">
                                Descripcion
                            </label>
                            <textarea
                                autoComplete="off" value={form.description}
                                className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name" placeholder="Descripci&oacute;n del producto" name="description" rows="3"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.description &&  <p className={`text-red-500 text-xs italic`}>{errors.description}</p>}
                        </div>

                        <div className="w-full">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="codigo">
                                C&Oacute;DIGO
                            </label>
                            <input
                                autoComplete="off"
                                value={form.code}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="codigo" type="text" placeholder="C&oacute;dido del producto"
                                name="code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                             {errors.code &&  <p className={`text-red-500 text-xs italic`}>{errors.code}</p>}
                        </div>

                        <div className="w-full">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="category">
                                CATEGORIA
                            </label>
                            <select onChange={handleChange} onBlur={handleChange} name="category" value={form.category.id} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3    px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="0">Seleccione</option>
                                <option value="1">Jugueteria</option>
                                <option value="2">Accesorios</option>
                            </select>
                            {errors.category &&  <p className={`text-red-500 text-xs italic`}>{errors.category}</p>}
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    PRECIO
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-2 pb-4 flex items-center pointer-events-none">
                                          <span className="text-gray-500 sm:text-sm">
                                            $
                                          </span>
                                    </div>
                                    <input
                                        type="number"
                                        id="price"
                                        autoComplete="off"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 pl-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        placeholder="0.00" name="price"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        maxLength = "7"
                                        required
                                        value={form.price}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]?[0-9]?(\.[0-9][0-9]?)?/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.price &&  <p className={`text-red-500 text-xs italic`}>{errors.price}</p>}
                                </div>
                            </div>

                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="stock">
                                STOCK
                            </label>
                            <input
                                type="number"
                                id="stock"
                                placeholder="Stock"
                                name="stock"
                                autoComplete="off"
                                value={form.stock}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                            {errors.stock &&  <p className={`text-red-500 text-xs italic`}>{errors.stock}</p>}
                        </div>
                    </div>
                    <div>

                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="puntos">
                                Puntos de producto
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="puntos" type="number"
                                placeholder="Puntos del producto"
                                name="points"
                                value={form.points}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.points &&  <p className={`text-red-500 text-xs italic`}>{errors.points}</p>}
                    </div>

                    <div className="mt-8">
                        <a onClick={goToProductList} className={`hover:bg-gray-400 hover:text-white  text-black py-2 px-4 mr-2 rounded cursor-pointer`}>
                            Ir a la lista
                        </a>

                        <a onClick={showOnShop} className={`hover:bg-gray-400 hover:text-white  text-black py-2 px-4 mr-2 rounded cursor-pointer`}>
                            Ver en el Shop
                        </a>

                        <button type="submit" onClick={handleSubmit}
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                            Guardar
                        </button>
                        <p className={`text-red-500 text-xs italic ${Object.keys(errors).length === 0 ? "invisible": "" } `}>Complete los campos.</p>
                    </div>
                </form>
            </div>
        </>
    )


}


export async function getServerSideProps({ params }) {
    const product = await getProduct(params.id)

    return {
        props: {
            product,
        },
    }
}

export default Update

