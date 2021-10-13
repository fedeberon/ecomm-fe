import {useState} from "react";
import {save} from "../../services/productService";
import { useRouter } from 'next/router'
const NewProduct = () => {
    const router = useRouter()
    const [product, setProduct]  = useState({
        "name":"",
        "price":"",
        "category":"" ,
        "stock": ""
    })

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }

    const submit =  (e) => {
        debugger;
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
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="name" type="text" placeholder="Nombre del Producto" name="name"
                                    onChange={handleChange}
                                />
                                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                            </div>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-last-name">
                                    Descripcion
                                </label>
                                <textarea
                                    className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name"  type='text' placeholder="Doe" name="description"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-city">
                                    Codigo
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-city" type="text" placeholder="Albuquerque" name="codigo"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <div>
                                    <label htmlFor="price"
                                           className="block text-sm font-medium text-gray-700">Price</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                          <span className="text-gray-500 sm:text-sm">
                                            $
                                          </span>
                                        </div>
                                        <input type="text"  id="price"
                                               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                               placeholder="0.00" name="price"
                                               onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-zip">
                                    Stock
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-zip" type="text" placeholder="90210"
                                    name="stock"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar
                        </button>
                    </form>
            </div>
    )
}

export default NewProduct;