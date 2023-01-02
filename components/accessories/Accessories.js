import Category from "./Category";

const Accessories = ({categories, setCategory}) => {
    return(
        <div className="flex-center w-auto rounded">
                    <div className="flex flex-wrap justify-evenly ">
                        {
                            categories
                            ?
                            categories.map((category, index) => (
                                <div onClick={() => setCategory(category.name)}>
                                    <Category category={category}/>
                                </div>
                            ))
                            :
                            <></>
                        } 
                    </div>
            </div>
    )
}

export default Accessories;