import {signOut, useSession} from "next-auth/client"
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import useComponentVisible from "../../hooks/UseComponentVisible";

const UserSession = () => {
    const [session, loading] = useSession()
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
                        <div>
                            <button type="button"
                                    onClick={showOptionsSession}
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                    id="menu-button" aria-expanded="true" aria-haspopup="true">
                                {session.user.name}
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                        <div
                            ref={ref}
                            className={`${isComponentVisible ? "" : "hidden"} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <Link href="/shoping/mine">
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"
                                   tabIndex="-1" id="menu-item-0">Mis Compras</a>
                                </Link>
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"
                                   tabIndex="-1" id="menu-item-1">Favoritos</a>
                                <Link href="/users/profile">
                                    <a className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"
                                       tabIndex="-1" id="menu-item-2">Mis Datos</a>
                                </Link>
                                <form method="POST" action="#" role="none">
                                    <button onClick={() => signOut({ callbackUrl: window.location.href = '/' })}
                                            className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
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
                    <a className="relative" aria-label="login">
                        <FontAwesomeIcon className="text-palette-primary w-6 m-auto" icon={faUserCircle} />
                    </a>
                </Link>
        )
    }
}

export default UserSession