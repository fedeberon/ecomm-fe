import {useState} from "react";
import {save} from "../../services/productService";
import {useRouter} from 'next/router'

const NewProduct = () => {
    const router = useRouter()
    const [activeSubmit, setActiveSubmit] = useState(false)
    const [product, setProduct]  = useState({
        "name" : "",
        "price" : "",
        "description" : "",
        "category" : {
            "id" : ""
        },
        "code" : "",
        "stock" : ""
    })

    const [validate, setValidate] = useState({
        "name" : false,
        "price": false,
        "description": false,
        "category" : false,
        "code" : false,
        "stock" : false
    })

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
        validateInputs()
        setActiveSubmit(validateInputs())
    }

    const handleChangeCategory = (e) => {
        setProduct({
            ...product,
            "category": {
                "id": e.target.value
            },
        });
    }

    const readyToSubmit = () => {
        return  validate.name &&
                validate.price &&
                validate.description &&
                validate.category &&
                validate.code &&
                validate.stock
    }

    const validateInputs = () => {
        validate.name = product.name.length >= 5 ? true : false
        validate.price = product.price.length >= 3 ? true : false
        validate.description = product.description.length >= 5 ? true : false
        validate.code = product.code.length >= 5 ? true : false
        validate.stock = product.stock.length >= 5 ? true : false
    }

    const submit =  (e) => {
        e.preventDefault();
        save(product).then((result) => {
            if (result.status === 202) {
                router.push('/')
            }
        });
    }


    return (
            <div className="flex justify-center">
                    <form className="w-full max-w-lg" onSubmit={submit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-first-name">
                                    Nombre
                                </label>
                                <input
                                    autoComplete="off"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="name" type="text"
                                    placeholder="Nombre del Producto"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                />
                                    <p className={`text-red-500 text-xs italic ${validate.name ? "invisible" : ""}`}>Complete el nombre.</p>
                            </div>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-last-name">
                                    Descripcion
                                </label>
                                <textarea
                                    autoComplete="off"
                                    className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name" placeholder="Descripci&oacute;n del producto" name="description" rows="3"
                                    onChange={handleChange}
                                />
                                <p className={`text-red-500 text-xs italic ${validate.description ? "invisible" : ""}`}>Complete la descripci&oacute;n.</p>
                            </div>

                            <div className="w-full">
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-city">
                                    C&oacute;digo
                                </label>
                                <input
                                    autoComplete="off"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3    px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-city" type="text" placeholder="Cod. del producto"
                                    name="code"
                                    onChange={handleChange}
                                />
                                <p className={`text-red-500 text-xs italic ${validate.code ? "invisible" : ""}`}>Complete la c&oacute;digo.</p>
                            </div>

                            <div className="w-full">
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-city">
                                    Categoria
                                </label>
                                <select onChange={handleChangeCategory} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3    px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
                                        Precio
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
                                    Stock
                                </label>
                                <input
                                        id="grid-zip"
                                        placeholder="Stock"
                                        name="stock"
                                        autoComplete="off"
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
                        <button type="submit"
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8  ${activeSubmit ? "" : "select-none"}`}>
                            Guardar
                        </button>
                    </form>
            </div>
    )
}

export default NewProduct;