import Link from "next/link";
import Moment from "react-moment";

const Bills = ({bills}) => {
    return (
        <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">
            <table className="mx-auto">
                <thead>
                <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
                    <th className="font-primary font-normal px-6 py-4">Id</th>
                    <th className="font-primary font-normal px-6 py-4">Tipo</th>
                    <th className="font-primary font-normal px-6 py-4">CUIT</th>
                    <th className="font-primary font-normal px-6 py-4">Pto Venta</th>
                    <th className="font-primary font-normal px-6 py-4">N&uacute;mero</th>
                    <th className="font-primary font-normal px-6 py-4">Fecha</th>
                    <th className="font-primary font-normal px-6 py-4">C.A.E.</th>
                    <th className="font-primary font-normal px-6 py-4">Importe</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-palette-lighter">
                {
                    bills.map(item => (
                            <tr key={item.id} className="text-sm sm:text-base text-gray-600 text-center">
                                <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center cursor-pointer">
                                    <Link passHref href={`/bills/${item.id}`}>
                                        <a className="pt-1 hover:text-palette-dark">
                                            #{item.id}
                                        </a>
                                    </Link>
                                </td>
                                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                                    {item.billTypeName}
                                </td>
                                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                                    {item.cuit}
                                </td>
                                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                                    {item.pointNumber}
                                </td>
                                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                                    {item.number}
                                </td>
                                <td className="font-primary font-medium">
                                    <Moment format="DD-MM-YYYY hh:mm:ss">
                                        {item.date}
                                    </Moment>
                                </td>
                                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                                    {item.cae}
                                </td>
                                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                                    $ {item.totalAmount}
                                </td>
                            </tr>
                        )
                    )
                }

                </tbody>
            </table>
        </div>
    )
}

export default Bills;