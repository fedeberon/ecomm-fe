import Link from 'next/link'
import ProductListings from '@/components/products/ProductListings'
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'

const categoryIcons = ['🧷', '🍼', '🛁', '🧸', '👕', '🛒', '🛏️', '🧴'];

function IndexPage({brands, categories}) {
  const featuredCategories = (categories || []).slice(0, 8);

  return (
    <div className="bg-white min-h-screen">
      <section className="px-3 sm:px-5 lg:px-6 pt-5">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl bg-palette-slighter border border-gray-100 shadow-sm">
          <div className="grid lg:grid-cols-2 min-h-80 lg:min-h-96">
            <div className="flex items-center px-7 py-10 sm:px-12 lg:px-16 lg:py-12 bg-gradient-to-r from-palette-slighter to-white">
              <div className="max-w-xl">
                <span className="inline-flex px-3 py-1 rounded-full bg-white text-palette-sdark text-xs font-bold uppercase tracking-wider shadow-sm">
                  Dulce Bebé
                </span>
                <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight text-gray-800">
                  Todo lo que tu bebé necesita,
                  <span className="block text-palette-sdark">en un solo lugar</span>
                </h1>
                <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
                  Productos de calidad para acompañar cada etapa de su crecimiento.
                </p>
                <a href="#categorias-destacadas" className="inline-flex items-center mt-7 px-6 py-3 rounded-xl bg-palette-sdark hover:bg-palette-dark text-white font-bold shadow-md transition-colors">
                  Ver categorías <span className="ml-3">→</span>
                </a>
              </div>
            </div>

            <div className="relative min-h-72 lg:min-h-full bg-white">
              <img
                src="/images/carrousel/panalera-02.jpg"
                alt="Productos para bebés"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-6 mt-4">
        <div className="max-w-7xl mx-auto rounded-2xl bg-gray-50 border border-gray-100 px-5 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:divide-x lg:divide-gray-200">
            <div className="flex items-center gap-3 lg:px-5">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="text-sm font-bold text-palette-sdark">Envíos a todo el país</p>
                <p className="text-xs text-gray-500 mt-0.5">Rápidos y seguros</p>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:px-5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-palette-sdark text-palette-sdark font-bold">✓</span>
              <div>
                <p className="text-sm font-bold text-palette-sdark">Compras 100% seguras</p>
                <p className="text-xs text-gray-500 mt-0.5">Protegemos tus datos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:px-5">
              <span className="text-2xl">💳</span>
              <div>
                <p className="text-sm font-bold text-palette-sdark">Medios de pago</p>
                <p className="text-xs text-gray-500 mt-0.5">Tarjetas y transferencias</p>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:px-5">
              <span className="text-2xl">★</span>
              <div>
                <p className="text-sm font-bold text-palette-sdark">Productos de calidad</p>
                <p className="text-xs text-gray-500 mt-0.5">Elegidos para tu bebé</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categorias-destacadas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex items-center gap-5 mb-8">
          <div className="hidden sm:block h-px bg-palette-slight flex-1 opacity-50"></div>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Categorías destacadas</h2>
            <span className="text-palette-sdark text-lg">♥</span>
          </div>
          <div className="hidden sm:block h-px bg-palette-slight flex-1 opacity-50"></div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-5">
          {featuredCategories.map((category, index) => (
            <Link key={category.id} href={`/accessories/${category.id}`} passHref>
              <a className="group flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-2xl sm:text-3xl group-hover:border-palette-slight group-hover:shadow-md transition-all">
                  {categoryIcons[index % categoryIcons.length]}
                </div>
                <span className="mt-3 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-palette-sdark line-clamp-2">
                  {category.name}
                </span>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-t border-gray-100 pt-4">
        <ProductListings brands={brands} categories={categories}/>
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
