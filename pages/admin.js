import Link from "next/link";
import withAuthorization from 'components/withAuthorization';

const Admin = () => {
    return (

            <div className="antialiased bg-blue-200 w-full font-ssans flex flex-wrap">
                <div className="flex flex-wrap m-2 w-full justify-self-center grid grid-cold-1 md:grid-cols-2 container mx-auto">
                    <Link legacyBehavior href="/bills">
                        <div className="pl-1 my-4 w-80 h-24 flex lg:w-3/4 justify-self-center bg-green-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Facturaci&oacute;n</p>
                                    <p className="text-lg">Detalle de las facturas generadadas</p>
                                </div>
                                <div className="my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link legacyBehavior href="/stock">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-blue-500 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Stock</p>
                                    <p className="text-lg">Detalle del stock de lo articulos</p>
                                </div>
                                <div className="my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link legacyBehavior href="/products">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-yellow-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Articulos</p>
                                    <p className="text-lg">Detalle de los articulos</p>
                                </div>
                                <div className="my-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link legacyBehavior href="/users">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-yellow-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Usuarios</p>
                                    <p className="text-lg">Detalle de los usuario del cargados</p>
                                </div>
                                <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>       
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link legacyBehavior href="/checkout">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-green-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Checkout</p>
                                    <p className="text-lg">Detalle de los checkouts generados</p>
                                </div>
                                <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link legacyBehavior href="/brand">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-blue-500 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Marcas</p>
                                    <p className="text-lg">Detalle de las marcas de articulos</p>
                                </div>
                                <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link legacyBehavior href="/category">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-blue-500 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Categorias</p>
                                    <p className="text-lg">Detalle de las categorias de articulos</p>
                                </div>
                                <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link legacyBehavior href="/reports">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-green-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Reportes</p>
                                    <p className="text-lg">Detalle de los reportes generados</p>
                                </div>
                                <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link legacyBehavior href="/proveedores">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-green-400 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Proveedores</p>
                                    <p className="text-lg">Detalle de los provedores</p>
                                </div>
                                <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link legacyBehavior href="/size">
                        <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-blue-500 rounded-lg shadow-md cursor-pointer">
                            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
                                <div className="my-auto">
                                    <p className="font-bold">Talles</p>
                                    <p className="text-lg">Detalle de los talles de articulos</p>
                                </div>
                                <div className="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                    
                    
                </div>
        </div>
    )

}

export default withAuthorization(Admin);