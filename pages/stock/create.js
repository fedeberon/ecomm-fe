import {useEffect, useState} from "react";
import {search} from "../../services/productService";

const Create = () => {

    const [list, setList] = useState([])

    const[show, isShow] = useState(true)

    const[result, setResult] = useState([])

    const searchValue = async (e) => {
        const result = await search(e.target.value);
        setResult(result.data);
    }

    useEffect(() => {
        console.log("list", list)
    }, [list])

    const add = (item) => {
        const updatedCarsArray = [...list, {
            "name" : item.name
        }];
        setList(updatedCarsArray)
    }

    const toggleModal = () => {
        isShow(!show)
    }

    return (
        <>
            <section className="container mx-auto p-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Age</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">

                            {
                                list === undefined
                                ?
                                    <>No hay items</>
                                :
                                list.map(item => (
                                    <tr className="text-gray-700">
                                        <td className="px-4 py-3 border">
                                            <div className="flex items-center text-sm">
                                                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                    <img className="object-cover w-full h-full rounded-full"
                                                         src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                                         alt="" loading="lazy"/>
                                                    <div className="absolute inset-0 rounded-full shadow-inner"
                                                         aria-hidden="true"></div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-black">Sufyan</p>
                                                    <p className="text-xs text-gray-600">Developer</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-ms font-semibold border">22</td>
                                        <td className="px-4 py-3 text-xs border">
                                            <span
                                                className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">6/4/2000</td>
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
                        onClick={toggleModal}>Nuevo
                </button>
            </div>
            <div className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${show ? "" : "hidden"}  `} id="modal">
                <div
                    className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-700 opacity-75"/>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <div
                        className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <input type="text" placeholder={"Buscar ..."} onChange={searchValue} className="w-full bg-gray-100 p-2 mt-2 mb-3"/>
                            <div
                                className="right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    {

                                        result.map((item, index) => (
                                            <>

                                                <a key={index} href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"
                                                   tabIndex="-1">{item.name}</a>

                                                <button onClick={() => add(item)}>Agregar</button>
                                            </>


                                        ))

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default Create