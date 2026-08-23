import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";
import UserSession from "@/components/users/UserSession";
import BrandLogo from "@/components/BrandLogo";
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
    const loadCategories = async () => setCategories(await findAll());
    loadCategories();
  }, []);

  useEffect(() => {
    setCartItems(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cart]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="hidden md:block bg-palette-sdark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex items-center justify-between text-xs font-semibold tracking-wide">
          <div className="flex items-center gap-5">
            <span>Envíos a todo el país</span>
            <span className="opacity-40">|</span>
            <span>Compras 100% seguras</span>
          </div>
          <span className="opacity-90">Todo para acompañar cada etapa</span>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 lg:h-24 flex items-center gap-6">
            <button
              id="menuButton"
              onClick={() => setIsShow(!isShow)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
              aria-label="Abrir menú"
            >
              <FontAwesomeIcon icon={faBars} className="w-5 text-gray-700" />
            </button>

            <Link href="/">
              <a className="flex shrink-0 items-center">
                <BrandLogo />
              </a>
            </Link>

            <div className="hidden lg:flex items-center gap-7 ml-auto">
              <Link href="/">
                <a className="flex items-center gap-2 py-3 text-sm font-bold text-gray-800 hover:text-palette-sdark">
                  <FontAwesomeIcon icon={faHome} className="w-4 text-palette-sdark" />
                  Inicio
                </a>
              </Link>

              <Link href="/diapers/inicio">
                <a className="py-3 text-sm font-bold text-gray-800 hover:text-palette-sdark">Pañalería</a>
              </Link>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoriesVisible(!categoriesVisible)}
                  className="flex items-center gap-1 py-3 text-sm font-bold text-gray-800 hover:text-palette-sdark"
                >
                  Categorías <span className="text-xs">⌄</span>
                </button>
                {categoriesVisible && (
                  <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-2">
                    <div className="max-h-72 overflow-y-auto no-scrollbar">
                      {categories?.map((category) => (
                        <Link key={category.id} href={`/accessories/${category.id}`} passHref>
                          <a
                            onClick={() => setCategoriesVisible(false)}
                            className="block px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-palette-slighter hover:text-palette-dark"
                          >
                            {category.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/about/inicio">
                <a className="py-3 text-sm font-bold text-gray-800 hover:text-palette-sdark">Quiénes somos</a>
              </Link>

              <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm">
                <UserSession session={session} />
              </div>

              <Link href="/cart" passHref>
                <a
                  className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-palette-sdark hover:bg-palette-dark shadow-md"
                  aria-label="Carrito"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="h-5 text-white" />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 flex items-center justify-center text-xs bg-white text-palette-sdark font-bold rounded-full shadow">
                      {cartItems}
                    </span>
                  )}
                </a>
              </Link>
            </div>
          </div>

          <nav className={`${isShow ? "block" : "hidden"} lg:hidden border-t border-gray-100 pb-3`}>
            <Link href="/"><a className="block py-3 text-sm font-bold text-gray-700">Inicio</a></Link>
            <Link href="/diapers/inicio"><a className="block py-3 text-sm font-bold text-gray-700">Pañalería</a></Link>
            <button onClick={() => setCategoriesVisible(!categoriesVisible)} className="block w-full text-left py-3 text-sm font-bold text-gray-700">Categorías</button>
            {categoriesVisible && (
              <div className="pl-3 pb-2">
                {categories?.map((category) => (
                  <Link key={category.id} href={`/accessories/${category.id}`} passHref>
                    <a className="block py-2 text-sm text-gray-600">{category.name}</a>
                  </Link>
                ))}
              </div>
            )}
            <Link href="/about/inicio"><a className="block py-3 text-sm font-bold text-gray-700">Quiénes somos</a></Link>
            {session?.user?.role?.includes("ADMIN") && (
              <Link href="/admin"><a className="block py-3 text-sm font-bold text-gray-700">Administración</a></Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Nav;
