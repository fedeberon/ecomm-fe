import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/products/Price'
import logo from "../../images/default.jpeg";

function ProductCard({ product }) {
  const image = product.images && product.images.length !== 0 ? product.images[0].link : logo;

  return (
    <Link href={`/products/${product.id}`} passHref>
      <a className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-56 bg-gray-50 overflow-hidden">
          <Image
            src={image.src ? image.src : image}
            layout="fill"
            objectFit="contain"
            className="transition-transform duration-300 group-hover:scale-105"
            alt={product.name || 'Producto'}
          />
          {product.promo && (
            <span className="absolute top-3 left-3 bg-palette-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
              Promo
            </span>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1 truncate">
            {product.category ? product.category.name : 'Producto'}
          </p>
          <h3 className="text-base font-semibold text-gray-800 leading-snug h-12 overflow-hidden">
            {product.name}
          </h3>
          <div className="mt-3 text-xl font-bold text-gray-900">
            <Price currency="$" num={product.price} numSize="text-xl" />
          </div>
          <p className="mt-2 text-xs text-gray-500 h-8 overflow-hidden">
            {product.description}
          </p>
          <div className="mt-4 text-sm font-semibold text-palette-dark group-hover:underline">
            Ver producto
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
