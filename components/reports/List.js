import DataTable from 'react-data-table-component'
import {useMemo, useState} from "react";
import {paginationComponentOptions} from "../../DataTableUtils";
import FilterCardComponent from '../filter/FilterCardComponent';
import ExcelExport from "@/components/reports/ExcelExport";
import Link from "next/link";

const List = ({report}) => {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    

    if(report){
        const filteredItems = report.filter(item => filterText.toLowerCase() == '' || filterText.toLowerCase().replace(/\s+/g, '').includes(item.creditCard?.toLowerCase().replace(/\s+/g, '')));
        report = filteredItems
    }

    const columns = [
        {
            name: '#',
            selector: row => row.id,
            sortable: true
        },
        {
            name:'ID ckeckout',
            cell: row => <Link legacyBehavior passHref href={`/checkout/${row.checkout.id}`}><a className={`text-indigo-600`}>{row.id}</a></Link>
        },
        {
            name:"CUIT",
            selector: row=> row.cuit
        },
        {
            name: 'Tarjeta de credito',
            selector: row => row.creditCard
        },
        {
            name: 'Nombre de factura',
            selector: row => row.billTypeName
        },
        {
            name: 'Fecha',
            selector: row => row.date
        },
        {
            name: 'Tipo de factura',
            selector: row => row.billType
        },
        {
            name:'CAE',
            selector:row=>row.CAE
        }

    ];

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if(filterText) {
                setFilterText('');
            }
        };
        return(
            <FilterCardComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>
        )
    }, [filterText])

    return (
        
        <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">
            <DataTable
                columns={columns}
                data={report}
                noDataComponent={"Buscar por fechas de reportes en el CALENDARIO para ver contenido en la tabla"}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                paginationComponentOptions={paginationComponentOptions}
            />

            <ExcelExport excelData={report} fileName={"Reeporte de Facturacion - Dulce BB"}/>
        </div>
        
    )
}

export default List;