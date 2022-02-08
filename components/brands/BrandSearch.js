import index from "@/components/filter";

const BrandSearch = ({brands, onclick}) => {

    return (
 
           <>
                <b> Marcas </b>
                {
                    brands
                    ?
                    brands.map((brand, index) => (
                        <div key={index}>
                            <div className="block">
                                <div className="mt-2">
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox text-green-500" onClick={onclick} value={brand.id}/>
                                            <span className="ml-2">{brand.name}</span>
                                        </label>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <></>
                }
                    
            </>
    )


}

export default BrandSearch