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
    <div className="flex items-center justify-center m-auto w-full mb-8">
      <table className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lgz">
      <thead className="">
      <tr className="content-center">
          <th scope="col"
              className="pl-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
              Producto
          </th>
          <th scope="col"
              className="px-4 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cantidad
          </th>
          <th className="px-4 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
            Talle
          </th>
          <th scope="col"
              className="px-4 py-2  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
          </th>
      </tr>
      </thead>
        <tbody className="bg-white divide-y divide-gray-200 lg:w-3/4">
          {cartItems.map((item, index) => (
            <tr key={index} className="text-sm sm:text-base text-gray-600 text-center">
              <td className="text-left font-primary font-medium pl-4  px-4 sm:px-6 py-4 flex items-center">
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
              <td className="font-primary font-medium px-8 sm:px-6 py-4">
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
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                <label>{item.sizeName}</label>
              </td>
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4">
                <Price
                  currency="$"
                  num={item.price}
                  numSize="text-lg"
                />
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

export default CartTableBill
