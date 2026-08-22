import ProductListings from '@/components/products/ProductListings'
import Carrusel from "@/components/Carrusel";
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'
import Banner from '@/components/products/ProductBanner.js';

function IndexPage({brands, categories}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 pt-4 sm:pt-6">
          <div className="overflow-hidden sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-sm">
            <Carrusel />
          </div>
        </div>
      </section>

      <section className="bg-white py-6 sm:py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <p className="text-sm font-bold text-gray-900">Compra simple</p>
              <p className="text-sm text-gray-500 mt-1">Encontrá productos rápido y compará alternativas.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <p className="text-sm font-bold text-gray-900">Variedad de categorías</p>
              <p className="text-sm text-gray-500 mt-1">Todo organizado para llegar antes a lo que buscás.</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <p className="text-sm font-bold text-gray-900">Atención cercana</p>
              <p className="text-sm text-gray-500 mt-1">Una experiencia de compra clara y directa.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="overflow-hidden rounded-xl">
            <Banner />
          </div>
        </div>
      </section>

      <ProductListings brands={brands} categories={categories}/>
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
