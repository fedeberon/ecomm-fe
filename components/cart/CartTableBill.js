import { useState, useEffect } from 'react'
import { useUpdateCartQuantityContext } from '@/context/Store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Price from '@/components/products/Price'
import { getCartSubTotal } from '@/utils/helpers'
import logo from "../../images/default.jpeg";
import Image from 'next/image'

function CartTableBill({ cart }) {
  const updateCartQuantity = useUpdateCartQuantityContext()
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  const defaultImage = {
    "url": "default.jpeg",
    "link": logo,
    "main": false
  };

  useEffect(() => {
    setCartItems(cart)
    setSubtotal(getCartSubTotal(cart))
  }, [cart])

  function updateItem(id, quantity) {
    updateCartQuantity(id, quantity)
  }


  return (
    <div className="mb-6 min-w-0 w-full overflow-hidden rounded-2xl border border-slate-100">
      <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse">
      <colgroup><col className="w-[48%]" /><col className="w-[16%]" /><col className="w-[18%]" /><col className="w-[18%]" /></colgroup>
      <thead className="bg-slate-50">
      <tr>
          <th scope="col"
              className="px-3 py-3 text-left text-[10px] font-extrabold uppercase tracking-wider text-slate-500 sm:px-4">
              Producto
          </th>
          <th scope="col"
              className="px-2 py-3 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Cantidad
          </th>
          <th className="hidden px-2 py-3 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-500 sm:table-cell">
            Talle
          </th>
          <th scope="col"
              className="px-2 py-3 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Precio
          </th>
      </tr>
      </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {cartItems.map((item, index) => (
            <tr key={index} className="text-center text-sm text-slate-600">
              <td className="flex min-w-0 items-center gap-2 px-3 py-4 text-left font-primary font-medium sm:gap-3 sm:px-4">
              <Image src={item.productImage ? item.productImage : defaultImage}
                       width={50}
                       height={50}
                  className="h-10 w-10 shrink-0 rounded-xl object-cover sm:h-11 sm:w-11"/>
               <Link legacyBehavior passHref href={`/products/${item.id}`}>
                  <a className="min-w-0 truncate text-xs hover:text-palette-dark sm:text-sm">
                    {item.productTitle}
                  </a>
              </Link>
              </td>
              <td className="px-1 py-4 font-primary font-medium sm:px-2">
                <input
                  type="number"
                  inputMode="numeric"
                  id="variant-quantity"
                  name="variant-quantity"
                  min="1"
                  step="1"
                  value={item.quantity}
                  maxLength={2}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  className="form-input h-9 w-12 rounded-lg border border-slate-200 text-center text-sm text-slate-900 focus:border-palette-light focus:ring-palette-light sm:w-14"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </td>
              <td className="hidden px-2 py-4 font-primary text-sm font-light sm:table-cell">
                <label>{item.sizeName}</label>
              </td>
              <td className="px-1 py-4 font-primary text-sm font-light sm:px-2">
                <Price
                  currency="$"
                  num={item.price}
                  numSize="text-lg"
                />
              </td>
            </tr>
          ))}

            <tr className="bg-slate-50 text-center">
              <td></td>
              <td colSpan="2" className="px-2 py-4 text-right font-primary text-xs font-extrabold uppercase text-slate-500 sm:text-sm">Subtotal</td>
              <td className="px-1 py-4 font-primary text-lg font-extrabold text-palette-primary sm:px-2">
                <Price
                  currency="$"
                  num={subtotal}
                  numSize="text-xl"
                />
              </td>
              <td></td>
            </tr>
      </tbody>
      </table>
      </div>
    </div>
  )
}

export default CartTableBill
