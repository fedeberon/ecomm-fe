import Link from "next/link";

const UserNav = () => { 
    
    return (

                    <div class="flex-none h-full w-1/4 flex-auto rounded-md p-4 right-full border-r bg-gray-300">
                        <div class="flex-auto w-1/2 h-3/4 rounded-md flex-auto text-gray-500">
                            <h3 class="pl-1 text-sm flex items-center py-2 mb-2 hover:bg-gray-300 hover:text-gray-700 rounded-md transition duration-200 ease-in">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="black">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                                <Link legacyBehavior href={"/users/profile"}>
                                <a class=" hover:text-black transition duration-200 ease-linear">General</a>
                                </Link>
                            </h3>
                            <h3 class="pl-1 text-sm flex items-center py-2 mb-2 hover:bg-gray-300 hover:text-gray-700 rounded-md transition duration-200 ease-in">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="black">
                                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                                </svg>
                                <Link legacyBehavior href={"/shoping/mine"}>
                                <a class="flex hover:text-black transition duration-200 ">Actividad</a>
                                </Link>
                            </h3>
                            <h3 class="pl-1 text-sm flex items-center py-2 mb-2 hover:bg-gray-300 hover:text-gray-700 rounded-md transition duration-200 ease-in">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="black">
                                    <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd" />
                                </svg>
                                <Link legacyBehavior href={"/users/segurity"}>
                                <a class="hover:text-black transition duration-200 ease-linear" href="#">Seguridad</a>
                                </Link>
                            </h3>

                            <h3 class="pl-1 text-sm flex items-center py-2 mb-2 hover:bg-gray-300 hover:text-gray-700 rounded-md transition duration-200 ease-in">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="black">
                                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                </svg>
                                <Link legacyBehavior href={"/users/config"}>
                                <a class="hover:text-black transition duration-200 ease-linear" href="#">Preferencias</a>
                                </Link>
                            </h3>
                        </div>
                     </div>
  );
};

export default UserNav;