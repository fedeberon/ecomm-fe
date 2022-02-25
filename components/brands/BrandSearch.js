import { useState } from "react"


const BrandSearch = ({brands, onclick}) => {
    const [isShow, setIsShow] = useState(false)

    const handleMenu=()=>{
        setIsShow(!isShow)
      }

    return (
 
           
                
                <div className="rounded w-40 ">
                    <button className=" bg-purple-600 flex justify-between hover:bg-purple-500 rounded h-12 px-2 w-full" onClick={handleMenu}>
                        <div className="m-2">Marcas</div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                        <div id="menu" className={` ${isShow ? "" : "hidden"} rounded-b-lg bg-purple-200 overflow-y-auto `}>
                        {
                            brands
                            ?
                            brands.map((brand, index) => (
                                <div key={index}>
                                    <div className="block">
                                        <div className="mt-2 px-2 ">
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox rounded text-red-500" onClick={onclick} value={brand.id}/>
                                                    <span className="ml-2">{brand.name}</span>
                                                </label>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <></>
                        }
                        </div>
                    </div>
                    
            
    )


}

export default BrandSearch