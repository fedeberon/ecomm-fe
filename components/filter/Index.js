import {findAll} from "../../services/brandService";
import {useEffect, useState} from "react";
import * as productService from "../../services/productService";

const Index = ({products}) => {

    const [filteredBrands, setFilteredBrands] = useState([]);
    const [filterProducts, setFilterProducts] = useState();


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
    }

    useEffect(async () => {
        debugger;
        if (filterProducts != undefined) {
            const filteredProductsByBrands = await productService.filterProductsByBrands(filterProducts);
            products(filteredProductsByBrands);
        }
    }, [filterProducts])

    return (
                <div className="h-full flex-col justify-between">
                    <div className="hover:overflow-auto overflow-hidden">
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