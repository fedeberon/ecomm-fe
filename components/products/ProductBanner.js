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
                        <div name={`promo1`} className={`flex my-6 scroll-ml-6 rounded-xl lg:block hover:w-96 hover:h-96 ${banner ==1 ? "" : "hidden md:hidden" } shadow-2xl min-w-96 h-96 w-96 m-auto`}>
                            <img src="images/Oferta2.png" className="w-full h-full rounded-xl"></img>
                        </div>
                        <div name={`promo2`} className={`flex my-6 scroll-ml-6 rounded-xl lg:block hover:w-96 hover:h-96 ${banner ==2 ? "" : "hidden md:hidden" } shadow-2xl min-w-96 h-96 w-96 m-auto`}>
                            <img src="images/Oferta.png" className="w-full h-full rounded-xl"></img></div>
                        <div name={`promo3`} className={`flex my-6 scroll-ml-6 rounded-xl lg:block hover:w-96 hover:h-96 ${banner ==3 ? "" : "hidden md:hidden" } shadow-2xl min-w-96 h-96 w-96 m-auto`}>
                            <img src="images/Oferta3.png" className="w-full h-full rounded-xl"></img>
                        </div>
                        <div className="flex absolute   items-center w-full h-full justify-between">
                            <button id="left"  onClick={anterior} className="relative h-full items-center w-1/2 flex lg:hidden "> 
                                    
                            </button>
                            <button id="rigth" onClick={siguiente} className="relative h-full items-center w-1/2 flex lg:hidden "> 
                            </button>
                        </div> 
                    </div>
                </div>
        
    )
}

export default Banner;