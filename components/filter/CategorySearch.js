import { useState } from "react";


const CategorySearch = ({categories, onclick}) => {
    const [isMenu, setIsMenu] = useState(false)

    const handleMenu=()=>{
        setIsMenu(!isMenu)
    }


    return (
 
           
                
            <div className="rounded w-40  ">
            <button className=" bg-indigo-600 flex hover:bg-indigo-500 rounded  px-2 w-full h-auto" onClick={handleMenu}>
                <div className="m-2 text-2xl">Categoria</div>
            </button>
                <div id="menu" className={`overflow-y-scroll bg-indigo-200 pb-2 max-h-80 ${isMenu ? "" : `hidden`}`}>
                        {
                            categories
                            ?
                            categories.map((category, index) => (
                                <div key={index}>
                                    <div className="block">
                                        <div className="mt-2 px-2 ">
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className="form-checkbox rounded text-red-500" onClick={onclick} value={category.id}/>
                                                    <span className="ml-2">{category.name}</span>
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

export default CategorySearch