const BrandSearch = ({brands, onclick}) => {

    return (
 
           
                
                <div className="rounded w-40 bg-purple-200 ">
                    <div className=" bg-purple-600 flex hover:bg-purple-500 rounded h-12 px-2 w-full">
                        <div className="m-2 text-2xl">Marcas</div>
                    </div>
                        <div id="menu" className={`overflow-y-auto pb-2  `}>
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