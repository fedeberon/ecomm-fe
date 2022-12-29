const Category = ({category, index}) => {
    return(
        <div key={index} className="p-3 w-1/4 ">
            <div className="pl-1 my-4 w-80 h-24 lg:w-3/4 justify-self-center bg-palette-primary rounded-lg shadow-md cursor-pointer ">
                <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between hover:bg-palette-primary">
                    <div className="my-auto">
                        <p className="font-bold">{category.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;