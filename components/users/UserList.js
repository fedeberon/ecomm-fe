import Link from "next/link";
import { useState } from "react";
import { updateTwinsCard } from "services/productService";


const UserList = ({ users }) => {
    const [twins, setTwins] = useState(false)

    const handleTwins = async (e) => {
        console.log(e.target.value, e.target.id);


        setTwins(e)

        const user = {
            "cardId": e.target.id,
            "twins": e.target.value,
        }

        let result = await updateTwinsCard(user);
        e.target.value = user.twins
    }

    




    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th></th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Apellido
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        DNI
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        CUIT
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contacto
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mellizos
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Editar</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                {
                                    users.map((user, index) =>
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    #{index + 1}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center uppercase">
                                                    <div className="margin auto">
                                                        {user.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 uppercase">
                                                    {user.lastName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 items-center rounded-full bg-blue-300 text-black-500">
                                                    {user.cardId}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.cuit}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.phone}
                                            </td>
                                            <td className="flex flex-col relative px-6 py-4 justify-center items-center">
                                                <select className="felx flex-col rounded-full bg-blue-300 text-black-900 justify-center items-center"
                                                    id={`${user.username}`}
                                                    onChange={handleTwins} 
                                                    value={user.twins}
                                                    >
                                                    <option value={false}>No</option>
                                                    <option value={true}>Si</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link legacyBehavior href={`/bills/user/${user.username}`} passHref>
                                                    <a href="#" className="text-black-600 hover:text-indigo-900">Facturaci&oacute;n</a>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={`/users/${user.username}`} passHref legacyBehavior>
                                                <button className="bg-red-300 ml-0 hover:bg-red-200 text-white w-10 h-auto p-2 rounded-full font-primary font-semibold text-xs flex
                                                justify-center items-baselinetransform transition duration-500 group cursor-pointer">
                                                <FontAwesomeIcon icon={faEdit} className="w-5 m-auto"/>
                                                </button>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-rigth text-sm font-medium">
                                                <Link legacyBehavior href={`/users/wallet/${user.username}`} passHref>
                                                    <a href="#" className="text-black-600 hover:text.-indigo-900">Mi Billetera</a>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Link legacyBehavior href="/users/create" passHref>
                <button className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-10 ml-10 rounded w-40 sm: ml-28">
                    Nuevo Usuario
                </button>
            </Link>
        </div>
    );
}


export default UserList