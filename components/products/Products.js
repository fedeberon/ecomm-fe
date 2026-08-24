import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import Link from 'next/link'
import { deleteProduct } from "services/productService";
import {useState, useMemo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEdit, faTrash, faTag, faInfo} from '@fortawesome/free-solid-svg-icons'

const Products = ({products}) => {
    const [filterText, setFilterText]= useState ('')
    const filteredItems = products.filter(item=> filterText.toLowerCase() == '' || filterText.includes(item.id));
    console.log(products);
    const [data,setData]= useState(filteredItems)

    const handleDelete = (rowId) => {
        const updatedData = data.filter(row => row.id !== rowId);
        setData(updatedData);
        deleteProduct(rowId)
      };


    const columns = [
            
        {
            
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.name ? row.name : "Producto",
            sortable: true
        },
        {
            name:'Categoria',
            selector: row => row.category ? row.category.name : "Categoria",
            sortable: true
        },
        {
            name:'Codigo',
            selector: row => row.code ? row.code : "Codigo",
            sortable: true
        },
        {
            name: 'Precio',
            selector: row =>row.price ? row.price : "Precio",
            sortable: true   
        },
        {
            name: 'Stock',
            selector:row=>row.stock ? row.stock : "Stock",
            sortable: true
        },
        {
            name: 'Puntos',
            selector:row=>row.points ? row.points : "Puntos",
            sortable: true
        },
        {
            name: 'Acciones',
            cell: (row) => ( 
                <div className="flex min-w-max items-center justify-center gap-1.5">
                    <Link legacyBehavior
                    href={`/products/${row.id}`}
                    passHref
                    >
                    <button type="button" title="Ver producto" aria-label="Ver producto" className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm transition hover:bg-emerald-600">
                    <FontAwesomeIcon icon={faEye} className="h-4 w-4"/>
                    </button>
                    </Link>

                    <Link legacyBehavior
                    href={`/products/update/${row.id}`}
                    passHref
                    >
                    <button type="button" title="Editar producto" aria-label="Editar producto" className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm transition hover:bg-blue-600">
                    <FontAwesomeIcon icon={faEdit} className="h-4 w-4"/>
                    </button>
                    </Link>

                    <button type="button" title="Eliminar producto" aria-label="Eliminar producto" onClick={() => handleDelete(row.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm transition hover:bg-rose-600">
                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4"/>
                    </button>
                </div>
            ),
        },
    ]

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText}/>
        );
    }, [filterText]);

 
    return (
        <div className="mx-auto my-4 min-h-80 w-full max-w-[1400px] px-3 sm:my-8 sm:px-0">

             <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    responsive
                    dense
                    />
            </div>
        </div>
    )
}



export default Products;
