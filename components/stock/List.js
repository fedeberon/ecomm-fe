import DataTable from "react-data-table-component";
import DateObject from "react-date-object";
import { useState, useMemo } from "react"
import FilterComponent from "@/components/filter/FilterComponent";


const List = ({ stock }) => {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = stock.filter(item => filterText == '' || filterText.toLowerCase().includes(item.id));

    const columns = [
        {
            name: 'ID producto',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Articulo',
            selector: row => row.product.name,
            sortable: true
        },
        {
            name: 'Orden',
            selector: row => row.order,
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: row => row.quantity,
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: row => new DateObject(row.date).format("DD/MM/YYYY hh:mm:ss."),
            sortable: true
        }
    ]
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
        <div className="min-h-80 justify-center max-w-12 my-4 sm:my-8 mx-auto w-full">
            <div className="overflow-hidden">

                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                />
            </div>
        </div>
    )
}


export default List;


