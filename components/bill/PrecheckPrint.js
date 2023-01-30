import Moment from "react-moment";
import logo from "../../images/logoMati.png";

const PrecheckPrint = ({checkout}) => {

    return(
       <>
           <div className="justify-between w-full h-screen mt-10">
               <div className="m-auto lg:w-1/2">
                   <div id="head-factura" className="flex justify-between border-b-4 border-grey-800">
                       <img id="img-factura" src={logo.src} className="w-32" />
                       <div id="local-factura" className="text-right text-gray-500">
                           Dulce Bebe<br />
                           Av. Alsina 472<br />
                           San Carlos de Bolivar<br />
                           Prov Buenos Aires<br />
                           B6550<br />
                       </div>
                   </div>
                   <div  className="border-b-4 border-grey-800">
                       <div className="flex flex-col">
                           <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                               <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                   <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                       <table className="min-w-full">
                                           <thead className="">
                                           <tr>
                                               <th scope="col"
                                                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                   Nombre
                                               </th>
                                               <th scope="col"
                                                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                   Cantidad
                                               </th>
                                               <th scope="col"
                                                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                   Precio Unitario
                                               </th>
                                               <th scope="col"
                                                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                   Total
                                               </th>
                                           </tr>
                                           </thead>
                                           <tbody
                                               className="bg-white divide-y divide-gray-200">

                                           {
                                               checkout.products.map((p, index) => (
                                                   <tr key={index}>
                                                       <td className="px-6 py-4 whitespace-nowrap">
                                                           <div className="flex items-center">
                                                               <div className="ml-4 w-1/4">
                                                                   <div
                                                                       className="text-sm font-medium text-gray-900">
                                                                       <div>{p.product.name}</div>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                           {p.quantity}
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                           $ {p.product.price}
                                                       </td>
                                                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                           $ {p.price}
                                                       </td>
                                                   </tr>
                                               ))
                                           }

                                           </tbody>
                                       </table>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div id="footer-factura" className="flex justify-between mt-10 text-gray-500">
                           <div>
                               <div>
                                   <span>FECHA: </span> {checkout.date}
                               </div>
                           </div>
                           <div className="text-2xl">IMPORTE TOTAL $ {checkout.totalAmount}</div>
                       </div>
                   </div>
               </div>
           </div>
       </>
    )

}

export default PrecheckPrint