import DataTable from 'react-data-table-component'
import Link from 'next/link'
import FilterComponent from "@/components/filter/FilterComponent";
import {useEffect, useMemo, useState} from "react";
import {paginationComponentOptions} from "../../DataTableUtils";
import Loading from "@/components/utils/Loading";
import {findAll, getById} from "../../services/checkoutService";
/*https://react-data-table-component.netlify.app/?path=/story/getting-started-intro--page*/
const List = () => {

    const [content, setContent] = useState([])
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = async item => {
        debugger
        const result = await getById(item)
        setContent(result)
    };


    const [total, setTotal] = useState([])
    const [loading, setLoading] = useState(false)

    const handlePageChange = async (page) => {
        setLoading(true)
        const data =  await findAll(page);
        setContent(data.content);
        setLoading(false)
    };

    useEffect(async () => {
        setLoading(true)
        const data =  await findAll(1);
        setContent(data.content);
        setTotal(data.totalElements)
        setLoading(false)
    }, []);

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            cell: row => <Link passHref href={`/checkout/${row.id}`}><a className={`text-indigo-600`}>#{row.id}</a></Link>
        },
        {
            name: 'Estado',
            selector: row => row.status,
        },
        {
            name: 'Cantidad de Productos',
            selector: row => row.products.length
        },
        {
            name: 'Total',
            selector: row => (<label>$ {row.totalAmount}</label>)
        }
    ];

    const handleClear = () => {

    }


    return (
        <>
            <FilterComponent onFilter={item => filteredItems} onClear={handleClear}  />

            { loading ? (
                <Loading/>
            ) : (
                <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">
                <DataTable
                    columns={columns}
                    data={content}
                    pagination
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    persistTableHead
                    paginationServer
                    paginationComponentOptions={paginationComponentOptions}
                    paginationPerPage={10}
                    paginationTotalRows={total}
                    onChangePage={handlePageChange}
                    persistTableHead
                />
                </div>
            )}
        </>

    )
}

export default List;