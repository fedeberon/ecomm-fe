import {signOut} from "next-auth/client"
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import useComponentVisible from "../../hooks/UseComponentVisible";

const UserSession = ({session}) => {
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false);

    const showOptionsSession = () => {
        setIsComponentVisible(true)
    }

    if (session) {
        return (
                <div className="relative inline-block text-left">
                        <div className="text-smw block lg:relative lg:-mt-2">
                            <button type="button"
                                    onClick={showOptionsSession}
                                    className="inline-flex justify-center md:mt-2 md:ml-2 w-full rounded-md px-3 py-2 text-m font-primary text-palette-primary hover:text-palette-secondary capitalize  focus:ring-2 focus:ring-palette-lighter focus:ring-opacity-75"
                                    id="menu-button" aria-expanded="true" aria-haspopup="true">
                                {(session.user.name).toUpperCase()}
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                        <div
                            ref={ref}
                            className={`${isComponentVisible ? "" : "hidden"}  z-50 absolute mt-2 w-46 lg:w-32 lg:right-0 rounded-md shadow-lg bg-white ring-2 ring-palette-lighter ring-opacity-75 focus:outline-none md:-mx-2 -mx-0`}
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1 " role="none">
                                <Link href="/shoping/mine">
                                <a href="#" className="text-palette-primary block text-center hover:bg-gray-50 px-4 py-2 text-sm" role="menuitem"
                                   tabIndex="-1" id="menu-item-0">Mis Compras</a>
                                </Link>
                                <Link href={`/users/wallet/${session.user.username}`}>
                                <a href="#" className="text-palette-primary block px-4 py-2 text-center text-sm hover:bg-gray-50" role="menuitem"
                                   tabIndex="-1" id="menu-item-1">Mi Billetera</a> 
                                </Link>
                                <Link href={`/users/${session.user.username}`}>
                                    <a className="text-palette-primary block px-4 py-2 text-center text-sm hover:bg-gray-50" role="menuitem"
                                       tabIndex="-1" id="menu-item-2">Mis Datos</a>
                                </Link>
                                <form method="POST" action="#" role="none">
                                    <button onClick={() => signOut({ callbackUrl: '/' })}
                                            className="text-palette-primary block w-full text-center px-4 py-2 text-sm hover:bg-gray-50"
                                            role="menuitem" tabIndex="-1" id="menu-item-3">
                                        Salir
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
        )
    } else {
        return (
            <Link href="/api/auth/signin">
                <a className="flex  md:-mt-1 flex-wrap ml-2 md:ml-1 object-right p-6 lg:order-last md:p-3 rounded-lg hover:text-palette-secondary" aria-label="cart">
                    <FontAwesomeIcon
                        className="text-palette-primary hover:text-palette-secondary h-6"
                        icon={faUserCircle}
                    />
                </a>
          </Link>
        )
    }
}

export default UserSession