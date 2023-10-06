import Moment from "react-moment";
import logo from "../../images/logoMati.png";

const PrecheckPrint = ({checkout}) => {

    return(
       <>
           <div className="justify-between w-screen h-200 mt-10">
               <div className="m-auto lg:w-11/12 sm:w-11/12">
                   <div id="head-factura" className="flex justify-around border-b-4 border-grey-800">
                       <img id="img-factura" src={logo.src} className="w-32" />
                       <div id="local-factura" className="text-right text-gray-500">
                           Dulce Bebe<br />
                           Av. Alsina 472<br />
                           San Carlos de Bolivar<br />
                           Prov Buenos Aires<br />
                           B6550<br />
                       </div>
                   </div>


                   <div  className="border-b-4 border-grey-800 m-auto">
                       <div className="flex-col max-w-full">
                           <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-0">
                               <div className="py-12  inline-block w-full">
                                   <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                                       <table className="w-full divide-y divide-gray-200">
                                           <thead className="">
                                           <tr className="">
                                               <th scope="col"
                                                   className="px-4 lg:px-12  py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                   Nombre
                                               </th>
                                               <th scope="col"
                                                   className="px-4 py-2  text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                                   Cantidad
                                               </th>
                                               <th scope="col"
                                                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                                   Precio Unitario
                                               </th>
                                               <th scope="col"
                                                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                   Total
                                               </th>
                                           </tr>
                                           </thead>
                                           <tbody
                                               className="bg-white divide-y divide-gray-200 lg:w-3/4 ">

                                           {
                                               checkout.products.map((p, index) => (
                                                   <tr key={index}>
                                                       <td className="px-4 lg:px-12 py-2 whitespace-nowrap">
                                                           <div className="flex items-center">
                                                               <div className="ml-0 w-1/4">
                                                                   <div
                                                                       className="text-sm font-medium text-gray-900">
                                                                       <div>{p.product.name}</div>
                                                                   </div>
                                                               </div>
                                                           </div>
                                                       </td>
                                                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                                        {p.quantity}
                                                       </td>
                                                       <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                                           $ {p.product.price}
                                                       </td>
                                                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
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
                       <div id="footer-factura" className="flex justify-around  mt-10 text-gray-500">
                           <div>
                               <div>
                                   <span>FECHA: </span> {checkout.date}
                               </div>
                           </div>
                           <div className="">IMPORTE TOTAL $ {checkout.totalAmount}</div>
                       </div>
                   </div>
                   
               </div>
           </div>
       </>
    )

}

export default PrecheckPrint