import {search} from "../../services/productService";
import {useState} from "react";
import SearchProduct from "@/components/stock/SearchProduct";
import {save} from "../../services/stockService"
import {NotificationManager, NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import Loading from "../utils/Loading";
import Router from 'next/router';
import Link from "next/link";

const Create = ({providers}) => {

    const [errors, setErrors] = useState({})
    const [stocks, setStocks] = useState([])
    const [stock, setStock] = useState({
        "order": "",
        "provider": {
            "id": 0
        },
        "items": stocks
    })
    const [show, isShow] = useState(false)
    const [result, setResult] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const searchValue = async (e) => {
        if (e.target.value.trim() === '') {
            return;
        }
        const resultSearch = await search(e.target.value);
        setResult(resultSearch);
    }

    const remove = (id) => {
        setIsLoad(true)
        const array = [...stocks];
        stocks.forEach((item, index) => {
            if (item.id = id) {
                array.splice(index, 1);
            }
        })
        setStocks(array)
        setIsLoad(false)
    }

    const add = (product) => {
        setIsLoad(true)
        const updatedCarsArray = [...stocks, {
            "quantity": 0,
            product
        }];
        setStocks(updatedCarsArray)
        toggleModal();
        setResult([])
        document.getElementById('search').value = ""
        setIsLoad(false)
    }

    const updateSize = (id, size) => {
        const array = [...stocks];
        stocks.forEach((item, index) => {
            if (item.product.id == id) {
                item.size = {
                    "id": size
                }
            }
        })
        setStocks(array)
    }


    const showOnShop = (product) => {
        window.open(`/products/${product.id} `, `_blank`)
    }

    const toggleModal = () => {
        isShow(!show)
    }

    const validateStock = () => {
        let errors = {}
        if (stock?.order == null || stock.order == "") {
            errors.order = "El campo 'Orden' es requerido";
            setErrors(errors)
        }
        if (stock.provider.id == null || stock.provider.id == "") {
            errors.provider = "El campo 'Proveedor' es requerido";
            setErrors(errors)
        }
        stocks.map(item => {
            if (item.quantity == "" || item.quantity < 1) {
                errors.quantity = "El campo 'Cantidad' es requerido";
                setErrors(errors)
                return;
            }
        })
        stocks.map(item => {
            if (item.size == undefined) {
                errors.talle = "El campo 'Talle' es requerido";
                setErrors(errors)
                return;
            }
        })
        setErrors(errors)
    }


    const saveStocks = () => {
        validateStock(stocks);
        setIsLoad(true)
        stock.items = stocks
        if (errors.order == undefined && errors.quantity == undefined && errors.provider == undefined && errors.talle == undefined) {
            save(stock).then((result) => {
            if (result.status == 200) {
              NotificationManager.info('El stock se cargo correctamente', 'Administracion de stock' , 3000);
                Router.push({pathname:`/stock/${result.data.id}`});
            } else {
              NotificationManager.info('No fue posible cargar el articulo, por favor revisar Orden y proveedor ', 'Administracion de productos' , 3000)
            }
          });
        } else {
            const errorMessage = errors.quantity ? "Revisar cantidad de artículos" :
                errors.order ? "Revisar número de orden" :
                    errors.provider ? "Revisar proveedor" :
                        errors.talle ? "Revisar talla" : "No se pudo cargar el artículo";
            const pageTitle = 'Validación de datos';
            const message = `${errorMessage}`;

            NotificationManager.warning(message, pageTitle, 3000)
        }
        setIsLoad(false)
        return;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setStock({
            ...stock,
            [e.target.name]: e.target.value,
            "items": stocks
        });
        validateStock(stocks);
    }

    const handleQuantity = (e, index) => {
        const {name, value} = e.target;
        stocks[index][name] = value;
        validateStock(stocks);
    }

    const handleChangeProvider = (e) => {
        const {value} = e.target;
        setStock({
            ...stock,
            "provider": {
                "id": value
            }
        });
    }

    return (
        <>
            <NotificationContainer/>
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col mr-5">
                    <input name="order" className="border border-2 rounded-r px-4 py-2 w-full" type="text"
                           placeholder="Ingrese el n&uacute;mero de comprobante ..." onChange={(e) => handleChange(e)}/>
                    {errors.order && <p className={`text-red-500 text-xs italic mt-1`}>* Campo necesario</p>}
                </div>

                <div className="flex flex-col mr-5">
                    <select name="provider" className="border border-2 rounded-r px-4 py-2 w-full"
                            onChange={handleChangeProvider}>
                        <option selected disabled={true} value="">Seleccionar Proveedor</option>
                        {
                            providers.map(provider => (
                                <option key={provider.id} value={provider.id}>{provider.name}</option>
                            ))
                        }
                    </select>
                    {errors.provider && <p className={`text-red-500 text-xs italic mt-1`}>* Campo necesario</p>}
                </div>

                <button
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={toggleModal}
                >
                    Agregar Producto
                </button>
            </div>

            <section className="container mx-auto p-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">Talles</th>
                                <th className="px-4 py-3">stocks</th>
                                <th className="px-4 py-3">Cantidad</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {stocks === undefined || stocks.length == 0 ? (
                                <>No hay items</>
                            ) : (
                                stocks.map((item, index) => (
                                    <tr className="text-gray-700">
                                        <td className="px-4 py-3 border">
                                            <Link legacyBehavior href={`/products/${item.product.id}`}>
                                                <a target={"_blank"}>
                                                    <div className="flex items-center text-sm">
                                                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                            <img
                                                                className="object-cover w-full h-full rounded-full"
                                                                src={item.product.image}
                                                                alt=""
                                                                loading="lazy"
                                                            />
                                                            <div
                                                                className="absolute inset-0 rounded-full shadow-inner"
                                                                aria-hidden="true"
                                                            ></div>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-black">
                                                                {item.product.name}
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                {item.product.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">
                                            <select
                                                onChange={(event) => updateSize(item.product.id, event.target.value)}>
                                                <option selected disabled={true} value="">Seleccionar Talle</option>
                                                <option value="0">Sin Talle</option>
                                                {
                                                    item.product.sizes.map(provider => (
                                                        <option name={provider.name}
                                                                value={provider.id}>{provider.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">
                                            {item.product.stock}
                                        </td>
                                        <td className="px-4 py-3 text-sm border">
                                            <div className="custom-number-input h-10 w-32">
                                                <div
                                                    className="flex flex-row h-10 w-full rounded-lg  bg-transparent mt-1">
                                                    <input
                                                        onChange={(e) => handleQuantity(e, index)}
                                                        type="number"
                                                        placeholder="00"
                                                        className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                                        name="quantity"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">
                                            <button href={"#"} onClick={() => remove(item.product.id)}>
                                                Quitar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className="flex items-center justify-center h-full">
                <button
                    className="py-2 px-4 my-10 ml-4 bg-green-500 text-white rounded hover:bg-blue-700"
                    onClick={saveStocks}
                >
                    Guardar
                </button>
            </div>
            <div className="flex items-center justify-center h-full">
                {errors.quantity &&
                    <p className={`text-red-500 text-xl italic w-100`}>{errors.quantity} Elegir productos</p>}
            </div>
            <SearchProduct
                show={show}
                isShow={isShow}
                add={add}
                searchValue={searchValue}
                showOnShop={showOnShop}
                result={result}
            />

            {
                isLoad ?
                    <Loading></Loading>
                    :
                    <></>
            }
        </>
    );
}

export default Create