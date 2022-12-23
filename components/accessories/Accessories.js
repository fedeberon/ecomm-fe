import Category from "./Category";

const Accessories = ({categories}) => {
    return(
        <div className="flex-center w-auto rounded">
                    <div className="flex flex-wrap justify-evenly ">
                        {
                            categories
                            ?
                            categories.map((category, index) => (
                                    <Category category={category}/>
                            ))
                            :
                            <></>
                        } 
                    </div>
            </div>
    )
}

export default Accessories;