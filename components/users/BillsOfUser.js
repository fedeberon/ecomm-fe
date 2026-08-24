import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import {useState, useMemo} from "react";
import DateObject from "react-date-object";
import {paginationComponentOptions} from "../../DataTableUtils";

const BillsOfUser = ({bills}) => {
    const[filterText, setFilterText]= useState ('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const safeBills = Array.isArray(bills) ? bills : [];
    const filteredItems = safeBills.filter(item => {
        const query = filterText.trim().toLowerCase();
        return !query || [item.id, item.billTypeName, item.number, item.cuit, item.cae, item.totalAmount]
            .some(value => String(value ?? '').toLowerCase().includes(query));
    });
 
    const columns = [

        {
            name: 'Id',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Tipo',
            selector: row => row.billTypeName,
            sortable: true
        },
        {
            name:'N°',
            selector: row => row.number,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => row.date ? String(row.date).slice(0, 10) : '—',
            sortable: true
        },
        {
            name: 'Hora',
            selector: row => row.date ? new DateObject(row.date).format('HH:mm') : '—',
            sortable:true
        },
        {
            name: 'CAE',
            selector: row =>row.cae,
            sortable: true
        },
        {
            name: "Importe",
            selector: row => row.totalAmount,
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
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>
        );
    }, [filterText, resetPaginationToggle]);


    return (

        <div className="my-4 min-h-80 w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:my-6">
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
    )
}

export default BillsOfUser;
