import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import {useState, useMemo} from "react";
import DateObject from "react-date-object";
import {paginationComponentOptions} from "../../DataTableUtils";

const BillsOfUser = ({bills}) => {
    const[filterText, setFilterText]= useState ('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems =bills.filter(item=> filterText == '' || filterText.toLowerCase().includes(item.cuit));
 
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
            selector:row=>row.date.split('',10),
            sortable: true
        },
        {
            name: 'Hora',
            selector:row=>new DateObject(row.date).format('mm:ss'),
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
    )
}

export default BillsOfUser;