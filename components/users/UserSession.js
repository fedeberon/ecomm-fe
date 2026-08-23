import { signOut } from "next-auth/client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const UserSession = ({ session }) => {
    const [isOpen, setIsOpen] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!session) {
        return (
            <Link href="/api/auth/signin">
                <a
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-palette-primary shadow-sm transition hover:text-palette-secondary"
                    aria-label="Iniciar sesión"
                >
                    <FontAwesomeIcon className="h-6" icon={faUserCircle} />
                </a>
            </Link>
        );
    }

    const rawName = session?.user?.name || session?.user?.username || "Mi cuenta";
    const displayName = rawName.trim().split(/\s+/)[0];

    return (
        <div ref={componentRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="flex h-10 max-w-[150px] items-center gap-2 rounded-full border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-palette-sdark hover:text-palette-sdark"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <FontAwesomeIcon className="h-5 flex-shrink-0 text-palette-primary" icon={faUserCircle} />
                <span className="truncate">{displayName}</span>
                <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            <div
                className={`${isOpen ? "block" : "hidden"} absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white py-1 shadow-xl`}
                role="menu"
            >
                <div className="border-b border-gray-100 px-4 py-2">
                    <p className="truncate text-xs font-semibold text-gray-800">{rawName}</p>
                    {session?.user?.username && (
                        <p className="truncate text-[11px] text-gray-400">@{session.user.username}</p>
                    )}
                </div>

                <Link href="/shoping/mine">
                    <a className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">Mis compras</a>
                </Link>
                <Link href={`/users/wallet/${session.user.username}`}>
                    <a className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">Mi billetera</a>
                </Link>
                <Link href={`/users/${session.user.username}`}>
                    <a className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">Mis datos</a>
                </Link>
                <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="block w-full border-t border-gray-100 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                    role="menuitem"
                >
                    Salir
                </button>
            </div>
        </div>
    );
};

export default UserSession;
