import Price from '@/components/products/Price'

function ProductInfo({ productData }) {
  const { name, description, price, category, brand, promo, stock, code } = productData
  const inStock = Number(stock) > 0

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {promo && (
          <span className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-600">
            Promo
          </span>
        )}
        {category?.name && (
          <span className="text-xs font-semibold uppercase tracking-wide text-palette-sdark">
            {category.name}
          </span>
        )}
        {brand?.name && (
          <span className="text-xs text-slate-400">· {brand.name}</span>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900">
        {name}
      </h1>

      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 whitespace-pre-line">
          {description}
        </p>
      )}

      <div className="mt-6 flex items-end gap-3">
        <div className="text-slate-900 font-extrabold">
          <Price currency="$" num={price} numSize="text-4xl" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">Disponibilidad</p>
          <p className={`mt-1 text-sm font-bold ${inStock ? 'text-emerald-600' : 'text-red-500'}`}>
            {inStock ? `${stock} en stock` : 'Sin stock'}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">Código</p>
          <p className="mt-1 text-sm font-bold text-slate-700">{code || '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
