import Link from "next/link";
import logo from "../../images/default.jpeg";
import {useEffect} from "react";
import FilterComponent from  "@/components/filter/FilterComponent";
import DataTable  from "react-data-table-component";
import {useState, useMemo} from "react";
import {paginationComponentOptions} from "../../DataTableUtils";
import axios from "axios";

const Products = ({products}) => {
    
    // const [data, setData] = useState();
	// const [loading, setLoading] = useState(false);
	// const [totalRows, setTotalRows] = useState(0);
    // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
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
            selector: row => row.name,
            sortable: true
        },
        {
            name:'Categoria',
            selector: row => row.category.name,
            sortable: true
        },
        {
            name:'Codigo',
            selector: row => row.code,
            sortable: true
        },
        {
            name: 'Precio',
            selector: row =>row.price,
            sortable: true   
        },
        {
            name: 'Stock',
            selector:row=>row.stock,
            sortable: true
        },
        {
            name: 'Puntos',
            selector:row=>row.points,
            sortable: true
        },
    ]

    // const fetchProducts = async page => {
	// 	setLoading(true);

    //     const response = await axios.get (`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/product?page=${page}&size=10&sortBy=sales`);
    //     setData(response.data.content);
	// 	// setTotalRows(response.data.totalElements);
	// 	setLoading(false);
	// };
    
    // const handlePageChange = page => {
	// 	fetchProducts(page);
	// };

	// useEffect(() => {
	// 	fetchProducts(0); 
	// }, []);

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                // setResetPaginationToggle(!resetPaginationToggle);
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
                    // progressPending= {loading}
                    // paginationServer
                    // paginationTotalRows={totalRows}
                    // onChangePage={handlePageChange}
                    pagination
                    // paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    // persistTableHead
                    // paginationComponentOptions={paginationComponentOptions}
                    />
            </div>
        </div>
    )
}



export default Products;
