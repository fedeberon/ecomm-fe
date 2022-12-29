import DataTable from 'react-data-table-component'
import {useMemo, useState} from "react";
import {paginationComponentOptions} from "../../DataTableUtils";

const List = ({report}) => {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
   

    const columns = [
        {
            name: 'ID Reporte',
            selector: row => row.id,
            sortable: true
        },
        {
            name:'ID ckeckout',
            selector: row=>row.checkout.id
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
            name: 'Tipo de factura',
            selector: row => row.billType
        },
        {
            name:'CAE',
            selector:row=>row.CAE
        }

    ];

    return (
        
        <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">
            <DataTable
                columns={columns}
                data={report}
                noDataComponent={"Buscar por fechas de reportes en el CALENDARIO para ver contenido en la tabla"}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                persistTableHead
                paginationComponentOptions={paginationComponentOptions}
            />

        </div>
        
    )
}

export default List;