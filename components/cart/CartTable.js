import { useState, useEffect } from 'react'
import { useUpdateCartQuantityContext } from '@/context/Store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Price from '@/components/products/Price'
import { getCartSubTotal } from '@/utils/helpers'
import logo from "../../images/default.jpeg";
import Image from 'next/image'

function CartTable({ cart }) {
  const updateCartQuantity = useUpdateCartQuantityContext()
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  const defaultImage = {
    url: "default.jpeg",
    link: logo,
    main: false
  }

  useEffect(() => {
    setCartItems(cart)
    setSubtotal(getCartSubTotal(cart))
  }, [cart])

  function updateItem(id, quantity) {
    updateCartQuantity(id, quantity)
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="divide-y divide-gray-100">
          {cartItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 p-4 transition hover:bg-gray-50/60 sm:flex-row sm:items-center sm:p-5">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <Link passHref href={`/products/${item.id}`}>
                  <a className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
                    <Image
                      src={item.productImage ? item.productImage : defaultImage}
                      layout="fill"
                      objectFit="contain"
                      alt={item.productTitle || 'Producto'}
                    />
                  </a>
                </Link>

                <div className="min-w-0 flex-1">
                  <Link passHref href={`/products/${item.id}`}>
                    <a className="line-clamp-2 text-sm font-extrabold text-gray-900 hover:text-palette-sdark sm:text-base">
                      {item.productTitle}
                    </a>
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    {item.sizeName && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 font-semibold text-gray-600">Talle {item.sizeName}</span>
                    )}
                    <span className="rounded-full bg-green-50 px-2.5 py-1 font-semibold text-green-700">Disponible</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 sm:flex sm:gap-5">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Cantidad</p>
                  <div className="flex h-10 overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <button
                      type="button"
                      onClick={() => updateItem(item.id, Math.max(0, Number(item.quantity) - 1))}
                      className="w-9 text-lg font-bold text-gray-500 transition hover:bg-gray-50"
                    >
                      −
                    </button>
                    <div className="flex w-10 items-center justify-center border-x border-gray-100 text-sm font-bold text-gray-800">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => updateItem(item.id, Number(item.quantity) + 1)}
                      className="w-9 text-lg font-bold text-gray-500 transition hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="min-w-[90px] text-right">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Precio</p>
                  <Price currency="$" num={item.price} numSize="text-lg" />
                </div>

                <button
                  aria-label="Eliminar producto"
                  type="button"
                  onClick={() => updateItem(item.id, 0)}
                  className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 sm:mt-4"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-5 py-4">
          <span className="text-sm font-semibold text-gray-500">Subtotal</span>
          <Price currency="$" num={subtotal} numSize="text-2xl" />
        </div>
      </div>
    </div>
  )
}

export default CartTable
