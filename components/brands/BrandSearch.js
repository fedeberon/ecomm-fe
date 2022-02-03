const BrandSearch = ({brands}) => {

    return (
 
           <>
                <b> Marcas </b>
                {
                    brands
                    ?
                    brands.map((brand, index) => (
                    <li key={index}>{brand.name}</li>
                    ))
                    :
                    <></>
                }
                    
            </>
    )


}

export default BrandSearch