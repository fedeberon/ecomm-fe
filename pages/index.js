import ProductListings from '@/components/products/ProductListings'
import FilterModal from '@/components/filter/FilterModal'
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import { useState } from 'react'

function IndexPage({brands, categories}) {
  const [isSearching, setIsSearching] = useState(false);
  const columnList = [
    { value: 'sales', label: 'Popularidad' },
    { value: 'price', label: 'Precio' },
    { value: 'stock', label: 'Stock' },
    { value: 'name', label: 'Nombre' },
  ];

  const filterParams = [
    { type: 'Categorias', elements: categories, column: true },
    { type: 'Marcas', elements: brands, column: false },
  ];

  const searchCatalog = (query) => {
    if (typeof window !== 'undefined') {
      const term = query?.[0]?.trim?.() || '';
      const filters = query?.[1] || [];
      setIsSearching(Boolean(term || filters.some((filter) => filter?.length)));
      window.dispatchEvent(new CustomEvent('catalog-search', { detail: query }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-gray-100 bg-white px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <FilterModal
              filterParams={filterParams}
              searchFunction={searchCatalog}
              columnList={columnList}
            />
          </div>
        </div>
      </section>

      <section className={`overflow-hidden bg-white px-4 transition-all duration-500 ease-in-out sm:px-6 lg:px-8 ${isSearching ? 'pointer-events-none max-h-0 translate-y-[-12px] py-0 opacity-0' : 'max-h-[1000px] translate-y-0 pt-4 pb-5 opacity-100'}`}>
        <div className="mx-auto max-w-[1180px]">
          <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-[#f4fbff] shadow-sm">
            <img
              src="/images/dulce-bebe-hero-crecimiento.png"
              alt="Todo lo que tu bebé necesita, en un solo lugar"
              className="block h-auto w-full"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 pt-2">
        <ProductListings />
      </section>
    </div>
  )
}

export async function getServerSideProps() {
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();

  return {
    props: {
      brands,
      categories,
    },
  }
}

export default IndexPage
