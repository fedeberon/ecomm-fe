import ProductListings from '@/components/products/ProductListings'
import FilterModal from '@/components/filter/FilterModal'
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'

function IndexPage({brands, categories}) {
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
      window.dispatchEvent(new CustomEvent('catalog-search', { detail: query }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-gray-100 bg-white px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <FilterModal
              filterParams={filterParams}
              searchFunction={searchCatalog}
              columnList={columnList}
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pt-4 pb-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-[#f4fbff] shadow-sm">
            <img
              src="/images/dulce-bebe-hero.webp"
              alt="Todo lo que tu bebé necesita, en un solo lugar"
              className="block h-auto w-full object-cover"
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
  };
}

export default IndexPage
