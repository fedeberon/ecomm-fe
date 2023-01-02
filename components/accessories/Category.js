const Category = ({category, index}) => {
    return(
        <div key={index} className="p-5">
            <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 bg-palette-primary rounded-lg cursor-pointer ">
                <div className="flex justify-evenly w-full h-full py-2 px-40 shadow-md bg-white rounded-lg transform duration-500 ease-in-out hover:bg-palette-primary hover:text-white">
                    <div className="my-auto">
                        <p className="font-bold">{category.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;