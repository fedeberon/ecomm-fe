import Link from "next/link";
import { useState } from "react";
import { update } from "services/userService";  

const UserList = ({users}) => {
    const [twins, setTwins]= useState(false)

    const handleTwins = async (e) => {  
        console.log();
        setTwins(e)

        const user = {
            "id" : e.target.id,
            "twins" : e.target.value,
        }

         let result = await update(user);
         console.log(result);
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
                                        <th></th>
                                        <th></th>
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
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                     {user.cardId}
                                                </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.cuit}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.phone}
                                                </td> 
                                                <td>
                                                   <select 
                                                   className="rounded-full bg-blue-200"
                                                    id={`${user.username}`}
                                                    onChange={handleTwins} 
                                                   > 
                                                       <option value={false}>no</option>
                                                       <option value={true}>si</option>   
                                                    </select> 
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={`/bills/user/${user.username}`} passHref>
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Facturaci&oacute;n</a>
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={`/users/${user.username}`} passHref>
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Mas ...</a>
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-rigth text-sm font-medium">
                                                    <Link href={`/users/wallet/${user.username}`} passHref>
                                                        <a href="#" className="text-indigo-600 hover:text.-indigo-900"> Puntos</a>
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
                    <Link href="/users/create" passHref>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-10 ml-10 rounded w-40">
                            Nuevo Usuario
                        </button>
                    </Link>
                </div>
    )
}


export default UserList