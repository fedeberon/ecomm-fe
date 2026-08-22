import Link from 'next/link'
import ProductListings from '@/components/products/ProductListings'
import * as brandsService from 'services/brandService';
import * as categoriesService from 'services/categoriesService'

const categoryIcons = ['🧷', '🍼', '🛁', '🧸', '👕', '🛒', '🛏️', '🧴'];

function IndexPage({brands, categories}) {
  const featuredCategories = (categories || []).slice(0, 8);

  return (
    <div className="bg-white min-h-screen">
      <section className="px-3 sm:px-5 lg:px-6 pt-4">
        <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl bg-palette-slighter border border-gray-100 shadow-sm">
          <div className="grid lg:grid-cols-2 min-h-72 lg:min-h-80">
            <div className="flex items-center px-7 py-8 sm:px-10 lg:px-12 lg:py-9 bg-gradient-to-r from-palette-slighter to-white">
              <div className="max-w-lg">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-800">
                  Todo lo que tu bebé necesita,
                  <span className="block text-palette-sdark">en un solo lugar</span>
                </h1>
                <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-md">
                  Productos de calidad para acompañar cada etapa de su crecimiento.
                </p>
                <a href="#categorias-destacadas" className="inline-flex items-center mt-5 px-5 py-2.5 rounded-xl bg-palette-sdark hover:bg-palette-dark text-white text-sm font-bold shadow-md transition-colors">
                  Ver categorías <span className="ml-3">→</span>
                </a>
              </div>
            </div>

            <div className="relative min-h-64 lg:min-h-full bg-white">
              <img
                src="/images/carrousel/panalera-02.jpg"
                alt="Productos para bebés"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-15"></div>
              <button aria-label="Anterior" className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow items-center justify-center text-2xl text-gray-700">‹</button>
              <button aria-label="Siguiente" className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow items-center justify-center text-2xl text-gray-700">›</button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 rounded-full bg-white bg-opacity-90 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-palette-sdark"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-5 lg:px-6 mt-3">
        <div className="max-w-7xl mx-auto rounded-2xl bg-gray-50 border border-gray-100 px-4 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:divide-x lg:divide-gray-200">
            <div className="flex items-center gap-3 lg:px-4">
              <span className="text-xl">🚚</span>
              <div>
                <p className="text-sm font-bold text-palette-sdark">Envíos a todo el país</p>
                <p className="text-xs text-gray-500">Rápidos y seguros</p>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:px-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-palette-sdark text-palette-sdark font-bold">✓</span>
              <div>
                <p className="text-sm font-bold text-palette-sdark">Compras 100% seguras</p>
                <p className="text-xs text-gray-500">Protegemos tus datos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:px-4">
              <span className="text-xl">💳</span>
              <div>
                <p className="text-sm font-bold text-palette-sdark">Medios de pago</p>
                <p className="text-xs text-gray-500">Tarjetas y transferencias</p>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:px-4">
              <span className="text-xl">★</span>
              <div>
                <p className="text-sm font-bold text-palette-sdark">Productos de calidad</p>
                <p className="text-xs text-gray-500">Elegidos para tu bebé</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categorias-destacadas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="hidden sm:block h-px bg-palette-slight flex-1 opacity-50"></div>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Categorías destacadas</h2>
            <span className="text-palette-sdark text-base">♥</span>
          </div>
          <div className="hidden sm:block h-px bg-palette-slight flex-1 opacity-50"></div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {featuredCategories.map((category, index) => (
            <Link key={category.id} href={`/accessories/${category.id}`} passHref>
              <a className="group flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-xl sm:text-2xl group-hover:border-palette-slight group-hover:shadow-md transition-all">
                  {categoryIcons[index % categoryIcons.length]}
                </div>
                <span className="mt-2 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-palette-sdark line-clamp-2">
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
