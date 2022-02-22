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

    <header className="border-b border-palette-lighter w-full sticky top-0 z-20 bg-white"> 
    
      <div className="flex items-center justify-between flex-wrap mx-2 p-2 lg:flex lg:flex-nowrap lg:px-12 ">
        <Link href="/">
          <div className="flex cursor-pointer flex-row items-center"> 
              <img src={logo.src} className="w-16 hidden sm:block lg:w-24"/>
          </div>
        </Link>  
        <div className="block lg:hidden"> 
          <button onClick={handleMenu} className="flex py-2 hover:border-grey">
            <FontAwesomeIcon icon={faBars} className="w-5 left-1 top-6 ml-2 items-center" />
            <span className="w-14 ml-2">MENU</span>
          </button> 
        </div> 
        <div className="lg:order-2">
            <UserSession session={session} />
          </div>
          <div className="lg:order-3">
            <Link href="/cart" passHref>
              <a className="flex flex-wrap object-right p-6 justify-self-end lg:order-last" aria-label="cart"> 
                <FontAwesomeIcon
                  className="text-palette-primary h-6"
                  icon={faShoppingCart}
                />
                {cartItems === 0 ? null : (
                  <div className=" text-xs bg-yellow-300 text-gray-900 font-semibold py-1 px-2 ">
                    {cartItems}
                  </div>
                )}
              </a>
            </Link>
          </div>
        
        <div
          id="menu"
          className={`w-4/5 block flex-grow ${isShow ? "" : "hidden"} divide-y divide-y-reverse divide-gray-200 lg:divide-none lg:flex lg:justify-self-center lg:w-auto`}
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
                <a className="flex flex-wrap top-4 right-3 lg:order-last text-smw block mt-4 lg:inline-block lg:mt-0 mr-4">
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
          </div>
         
        
        
      </div>
    </header>
  );
}

export default Nav;
