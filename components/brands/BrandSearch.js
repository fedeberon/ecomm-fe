import { useState } from "react";


const BrandSearch = ({brands, onclick}) => {
    const [isMenu, setIsMenu] = useState(false)

    const handleMenu=()=>{
        setIsMenu(!isMenu)
    }



    return (
 
           
                
                <div className="rounded w-40 ">
                    <button className=" bg-purple-600 flex hover:bg-purple-500 rounded  px-2 w-full h-auto" onClick={handleMenu}>
                        <div className="m-2 text-2xl">Marcas</div>
                    </button>
                        <div id="menu" className={`overflow-y-scroll max-h-36 bg-purple-200 pb-2 ${isMenu ? "" : `hidden`}`}>
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