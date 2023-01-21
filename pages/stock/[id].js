import ItemStock from "@/components/stock/ItemStock";
import {findAll, findAllById} from "../../services/stockService";
import PageTitle from "@/components/PageTitle";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

const StockDetail = ({stock}) => {
    const router = useRouter()
    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text = {`${stock.provider.name} - Detalle # ${stock.id}`} />
            <ItemStock stock={stock}/>

            <a
                onClick={() => router.push('/stock')}
                aria-label="back-to-products"
                className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
        justify-center items-center md:-mt-2 focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm cursor-pointer">
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 mr-2 inline-flex" />
                Volver
            </a>

        </div>
    )
}

export async function getServerSideProps({params}) {
    const stock = await findAllById(params.id);
    return {
        props: {
            stock
        },
    }
}

export default StockDetail