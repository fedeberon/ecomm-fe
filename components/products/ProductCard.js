import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/products/Price'
import logo from "../../images/default.jpeg";

function ProductCard({ product }) {
  const image = product.images && product.images.length !== 0 ? product.images[0].link : logo;
  const category = product.category?.name || 'Producto';
  const brand = product.brand?.name;
  const sizes = product.sizes?.map((size) => size.name).filter(Boolean) || [];
  const hasStock = Number(product.stock) > 0;

  return (
    <Link href={`/products/${product.id}`} passHref>
      <a className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative h-44 bg-white overflow-hidden">
          <Image
            src={image.src ? image.src : image}
            layout="fill"
            objectFit="contain"
            className="p-3 transition-transform duration-300 group-hover:scale-[1.03]"
            alt={product.name || 'Producto'}
          />

          {product.promo && (
            <span className="absolute left-3 top-3 rounded-full bg-palette-secondary px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              Promo
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col border-t border-slate-100 p-3.5">
          <div className="mb-1 flex items-center gap-1 text-[11px] text-slate-500">
            <span className="truncate">{category}</span>
            {brand && <><span>·</span><span className="truncate">{brand}</span></>}
          </div>

          <h3 className="min-h-[42px] text-[15px] font-semibold leading-5 text-slate-900 line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-2 text-[22px] font-bold leading-none text-slate-950">
            <Price currency="$" num={product.price} numSize="text-[22px]" />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {sizes.length > 0 && (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                Talle {sizes.join(' / ')}
              </span>
            )}

            <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${hasStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
              {hasStock ? `Stock ${product.stock}` : 'Sin stock'}
            </span>
          </div>

          <div className="mt-auto pt-3 text-[12px] font-semibold text-palette-sdark transition-colors group-hover:text-palette-dark">
            Ver detalle →
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
