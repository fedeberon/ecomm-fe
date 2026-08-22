import Price from '@/components/products/Price'

function ProductInfo({ productData }) {
  const { name, description, price, category, brand, promo, stock, code } = productData
  const inStock = Number(stock) > 0

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        {promo && <span className="inline-flex items-center rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-bold text-pink-600">Promo</span>}
        {category?.name && <span className="text-[10px] font-semibold uppercase tracking-wide text-palette-sdark">{category.name}</span>}
        {brand?.name && <span className="text-[10px] text-slate-400">· {brand.name}</span>}
      </div>

      <h1 className="text-xl sm:text-2xl font-extrabold leading-tight text-slate-900">{name}</h1>
      {description && <p className="mt-2 text-xs leading-relaxed text-slate-600 whitespace-pre-line line-clamp-2">{description}</p>}

      <div className="mt-3 text-slate-900 font-extrabold">
        <Price currency="$" num={price} numSize="text-2xl" />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2">
          <p className="text-[9px] uppercase tracking-wide text-slate-400 font-semibold">Disponibilidad</p>
          <p className={`mt-0.5 text-[11px] font-bold ${inStock ? 'text-emerald-600' : 'text-red-500'}`}>{inStock ? `${stock} en stock` : 'Sin stock'}</p>
        </div>
        <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2">
          <p className="text-[9px] uppercase tracking-wide text-slate-400 font-semibold">Código</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-700">{code || '-'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
