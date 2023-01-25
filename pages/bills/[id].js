import {getBillsById} from "../../services/billingService";
import BillPrintBody from "@/components/bill/BillPrintBody";
import {useReactToPrint} from "react-to-print";
import {useRef} from "react";
import Moment from "react-moment";
import Link from "next/link";


const Detail = ({ bill }) => {

    const componentRed = useRef()
    const print = useReactToPrint({
        content: () => componentRed.current,
        documentTitle: `Ecommerce - Factura ${bill.id}`
    })

    return (
        <>
            {
                bill == null
                    ?
                    <> Buscando </>
                    :
                    <>
                        <div ref={componentRed}>
                            <BillPrintBody  bill={bill}/>
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