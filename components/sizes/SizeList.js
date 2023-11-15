import DataTable from "react-data-table-component";
import Link from "next/link";
import FilterComponent from "../filter/FilterComponent";
import {useMemo, useState} from "react";
import {paginationComponentOptions} from "../../DataTableUtils";
import { deleteSize } from "services/sizeService";

const SizesList = ({ sizes }) => {
    
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const [data, setData] = useState(sizes.filter(item=> filterText == '' || filterText.includes(item.id)));
   

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Eliminar",
            cell: (row) => <button onClick={() => handleDelete(row.id)}>X</button>,
            allowOverflow: true,
            button: true,
            width: "56px"
        }
    ];
    
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

    const handleDelete = async (id) =>{
        await deleteSize(id)
        window.location.reload(false);
    }
    
    return (

        <div className="flex flex-col">
            <div className="overflow-x-auto flex justify-center w-auto lg:w-3/4 m-auto">
                <div className="py-2  align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            persistTableHead
                            paginationComponentOptions={paginationComponentOptions}
                        />
                    </div>

                    <Link legacyBehavior href="/size/create" passHref>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 m-auto rounded">
                                Nuevo Talle
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
  );
};

export default SizesList;