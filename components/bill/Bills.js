import Link from "next/link";
import Moment from "react-moment";
import FilterCuitComponent from "../filter/FilterCuitComponent";
import DataTable  from "react-data-table-component";
import {useState, useMemo} from "react"
import DateObject from "react-date-object";

const Bills = ({bills}) => {
    const[filterText, setFilterText]= useState ('')
    const filteredItems =bills.filter(item=> filterText == '' || filterText.toLowerCase().includes(item.cuit));
    
    const columns = [
            
        {
            name: 'id',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'TIPO',
            selector: row => row.billTypeName,
            sortable: true
        },
        {
            name:'CUIT',
            selector: row => row.cuit,
            sortable: true
        },
        {
            name:'PTO VENTAS',
            selector: row => row.pointNumber,
            sortable: true
        },
        {
            name: 'N°',
            selector: row =>row.number,
            sortable: true
            
        },
        {
            name: 'FECHA',
            selector:row=>new DateObject(row.date).format("DD/MM/YYYY hh:mm:ss."),
            sortable: true
        },
        {
            name: 'CAE',
            selector:row=>row.cae,
            sortable: true
        },
        {
            name:'IMPORTE',
            selector:row=>row.totalAmount,
            sortable: true
        }
    ]
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };
        return (
            <FilterCuitComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText]);
    return (
        <div className="min-h-80 max-w-12 my-4 sm:my-8 mx-auto w-full">
             <div className="overflow-hidden">

                <DataTable
                    columns={columns}
                    data={filteredItems} 
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    />
            </div>
        </div>
    )
}

export default Bills;