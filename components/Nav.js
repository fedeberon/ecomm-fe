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
import { findAll } from "services/categoriesService";


function Nav() {
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const [session, loading] = useSession();
  const [isShow, setIsShow] = useState(false)
  const [load, setLoad] = useState(false)
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [categories, setCategories] = useState([])


  const [color, setColor] = useState(false)
  
  useEffect(()=> {
    const changeColor = () => {
      if(window.scrollY >= 90){
        setColor(true)
      } else {
        setColor(false)
      }
    }

    window.addEventListener('scroll', changeColor)
  }, [])

  const handleMenu = () => {
    setIsShow(!isShow)
  }

  useEffect(async() => {
    setCategories(await findAll())
  }, [])

  useEffect(() => {
    let numItems = 0;
    cart.forEach((item) => {
      numItems += item.quantity;
    });
    setCartItems(numItems);
  }, [cart]);

  const showCategories = (() => {
    setCategoriesVisible(!categoriesVisible)
  })

  return (
    <header className={color ? "w-full sticky lg:static top-0 z-50 bg-white ease-in duration-300" : "w-full sticky lg:static top-0 z-50 bg-palette-bg ease-in duration-300"}>

      <div >
        <div className="flex items-center justify-between flex-wrap p-2">
        
        <div className="block lg:hidden">
          <button onClick={handleMenu} className="flex py-2 hover:border-grey">
            <FontAwesomeIcon icon={faBars} className="w-5 top-6 ml-2 mr-0 items-center" />
          </button>
        </div>
        <Link href="/">
          <div className="flex sm:block cursor-pointer flex-row items-center">
            <img src={logo.src} className="w-16 mx-16 ml-8 md:mx-64 lg:mx-4 lg:w-12" />
          </div>
        </Link>
        <div className="lg:order-2 -mx-8 lg:m-auto">
          <UserSession session={session} />
        </div>
        <div className="lg:order-3">
          <Link href="/cart" passHref>
            <a className="flex md:-mt-1 flex-wrap ml-2 md:ml-1 object-right p-6 lg:order-last md:p-3 rounded-lg hover:text-palette-secondary" aria-label="cart">
              <FontAwesomeIcon
                className="text-palette-primary hover:text-palette-secondary h-6"
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
            <a className="text-smw border-b border-gray-200 block mt-4 lg:inline-block lg:border-none lg:mt-0
               text-m font-primary text-palette-primary md:p-2 rounded-md hover:text-palette-secondary tracking-tight pt-1">
                INICIO                
            </a>
          </Link>

          <Link href="/diapers/inicio">
            <a className="text-smw block mt-4 lg:inline-block lg:mt-0
                text-m font-primary text-palette-primary md:p-2 rounded-md hover:text-palette-secondary tracking-tight pt-1">
                  PAÑALERIA
            </a>
          </Link>

          <div className="relative text-smw block mt-4 lg:inline-block lg:mt-0">
            <button 
                type="button"
                onClick={showCategories}
                className="inline-flex text-m font-primary text-palette-primary tracking-tight md:p-2 rounded-md hover:text-palette-secondary">
                CATEGORÍAS
                  <svg className="h-5 w-5 align-items-lg-stretch" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"/>
                  </svg>
              </button>       
              <div
                className={`${categoriesVisible ? "" : "hidden"}   z-50 absolute mt-2 w-46 lg:w-32 lg:right-0 rounded-md shadow-lg bg-white ring-2 ring-palette-lighter ring-opacity-75 focus:outline-none md:-mx-2 -mx-0`}
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1 " role="none">
                  {categories?.map((category) =>(
                      <Link href={`/accessories/${category.id}`} passHref legacyBehavior>
                        <a href="#" onClick={showCategories} className="text-palette-primary block text-center hover:text-palette-secondary px-4 py-2 text-sm" role="menuitem"
                        tabIndex="-1" id="menu-item-0">{category.name}</a>
                      </Link>
                    ))
                  }
                </div>
            </div>
          </div>

          <Link href="/about/inicio">
            <a className="text-smw block mt-4 lg:inline-block lg:mt-0 text-m font-primary text-palette-primary tracking-tight md:p-2 rounded-md hover:text-palette-secondary">
                  QUIENES SOMOS
            </a>
          </Link>

          {session?.user?.role?.includes("ADMIN") ? (
            <Link href="/admin">
              <a className="top-4 right-3 lg:order-last text-smw block mt-4 mr-4 lg:inline-block lg:mt-0">
                <h1>
                  <div className="text-m font-primary text-palette-primary md:p-2 rounded-md hover:text-palette-secondary tracking-tight pt-1">
                    ADMINISTRACION
                  </div>
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
      </div>
    </header>
  );
}

export default Nav;
