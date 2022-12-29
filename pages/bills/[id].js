import { getBillsById } from "../../services/billingService";
import Moment from "react-moment";
import Link from "next/link";
import logo from "/images/logoMati.png";
import { useCleanCartContext } from "@/context/Store";

const Detail = ({ bill }) => {
    console.log(bill);

    const print = () => {
        let mywindow = window.open('', 'PRINT', 'height=400,width=600');

        mywindow.document.write('<html><head><title>' + document.title + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title + '</h1>');
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
                        <div id="bill" className="justify-between w-full h-screen">
                            <div id="factura" className="m-auto lg:w-1/2">
                                <div id="head-factura" className="flex justify-between border-b-4 border-grey-800">
                                    <img id="img-factura" src={logo.src} className="w-32" />
                                    <div id="local-factura" className="text-right">
                                        Dulce Bebe<br />
                                        Av. Alsina 472<br />
                                        San Carlos de Bolivar<br />
                                        Prov Buenos Aires<br />
                                        B6550<br />
                                    </div>
                                </div>
                                <div id="body-factura" className="border-b-4 border-grey-800">
                                    <div id="form-factura" className="flex justify-between">
                                        <div id="num-factura">
                                            <span className="text-2xl">Factura #</span>:<span className="text-2xl">{bill.number}</span>
                                        </div>
                                        <div id="type-factura">
                                            <span className="text-2xl">Tipo</span>:<span className="text-2xl">{bill.billTypeName}</span>
                                        </div>
                                    </div>
                                    <br/>
                                    <div id="person-factura">
                                        {
                                            bill.person
                                                ?
                                                <>
                                                    {bill.person.name} {bill.person.lastName} <br />
                                                    {bill.person.addresses[0].direccion}<br />
                                                    {bill.person.addresses[0].localidad}, {bill.person.addresses[0].descripcionProvincia}<br />
                                                </>
                                                :
                                                <>
                                                    Sin Datos asociados.
                                                </>
                                        }
                                    </div>
                                </div>

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
                                                            bill.checkout.products.map((p, index) => (
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


                                <div id="footer-factura" className="flex justify-between">
                                    <div >
                                        <div id="cae-factura">
                                            <span>CAE: </span>
                                            <b className="underline font-bold">{bill.cae} </b> 
                                        </div>
                                        <div id="fecha-factura">
                                            <span>FECHA: </span>
                                            <Moment format="DD-MM-YYYY">
                                                {bill.date}
                                            </Moment>
                                        </div>
                                        <div id="hora-factura">
                                            <span>HORA: </span>
                                            <Moment format="hh:mm">
                                                {bill.date}
                                            </Moment>
                                        </div>
                                    </div>
                                    <div className="text-2xl">TOTAL: ${bill.totalAmount}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-center">
                            <Link href="/">
                                <button type="button" className="md:m-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Volver al inicio
                                </button>  
                            </Link>
                            <button onClick={print} type="button" className="md:m-3 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Imprimir
                            </button>  
                        </div>
                    </>
            }

        </>

    )

}


export async function getServerSideProps({ params }) {
    const bill = await getBillsById(params.id);
    return {
        props: {
            bill
        },
    }
}

export default Detail