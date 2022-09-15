import { useState } from "react";


const BrandSearch = ({brands, onclick}) => {
    const [isMenu, setIsMenu] = useState(false)

    const handleMenu=()=>{
        setIsMenu(!isMenu)
    }
    return (
                <div className="flex-center col-span-2 w-auto rounded ">
                    <div className="w-auto bg-white text-sm text-palette-primary font-bold px-5 py-2">
                        <div className="m-2 -ml-4 text-2xl">Marcas</div>
                    </div>
                    <div id="menu" className={`overflow-y-auto max-h-96 no-scrollbar lg:grid lg:grid-cols-4`}>
                    {
                        brands
                        ?
                        brands.map((brand, index) => (
                            <div key={index}>
                                <div className="block">
                                    <div className="mt-2 px-2">
                                            <label className="inline-flex items-center">
                                                <input type="checkbox" className="form-checkbox rounded text-red-500 " onClick={onclick} value={brand.id}/>
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