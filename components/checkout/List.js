import DataTable from 'react-data-table-component'
import Link from 'next/link'
import FilterComponent from "@/components/filter/FilterComponent";
import {useEffect, useMemo, useState} from "react";

const List = ({checkout}) => {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = checkout.filter(item => filterText == '' || filterText.toLowerCase().includes(item.id));

    useEffect(() => {
        console.log('filteredItems', filteredItems)
    })

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            cell: row => <Link passHref href={`/checkout/${row.id}`}><a className={`text-indigo-600`}>#{row.id}</a></Link>
        },
        {
            name: 'Estado',
            selector: row => row.checkoutState,
        },
        {
            name: 'Cantidad',
            selector: row => row.products.length
        },
        {
            name: 'Total',
            selector: row => row.totalAmount
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };


    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);


    return (
        <>
        <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">
            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                paginationComponentOptions={paginationComponentOptions}
            />
        </div>
        </>
    )
}

export default List;