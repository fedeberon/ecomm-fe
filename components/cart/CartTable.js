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
    <div className="min-h-50 max-w-4xl my-4 sm:my-8 mx-auto w-full">
      <table className="mx-auto">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
            <th className="text-left font-primary font-normal px-6 py-4">Producto</th>
            <th className="font-primary font-normal px-6 py-4">Cantidad</th>
            <th className="font-primary font-normal px-6 py-4">Precio</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">Talle</th>
            <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">Eliminar</th>
          </tr>
        </thead>
        <tbody className="divide-y overscroll-auto justify-between divide-palette-lighter">
          {cartItems.map((item, index) => (
            <tr key={index} className="text-sm sm:text-base text-gray-600 text-center">
              <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                <Image src={item.productImage ? item.productImage : defaultImage}
                       width={50}
                       height={50}
                  className="w-12 h-12 rounded-full"/>

                <Link legacyBehavior passHref href={`/products/${item.id}`}>
                  <a className="pt-1 hover:text-palette-dark ml-4 truncate hidden sm:table-cell">
                    {item.productTitle}
                  </a>
                </Link>
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4">
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
                  className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </td>
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4">
                <Price
                  currency="$"
                  num={item.price}
                  numSize="text-lg"
                />
              </td>
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                <label>{item.sizeName}</label>
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4 hidden sm:table-cell">
                <button
                  aria-label="delete-item"
                  className=""
                  onClick={() => updateItem(item.id, 0)}
                >
                  <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter" />
                </button>
              </td>
            </tr>
          ))}

            <tr className="text-center">
              <td></td>
              <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">Subtotal</td>
              <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
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
  );
}

export default CartTable
