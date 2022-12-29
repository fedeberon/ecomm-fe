import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "/images/logoMati.png";
import UserSession from "@/components/users/UserSession";
import { useSession } from "next-auth/client";
import Loading from "./utils/Loading";


function Nav() {
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const [session, loading] = useSession();
  const [isShow, setIsShow] = useState(false)
  const [load, setLoad] = useState(false)

  const handleMenu = () => {
    setIsShow(!isShow)
  }
  useEffect(() => {
    let numItems = 0;
    cart.forEach((item) => {
      numItems += item.quantity;
    });
    setCartItems(numItems);
  }, [cart]);

  const refreshPañaleria = () => {
    setLoad(true)
    window.location.href = "/shop/Pañaleria"
    setLoad(false)
  }

  return (

    <header className="w-full sticky lg:static top-0 z-50 bg-white">

      <div className="flex items-center justify-between flex-wrap p-2">
        <div className="block lg:hidden">
          <button onClick={handleMenu} className="flex py-2 hover:border-grey">
            <FontAwesomeIcon icon={faBars} className="w-5 top-6 ml-2 mr-0 items-center" />
          </button>
        </div>
        <Link href="/">
          <div className="flex sm:block cursor-pointer flex-row items-center">
            <img src={logo.src} className="w-16 mx-16 ml-8 md:mx-64 lg:mx-4 lg:w-24" />
          </div>
        </Link>
        <div className="lg:order-2 -mx-8 lg:m-auto">
          <UserSession session={session} />
        </div>
        <div className="lg:order-3">
          <Link href="/cart" passHref>
            <a className="flex md:-mt-1 flex-wrap ml-2 md:ml-1 object-right p-6 lg:order-last md:p-3 rounded-lg hover:bg-gray-50" aria-label="cart">
              <FontAwesomeIcon
                className="text-palette-primary h-6"
                icon={faShoppingCart}
              />
              {cartItems === 0 ? null : (
                <div className=" text-xs bg-palette-secondary rounded-full text-white font-semibold py-1 px-2 ">
                  {cartItems}
                </div>
              )}
            </a>
          </Link>
        </div>

        <div
          id="menu"
          className={`w-full block flex-grow ${isShow ? "" : "hidden"} divide-y divide-y-reverse justify-between divide-gray-200 lg:divide-none lg:flex lg:justify-self-center lg:w-auto`}
        >
          <Link href="/" >
            <a className="text-smw border-b border-gray-200 block mt-4 lg:inline-block lg:border-none lg:mt-0">
              <h1>
                <span className="text-xl font-primary text-palette-primary md:p-2 rounded-md hover:bg-gray-50 font-bold tracking-tight pt-1">
                  Inicio
                </span>
              </h1>
            </a>
          </Link>

          <Link href="/shop/Pañaleria">
            <a className="text-smw block mt-4 lg:inline-block lg:mt-0" onClick={refreshPañaleria}>
              <h1>
                <span className="text-xl font-primary text-palette-primary font-bold md:p-2 rounded-md hover:bg-gray-50 tracking-tight pt-1">
                  Pa&ntilde;aleria
                </span>
              </h1>
            </a>
          </Link>

          <Link href="/accessories/inicio">
            <a className=" text-smw block mt-4 lg:inline-block lg:mt-0">
              <h1>
                <span className="text-xl font-primary text-palette-primary font-bold tracking-tight md:p-2 rounded-md hover:bg-gray-50 pt-1" >
                  Accesorios
                </span>
              </h1>
            </a>
          </Link>

          <Link href="/about/about">
            <a className="text-smw block mt-4 lg:inline-block lg:mt-0">
              <h1>
                <span className="text-xl font-primary text-palette-primary font-bold tracking-tight md:p-2 rounded-md hover:bg-gray-50">
                  Quienes somos
                </span>
              </h1>
            </a>
          </Link>

          {session?.user?.role?.includes("ADMIN") ? (
            <Link href="/admin">
              <a className="top-4 right-3 lg:order-last text-smw block mt-4 mr-4 lg:inline-block lg:mt-0">
                <h1>
                  <span className="text-xl font-primary text-palette-primary md:p-2 rounded-md hover:bg-gray-50 font-bold tracking-tight pt-1">
                    Administracion
                  </span>
                </h1>
              </a>
            </Link>
          ) : (
            ""
          )}
        </div>

        {
          load ?
            <Loading>
            </Loading>
            :
            <></>

        }
      </div>
    </header>
  );
}

export default Nav;
