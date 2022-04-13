import Link from "next/link";
import logo from "../../images/default.jpeg";
import {useEffect} from "react";
import FilterComponent from  "../filter/FilterComponent";
import DataTable  from "react-data-table-component";
import {useState, useMemo} from "react";

const Products = ({products}) => {
    const[filterText, setFilterText]= useState ('')
    const filteredItems =products.filter(item=> filterText == '' || filterText.toLowerCase().includes(item.id));

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
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
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
//         <div>
//             <div className="flex flex-col">
//                 <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                     <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//                         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50">
//                                 <tr>
//                                     <th></th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Nombre
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
//                                         Categoria
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         C&oacute;digo
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Precio
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Stock
//                                     </th>
//                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                         Puntos
//                                     </th>
//                                     <th scope="col" className="relative px-6 py-3">
//                                         <span className="sr-only">Edit</span>
//                                     </th>
//                                 </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">

//                                 {
//                                     products.map((product , index) =>
//                                         <tr key={index}> 
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="text-sm text-gray-900">
//                                                     #{product.id}
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="flex items-center">
//                                                     <div className="flex-shrink-0 h-10 w-10">
//                                                         {
//                                                             product.images && product.images.length != 0
//                                                                 ?
//                                                                 <img className="h-10 w-10 rounded-full"
//                                                                      src={product.images[0].link}
//                                                                      alt=""/>
//                                                                 :
//                                                                 <img className="h-10 w-10 rounded-full"
//                                                                      src={logo.src}
//                                                                      alt=""/>
//                                                         }
//                                                     </div>
//                                                     <div className="ml-4">
//                                                         <div className="text-sm font-medium text-gray-900">
//                                                             {product.name}
//                                                         </div>
//                                                         <div className="text-sm text-gray-500">
//                                                             {product.description}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="text-sm text-gray-900">
//                                                     {product.category ? product.category.name : ''}
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span
//                                                     className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                                      {product.code}
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {product.price}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {product.stock}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {product.points}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                                 <Link href={"/products/update/" + product.id} passHref>
//                                                     <a href="#" className="text-indigo-600 hover:text-indigo-900">Editar</a>
//                                                 </Link>
//                                             </td>
//                                         </tr>
//                                     )
//                                 }
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )

// }
