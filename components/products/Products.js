import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import Link from 'next/link'
import {useState, useMemo} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash, faEdit, faTrash, faTag, faInfo} from '@fortawesome/free-solid-svg-icons'

const Products = ({products}) => {
    const [filterText, setFilterText]= useState ('')
    const filteredItems = products.filter(item=> filterText.toLowerCase() == '' || filterText.includes(item.id));
    
    const columns = [
            
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true
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
                <div className="flex justify-between">
                    <button onClick={() => console.log('Button clicked!')} className="bg-green-500 ml-2 hover:bg-green-400 text-white w-10 h-auto p-2 rounded-full font-primary font-semibold text-xs flex
                    justify-center items-baselinetransform transition duration-500 group cursor-pointer">
                    <FontAwesomeIcon icon={faEyeSlash} className="w-5 m-auto"/>
                    </button>

                    <Link
                    href={`/products/${row.id}`}
                    passHref
                    >
                    <button className="bg-blue-500 ml-2 hover:bg-blue-400 text-white w-10 h-auto p-2 rounded-full font-primary font-semibold text-xs flex
                    justify-center items-baselinetransform transition duration-500 group cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} className="w-5 m-auto"/>
                    </button>
                    </Link>

                    <button onClick={() => console.log(`Product ${row.id} clicked!`)} className="bg-red-500 ml-2 hover:bg-red-400 text-white w-10 h-auto p-2 rounded-full font-primary font-semibold text-xs flex
                    justify-center items-baselinetransform transition duration-500 group cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} className="w-5 m-auto"/>
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



export default Products;
