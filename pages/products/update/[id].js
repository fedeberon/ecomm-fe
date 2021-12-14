import {getProduct, save} from "../../../services/productService";
import {useState} from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
/*https://www.npmjs.com/package/react-notifications*/


const Update = ({product}) => {
    const [activeSubmit, setActiveSubmit] = useState(false)
    const [productToEdit, setProduct]  = useState({
        "id": product.id,
        "name" : product.name,
        "price" : product.price,
        "description" : product.description,
        "category" : {
            "id" : product?.category?.id
        },
        "code" : product.code,
        "stock" : product.stock
    })

    const [validate, setValidate] = useState({
        "name" : false,
        "price": false,
        "description": false,
        "category" : false,
        "code" : false,
        "stock" : false
    })


    const goToProductList = () => {
        window.location.href = '/products'
    }

    const showOnShop = () => {
        window.location.href = '/products/' + product.id
    }

    const handleChange = (e) => {
        setProduct({
            ...productToEdit,
            [e.target.name]: e.target.value,
        });
    }

    const handleChangeCategory = (e) => {
        setProduct({
            ...product,
            "category": {
                "id": e.target.value
            },
        });
    }

    const submit =  (e) => {
        e.preventDefault();
        save(productToEdit).then((result) => {
            if (result.status === 202) {
                NotificationManager.info('Se guardaron los datos correctamente', ' Producto # ' + product.id);
            }
        });
    }


    return (
        <>
            <NotificationContainer/>
            <div className="flex justify-center">
                <form className="w-full max-w-lg" onSubmit={submit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2 text-3xl" htmlFor="grid-first-name">
                               ID #{product.id}
                            </label>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-last-name">
                                Nombre
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="name" type="text"
                                placeholder="Nombre del Producto"
                                name="name"
                                value={productToEdit.name}
                                onChange={handleChange}
                            />
                            <p className={`text-red-500 text-xs italic ${productToEdit.name ? "invisible" : ""}`}>Complete el nombre.</p>
                        </div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-last-name">
                                Descripcion
                            </label>
                            <textarea
                                autoComplete="off" value={productToEdit.description}
                                className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name" placeholder="Descripci&oacute;n del producto" name="description" rows="3"
                                onChange={handleChange}
                            />
                            <p className={`text-red-500 text-xs italic ${validate.description ? "invisible" : ""}`}>Complete la descripci&oacute;n.</p>
                        </div>

                        <div className="w-full">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-city">
                                C&Oacute;DIGO
                            </label>
                            <input
                                autoComplete="off"
                                value={productToEdit.code}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-city" type="text" placeholder="C&oacute;dido del producto"
                                name="code"
                                onChange={handleChange}
                            />
                            <p className={`text-red-500 text-xs italic ${productToEdit.code ? "invisible" : ""}`}>Complete la c&oacute;digo.</p>
                        </div>

                        <div className="w-full">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-city">
                                CATEGORIA
                            </label>
                            <select onChange={handleChangeCategory} value={productToEdit.category.id} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3    px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="0">Seleccione</option>
                                <option value="1">Jugueteria</option>
                                <option value="2">Accesorios</option>
                            </select>
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
                                        type="text"
                                        id="price"
                                        autoComplete="off"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 pl-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        placeholder="0.00" name="price"
                                        onChange={handleChange}
                                        maxLength = "7"
                                        value={productToEdit.price}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]?[0-9]?(\.[0-9][0-9]?)?/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                    <p className={`text-red-500 text-xs italic ${validate.price ? "invisible" : ""}`}>Complete el precio.</p>
                                </div>
                            </div>

                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-zip">
                                STOCK
                            </label>
                            <input
                                id="grid-zip"
                                placeholder="Stock"
                                name="stock"
                                autoComplete="off"
                                value={productToEdit.stock}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                onChange={handleChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                            <p className={`text-red-500 text-xs italic ${validate.stock ? "invisible" : ""}`}>Complete el stock.</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <a onClick={goToProductList} className={`hover:bg-gray-400 hover:text-white  text-black py-2 px-4 mr-2 rounded cursor-pointer`}>
                            Ir a la lista
                        </a>

                        <a onClick={showOnShop} className={`hover:bg-gray-400 hover:text-white  text-black py-2 px-4 mr-2 rounded cursor-pointer`}>
                            Ver en el Shop
                        </a>


                        <button type="submit" onClick={submit}
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  ${activeSubmit ? "" : "select-none"}`}>
                            Guardar
                        </button>
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

