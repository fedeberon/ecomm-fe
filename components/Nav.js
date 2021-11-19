import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartContext } from '@/context/Store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faShoppingCart, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import logo from '/images/logo.png';
import UserSession from "@/components/users/UserSession";

function Nav() {
  const cart = useCartContext()[0]
  const [cartItems, setCartItems] = useState(0)

  useEffect(() => {
    let numItems = 0
    cart.forEach(item => {
      numItems += item.quantity
    })
    setCartItems(numItems)
  }, [cart])

  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto -mt-7 max-w-6xl px-6 pb-2 pt-4 md:pt-6">
        <img src={logo.src}/>
        <Link href="/" passHref>
          <a className=" cursor-pointer">
            <h1 className="flex no-underline">
              <span className="text-xl font-primary font-bold tracking-tight pt-1">
                Inicio
              </span>
            </h1>
          </a>
        </Link>

        <Link href="/shop/Panialeria">
        <a className=" cursor-pointer">
          <h1 className="flex no-underline">
            <span className="text-xl font-primary font-bold tracking-tight pt-1">
               Pa&ntilde;aleria
              </span>
          </h1>
        </a>
        </Link>

        <Link href="/shop/Accesorios">
          <a className=" cursor-pointer">
            <h1 className="flex no-underline">
              <span className="text-xl font-primary font-bold tracking-tight pt-1">
               Accesorios
              </span>
            </h1>
          </a>
        </Link>

        <Link href="/">
          <a className=" cursor-pointer">
            <h1 className="flex no-underline">
              <span className="text-xl font-primary font-bold tracking-tight pt-1">
               Puericultura
              </span>
            </h1>
          </a>
        </Link>

        <Link href="/">
          <a className=" cursor-pointer">
            <h1 className="flex no-underline">
              <span className="text-xl font-primary font-bold tracking-tight pt-1">
               Lactancia
              </span>
            </h1>
          </a>
        </Link>

        <Link href="/admin">
          <a className=" cursor-pointer">
            <h1 className="flex no-underline">
              <span className="text-xl font-primary font-bold tracking-tight pt-1">
               Administracion
              </span>
            </h1>
          </a>
        </Link>

        <div>
          <UserSession/>
        </div>

        <div>
          <Link
            href="/cart"
            passHref
          >
            <a className=" relative" aria-label="cart">
              <FontAwesomeIcon className="text-palette-primary w-6 m-auto" icon={faShoppingCart} />
              {
                cartItems === 0 ?
                  null
                  :
                  <div
                    className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-2 transform translate-x-10 -translate-y-3"
                  >
                    {cartItems}
                  </div>
              }
            </a>
          </Link>
        </div>
      </div>
    </header >
  )
}

export default Nav
