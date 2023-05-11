const Loading = ({message}) => {

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
                <div className="w-16 h-16 border-b-2 border-white-900 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-center text-white text-xl font-semibold pt-8">Buscando...</h2>
            <p className="w-1/3 text-center text-white">{message}</p>
        </div>
    )
}

export default Loading;