import {getBillsById} from "../../services/billingService";
import Moment from "react-moment";

const Detail = ({bill}) => {

    const print = () => {
        let mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title  + '</h1>');
        mywindow.document.write(document.getElementById("bill").innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    }

    return (
        <>
            {
                    bill == null
                    ?
                        <> Buscando </>
                    :
                 <>
                     <div id="bill" className="fixed z-10 inset-0 overflow-y-auto mx-auto p-16 mt-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:w-2/3">
                                 <div className="bg-white px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
                                     <div className="sm:flex sm:items-start">
                                         <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                             <div className="mt-1">
                                                 <p className="text-sm text-gray-500">
                                                     <div className="mx-auto p-10 ml-20">
                                                         <div className="flex items-center justify-between mb-8 px-3">
                                                             <div>
                                                        <span className="text-2xl">Factura #</span>: {bill.number}<br/>
                                                                 <span>Fecha</span>:
                                                                 &nbsp;
                                                                 <Moment format="DD-MM-YYYY">
                                                                    {bill.date}
                                                                 </Moment>
                                                                 <br/>
                                                             </div>
                                                             <div className="text-right">
                                                                 {bill.billTypeName}
                                                             </div>
                                                         </div>

                                                         <div className="flex justify-between mb-8 px-3">
                                                             <div>
                                                                 Juan Perez<br/>
                                                                 San Martin 232<br/>
                                                                 Bolilvar, Buenos Aires<br/>
                                                                 juanperez@gmail.com<br/>
                                                                 351 123 456 789
                                                             </div>
                                                             <div className="text-right">
                                                                 Dulce Bebe<br/>
                                                                 Av. Alsina 472<br/>
                                                                 San Carlos de Bolivar<br/>
                                                                 Prov Buenos Aires<br/>
                                                                 B6550<br/>
                                                             </div>
                                                         </div>

                                                         <div className="border border-t-2 border-gray-200 mb-8 px-3"></div>


                                                         <div className="flex flex-col">
                                                             <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                                 <div
                                                                     className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                                     <div
                                                                         className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                                         <table className="min-w-full divide-y divide-gray-200">
                                                                             <thead className="bg-gray-50">
                                                                             <tr>
                                                                                 <th scope="col"
                                                                                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                     Name
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
                                                                                 bill.checkout.products.map((p, index) => (
                                                                                     <tr key={index}>
                                                                                         <td className="px-6 py-4 whitespace-nowrap">
                                                                                             <div className="flex items-center">
                                                                                                 <div className="ml-4">
                                                                                                     <div
                                                                                                         className="text-sm font-medium text-gray-900">
                                                                                                         <div>{p.product.name}</div>
                                                                                                     </div>
                                                                                                     <div
                                                                                                         className="text-sm text-gray-500">
                                                                                                         {p.product.description}
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

                                                         <div className="border border-t-2 border-gray-200 mb-8 px-3"></div>


                                                         <div className="flex justify-between items-center mb-2 px-3">
                                                             <div className="text-2xl leading-none"><span
                                                                 className="">Total</span>:
                                                             </div>
                                                             <div
                                                                 className="text-2xl text-right font-medium">$ {bill.totalAmount}</div>
                                                         </div>

                                                         <div className="mb-8 px-3">
                                                             <span>CAE: </span>
                                                             <b className="underline font-bold">{bill.cae} </b>
                                                             <br/>
                                                             <span>FECHA: </span>
                                                             <Moment format="DD-MM-YYYY hh:mm:ss">
                                                                {bill.date}
                                                             </Moment>
                                                         </div>
                                                     </div>
                                                 </p>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                     <button onClick={print} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                         Imprimir
                                     </button>
                                 </div>
                             </div>
                         </div>
                     </div>


                 </>
            }

        </>

    )

}


export async function getStaticProps({ params }) {
    const bill = await getBillsById(params.id);
    return {
        props: {
            bill
        },
    }
}

export default Detail