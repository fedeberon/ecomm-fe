import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "/images/logoMati.png";
import UserSession from "@/components/users/UserSession";
import { useSession } from "next-auth/client";
import { findAll } from "services/categoriesService";

function Nav() {
  const cart = useCartContext()[0];
  const [cartItems, setCartItems] = useState(0);
  const [session] = useSession();
  const [isShow, setIsShow] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      setCategories(await findAll());
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItems(total);
  }, [cart]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          <button
            id="menuButton"
            onClick={() => setIsShow(!isShow)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Abrir menú"
          >
            <FontAwesomeIcon icon={faBars} className="w-5 text-gray-700" />
          </button>

          <Link href="/">
            <a className="flex-shrink-0 flex items-center">
              <img src={logo.src} className="w-12 h-12 object-contain" alt="Tienda" />
            </a>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar productos, marcas y categorías"
              className="w-full bg-gray-100 border border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-palette-secondary focus:bg-white"
            />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            <div className="hidden sm:block">
              <UserSession session={session} />
            </div>
            <Link href="/cart" passHref>
              <a className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100" aria-label="Carrito">
                <FontAwesomeIcon icon={faShoppingCart} className="h-5 text-gray-700" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center text-xs bg-palette-secondary text-white font-bold rounded-full">
                    {cartItems}
                  </span>
                )}
              </a>
            </Link>
          </div>
        </div>

        <div className="md:hidden pb-3 relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 -mt-1.5 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Buscar productos"
            className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-11 pr-4 text-sm focus:outline-none"
          />
        </div>

        <nav className={`${isShow ? "block" : "hidden"} lg:flex lg:items-center lg:justify-center lg:gap-8 border-t border-gray-100 lg:border-0`}>
          <Link href="/"><a className="block py-3 text-sm font-semibold text-gray-700 hover:text-palette-dark">Inicio</a></Link>
          <Link href="/diapers/inicio"><a className="block py-3 text-sm font-semibold text-gray-700 hover:text-palette-dark">Pañalería</a></Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoriesVisible(!categoriesVisible)}
              className="flex items-center gap-1 py-3 text-sm font-semibold text-gray-700 hover:text-palette-dark"
            >
              Categorías
              <span className="text-xs">⌄</span>
            </button>
            {categoriesVisible && (
              <div className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full lg:w-64 bg-white border border-gray-200 rounded-xl shadow-xl p-2 mb-3 lg:mb-0">
                <div className="max-h-72 overflow-y-auto no-scrollbar">
                  {categories?.map((category) => (
                    <Link key={category.id} href={`/accessories/${category.id}`} passHref>
                      <a onClick={() => setCategoriesVisible(false)} className="block px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-palette-dark">
                        {category.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/about/inicio"><a className="block py-3 text-sm font-semibold text-gray-700 hover:text-palette-dark">Quiénes somos</a></Link>
          {session?.user?.role?.includes("ADMIN") && (
            <Link href="/admin"><a className="block py-3 text-sm font-semibold text-gray-700 hover:text-palette-dark">Administración</a></Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
