import{useState}from "react"


const Banner = ({}) =>{

    const [banner, setBanner] = useState(1)


    const siguiente = ()=> {
        setBanner(banner+1)
        if (banner === 3) {
            setBanner(1)
        }

    }
    
    const anterior = ()=> {
        setBanner(banner-1)
        if (banner === 1) {
            setBanner(3);
        }
        
    }

    return(
            
                <div className="w-full">
                    <div  className="relative flex overflow-hidden h-full shadow-lg">
                        <div name={`promo1`} className={`flex my-6 scroll-ml-6 rounded-xl lg:block hover:w-96 hover:h-96 ${banner ==1 ? "" : "hidden md:hidden" } shadow-2xl min-w-96 h-80 w-80 m-auto`}>
                            <img src="images/Oferta2.png" className="w-full h-full rounded-xl"></img>
                        </div>
                        <div name={`promo2`} className={`flex my-6 scroll-ml-6 rounded-xl lg:block hover:w-96 hover:h-96 ${banner ==2 ? "" : "hidden md:hidden" } shadow-2xl min-w-96 h-80 w-80 m-auto`}>
                            <img src="images/Oferta.png" className="w-full h-full rounded-xl"></img></div>
                        <div name={`promo3`} className={`flex my-6 scroll-ml-6 rounded-xl lg:block hover:w-96 hover:h-96 ${banner ==3 ? "" : "hidden md:hidden" } shadow-2xl min-w-96 h-80 w-80 m-auto`}>
                            <img src="images/Oferta3.png" className="w-full h-full rounded-xl"></img>
                        </div>
                        <div className="flex absolute items-center w-full h-full justify-between">
                            <button id="left"  onClick={anterior} className="relative h-full items-center px-6 flex bg-gradient-to-r from-gray-300 to-transparent lg:hidden "> 
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button id="rigth" onClick={siguiente} className="relative h-full items-center px-6 flex bg-gradient-to-r from-transparent to-gray-300 lg:hidden "> 
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div> 
                    </div>
                </div>
        
    )
}

export default Banner;