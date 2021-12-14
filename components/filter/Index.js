import {findAll} from "../../services/brandService";
import {useEffect, useState} from "react";
import * as productService from "../../services/productService";

const Index = () => {

    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);


   useEffect(() => {
       findAll().then(brands => {
           setFilteredBrands(brands);
       }).catch(error => {
           console.log(error);
       });
   }, [])

    const handleChange = async (e) => {
        setFilterProducts({
            ...filterProducts,
            [e.target.id]: e.target.checked,
        });

        if (filterProducts.length == 0) {
            setFilterProducts(filteredBrands);
        } else {
            const filteredProductsByBrands = await productService.filterProductsByBrands(filterProducts);
            setFilterProducts(filteredProductsByBrands);
        }
    }

    return (
                <div className="h-full flex-col justify-between">
                    <div className="hover:overflow-auto overflow-hidden">
                        <div className="mb-10">
                            <div className="text-sm text-gray-500">Overview</div>
                            <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                                <span className="text-gray-500">Overview</span>
                            </div>
                        </div>

                        <div className="mb-10">

                            <div className="text-sm text-gray-500">Marcas</div>

                            {
                                filteredBrands.map(brand => (
                                    <div key={brand.id} className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                                        <input id={brand.id} name={brand.name} type={"checkbox"} onClick={handleChange}/>
                                        &nbsp;&nbsp;
                                        <span className="text-gray-500">{brand.name}</span>
                                    </div>
                                ))
                            }

                        </div>

                    </div>

                    <div className="mt-10">
                        <div className="flex items-center hover:border-r-4 border-green-500 h-8 cursor-pointer">
                            <i className="animate-pulse h-5 w-5 rounded-sm bg-gray-300 mr-2"></i>
                            <span className="text-gray-500">Account Mgnt</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center cursor-pointer">
                            <i className="animate-pulse h-5 w-5 rounded-full bg-gray-300 mr-2"></i>
                            <span className="text-gray-500 truncate">Firstname Lastname</span>
                            <i className="animate-pulse h-5 w-1 bg-gray-300 mx-3"></i>
                        </div>
                    </div>
                </div>

    )


}
export default Index;


export async function getServerSideProps(context) {
    const brands = await findAll();
    return {
        props: {
            brands
        }
    }
}