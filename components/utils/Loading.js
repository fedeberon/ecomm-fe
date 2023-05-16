

const Loading = ({message}) => {

    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-filter"></div>
                <div className="flex items-center justify-center">
                    <div className="w-16 h-16 border-b-2 border-white-900 rounded-full animate-spin"></div>
                </div>
            </div>
            <h2 className="text-center text-black text-xl font-semibold pt-8">Buscando...</h2>
            <p className="w-1/3 text-center text-white">{message}</p>
        </>


    )
}

export default Loading;