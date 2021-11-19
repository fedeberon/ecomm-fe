import {search} from "../../services/productService";
import {useEffect, useState} from "react";
import logo from "../../images/default.jpeg";
import SearchProduct from "@/components/stock/SearchProduct";
import {save} from "/services/stockService"

const Create = () => {

    const [list, setList] = useState([])
    const[show, isShow] = useState(false)
    const[result, setResult] = useState([])

    useEffect(() => {

        console.log("list" , list)

    }, [list])

    const searchValue = async (e) => {
        if(e.target.value === '') return;
        const result = await search(e.target.value);
        setResult(result.data);
    }

    const remove = (id) => {
        const array = [...list];
        list.forEach((item, index) => {
            if(item.id = id) {
                array.splice(index, 1);
            }
        })
        setList(array)
    }

    const add = (item) => {
        console.log("item", item)
        const updatedCarsArray = [...list, {
            "id" : item.id,
            "product" : {
                "id": item.id,
            },
            "name" : item.name,
            "description": item.description,
            "code" : item.code,
            "stock":  item.stock,
            "category" : item.category,
            "image":  item.images && item.images.length != 0 ? item.images[0].link : logo.src
        }];
        setList(updatedCarsArray)
        toggleModal();
        setResult([])
        document.getElementById('search').value = ""
    }

    const showOnShop = (item) => {
        window.open(`/products/${item.id} `, `_blank`)
    }

    const toggleModal = () => {
        isShow(!show)
    }

    const saveStock = async () => {
        const result = await save(list)
    }

    return (
        <>
            <section className="container mx-auto p-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">C&oacute;digo</th>
                                <th className="px-4 py-3">Stock</th>
                                <th className="px-4 py-3">Categoria</th>
                                <th className="px-4 py-3"></th>
                                <th className="px-4 py-3"></th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">

                            {
                                list === undefined || list.length == 0
                                    ?
                                    <>No hay items</>
                                    :
                                    list.map(item => (
                                        <tr className="text-gray-700">
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                        <img className="object-cover w-full h-full rounded-full"
                                                             src={item.image}
                                                             alt="" loading="lazy"/>
                                                        <div className="absolute inset-0 rounded-full shadow-inner"
                                                             aria-hidden="true"></div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-black">{item.name}</p>
                                                        <p className="text-xs text-gray-600">{item.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-ms font-semibold border">{item.code}</td>
                                            <td className="px-4 py-3 text-sm border">{item.stock}</td>
                                            <td className="px-4 py-3 text-xs border">
                                            <span
                                                className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> {item.category.name} </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm border">
                                                <div className="custom-number-input h-10 w-32">
                                                    <div
                                                        className="flex flex-row h-10 w-full rounded-lg  bg-transparent mt-1">
                                                        <button data-action="decrement"
                                                                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                                            <span className="m-auto text-2xl font-thin">−</span>
                                                        </button>
                                                        <input
                                                               className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                                               name="custom-input-number" value="0"></input>
                                                        <button data-action="increment"
                                                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                                            <span className="m-auto text-2xl font-thin">+</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm border">
                                                <a href={"#"} onClick={() => remove(item.id)}>Quitar</a>
                                            </td>

                                        </tr>
                                    ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-center h-full">
                <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={toggleModal}>Agregar
                </button>

                <button className="py-2 px-4 ml-4 bg-green-500 text-white rounded hover:bg-blue-700"
                        onClick={saveStock}>Guardar
                </button>
            </div>

            <SearchProduct show={show} add={add} searchValue={searchValue} showOnShop={showOnShop} result={result}/>

        </>

    )
}

export default Create