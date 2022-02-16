import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "/images/Logo Dulce bb.png";
import UserSession from "@/components/users/UserSession";
import Index from "./admin";
import { useSession } from "next-auth/client";

import { getServerSideProps } from "pages/login";
import { padding } from "tailwindcss/defaultTheme";

function Nav() {
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const [session, loading] = useSession();
  const [isShow, setIsShow] = useState(false)

  const handleMenu=()=>{
    setIsShow(!isShow)
  }
  useEffect(() => {
    let numItems = 0;
    cart.forEach((item) => {
      numItems += item.quantity;
    });
    setCartItems(numItems);
  }, [cart]);

  return (

    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white"> 
    
      <div className="flex items-center left  flex-wrap mx-2 p-6lg:flex lg:flex-nowrap lg:px-12	 lg:max-w-screen-2xl">
        <Link href="/">
        <div className="flex flex-row items-center"> 
            <img src={logo.src} className="w-16 invisible sm:visible lg:w-24"/>
            <div className="block lg:hidden"> 
              <button onClick={handleMenu} className="flex px-16 py-2 hover:border-grey">
                <FontAwesomeIcon icon={faBars} className="w-5 ml-2" />
                <span className="w-14 items-center ml-2">MENU</span>
              </button> 
            </div>
        </div> 
        </Link>
        <Link href="/cart" passHref>
          <a className="flex flex-wrap relative lg:order-last" aria-label="cart"> 
            <FontAwesomeIcon
              className="text-palette-primary h-6"
              icon={faShoppingCart}
            />
            {cartItems === 0 ? null : (
              <div className="absolute top-4 left-6 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-2 ">
                {cartItems}
              </div>
            )}
          </a>
        </Link>
        <div
          id="menu"
          className={`w-4/5 block flex-grow ${isShow ? "" : "hidden"} divide-y divide-y-reverse divide-gray-200 lg:divide-none lg:flex lg:justify-around lg:w-auto`}
        >
          <Link href="/" >
            <a className="text-smw border-b border-gray-200 block mt-4 lg:inline-block lg:border-none lg:mt-0 mr-4">
              <h1>
                <span className="text-xl font-primary font-bold tracking-tight pt-1">
                  Inicio
                </span>
              </h1>
            </a>
          </Link>

          <Link href="/shop/Panialeria">
            <a className="text-smw block mt-4 lg:inline-block lg:mt-0 mr-4">
              <h1>
                <span className="text-xl font-primary font-bold tracking-tight pt-1">
                  Pa&ntilde;aleria
                </span>
              </h1>
            </a>
          </Link>

          <Link href="/shop/Accesorios">
            <a className=" text-smw block mt-4 lg:inline-block lg:mt-0 mr-4">
              <h1>
                <span className="text-xl font-primary font-bold tracking-tight pt-1">
                  Accesorios
                </span>
              </h1>
            </a>
          </Link>

          <Link href="/shop/Puericultura">
            <a className="text-smw block mt-4 lg:inline-block lg:mt-0 mr-4">
              <h1>
                <span className="text-xl font-primary font-bold tracking-tight pt-1">
                  Puericultura
                </span>
              </h1>
            </a>
          </Link>

          <Link href="/shop/Lactancia">
            <a className="text-smw block mt-4 lg:inline-block lg:mt-0 mr-4">
              <h1>
                <span className="text-xl font-primary font-bold tracking-tight pt-1">
                  Lactancia
                </span>
              </h1>
            </a>
          </Link>
          {session?.user?.role?.includes("ADMIN") ? (
            <Link href="/admin">
              <a className=" text-smw block mt-4 lg:inline-block lg:mt-0 mr-4">
                <h1>
                  <span className="text-xl font-primary font-bold tracking-tight pt-1">
                    Administracion
                  </span>
                </h1>
              </a>
            </Link>
          ) : (
            ""
          )}
          <UserSession session={session} />
        </div>
      </div>
    </header>
  );
}

export default Nav;
