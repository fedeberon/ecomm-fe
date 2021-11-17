const Index = ({activeClass, showing}) => {

    return (

        <div className="absolute min-h-screen flex w-1/4 z-10">
            <div className={`sidebar rounded-md bg-white shadow-lg py-10 pl-4 px-20 border border-t-4 border-gray-600 shadow-2xl
                    inset-y-0 left-0 transform  transition duration-200 ease-in-out
                      ${activeClass ? "relative translate-x-0" : "-translate-x-full" }`}>
                <div className="h-full flex flex-col justify-between">
                    <div className="hover:overflow-auto overflow-hidden">
                        <div className="mb-10">
                            <div className="text-sm text-gray-500">Overview</div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Overview</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="text-sm text-gray-500">Header 1</div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 1</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 2</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 3</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 4</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="text-sm text-gray-500">Header 2</div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 1</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="text-sm text-gray-500">Header 3</div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 1</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 2</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 3</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 4</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="text-sm text-gray-500">Header 4</div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 1</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 2</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 3</span>
                            </div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Menu 4</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                            <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                            <span className="text-gray-500">Account Mgnt</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center cursor-pointer">
                            <i className="animate-pulse h-5 w-5 rounded-full bg-gray-300 mr-2"></i>
                            <span className="text-gray-500 truncate">Firstname Lastname</span>
                            <i className="animate-pulse h-5 w-1 bg-gray-300 mx-3"></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}


export default Index