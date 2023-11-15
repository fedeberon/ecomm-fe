import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import { fineProductsInStore } from 'services/productService';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import FilterComponent from '../filter/FilterComponent';
import { deleteProduct } from '../../services/productService';
import NewProduct from "@/components/products/NewProduct";
import * as brandsService from 'services/brandService';
import * as categoriesService from "services/categoriesService";
import * as sizeService from "services/sizeService";

const VistaProductos = ({ store, brands, categories, sizes }) => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prod,setProd]= useState(store.store.store)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products1 = await fineProductsInStore(prod.id)
        /*const products = await all(id);*/
        setProducts(products1);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [prod]);

  const [filterText, setFilterText] = useState('')
  const filteredItems = products.filter(item => filterText.toLowerCase() == '' || filterText.includes(item.id));
  const [data, setData] = useState(filteredItems)

  const reloadProducts = async () => {
    try {
      const products = await fineProductsInStore(products);
      setProducts(products)
    }
    catch (error) {
      console.error("Error fetching products: ", error)
    }
  }
  const handleDelete = async (rowId) => {
    try {
      await deleteProduct(rowId)
      const updatedData = data.filter(row => row.id !== rowId);
      setData(updatedData);
      await reloadProducts();
    }
    catch (error) {
      console.error("Error deleting product: ", error)
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
      hide: 'sm'
    },
    {
      name: 'Producto',
      selector: 'name',
      sortable: true
    },
    {
      name: 'Descripcion',
      selector: 'description',
      sortable: true,
      hide: 'sm'
    },

    {
      name: 'Stock',
      selector: 'stock',
      sortable: true,
      hide: 'sm'
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <div className="flex justify-center absolute left-0">
          <Link href={`/products/${row.id}`} passHref legacyBehavior>
            <button onClick={() => console.log('Button clicked!')} className="bg-green-500 ml-0 hover:bg-green-400 text-white w-10 h-auto p-2 rounded-full font-primary font-semibold text-xs flex
                   items-baselinetransform transition duration-500 group cursor-pointer">
              <FontAwesomeIcon icon={faEye} className="w-5 m-auto" />
            </button>
          </Link>

          <Link href={`/products/update/${row.id}`} passHref legacyBehavior>
            <button className="bg-blue-500 ml-0 hover:bg-blue-400 text-white w-10 h-auto p-2 rounded-full font-primary font-semibold text-xs flex
              justify-center items-baselinetransform transition duration-500 group cursor-pointer">
              <FontAwesomeIcon icon={faEdit} className="w-5 m-auto" />
            </button>
          </Link>

          <button onClick={() => handleDelete(row.id)} className="bg-red-500 ml-0 hover:bg-red-400 text-white w-10 h-auto p-2 rounded-full font-primary font-semibold text-xs flex
              justify-center items-baselinetransform transition duration-500 group cursor-pointer">
            <FontAwesomeIcon icon={faTrash} className="w-5 m-auto" />
          </button>
        </div>
      ),
    },
  ];

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
      <div className="mb-4 flex justify-end">

        <button onClick={handleOpenModal} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mb-4">
          Agregar Producto
        </button>

      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div> 
          <div className="md:col-span-2 text-left relative">
            
            <NewProduct categories={categories} brands={brands} sizes={sizes} handleCloseModal={handleCloseModal} />
          </div>
        </div>

      )}
      <div className="overflow-hidden">
        <DataTable
          columns={columns}
          data={products}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
        />
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  const categories = await categoriesService.findAll();
  const brands = await brandsService.findAll();
  const sizes = await sizeService.findAll();
  return {
    props: {
      brands,
      categories,
      sizes
    },
  }
}
export default VistaProductos;

