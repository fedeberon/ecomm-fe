import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import {useState, useMemo} from "react";

const Products = ({products}) => {
    const [filterText, setFilterText]= useState ('')
    const filteredItems =products.filter(item=> filterText.toLowerCase() == '' || filterText.includes(item.id));
    
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
