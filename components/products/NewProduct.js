
import { NotificationContainer } from "react-notifications";
import useForm from "../../hooks/useForm";
import { useState, useMemo } from "react";


const NewProduct = ({ categories, brands, sizes }) => {
    const [ sizeToCheck, setsizeToCheck ] = useState([]);
    const initialForm = useMemo(() => ({
        name: "",
        price: "",
        description: "",
        category: {
            id: ""
        },
        brand: {
            id: ""
        },
        sizes: [{
            id: ""
        }],
        code: "",
        stock: "",
        points: "",
        promo: false,
    })
);

    const validationsForm = (form) => {
        let errors = {};

        if (!form.name.trim()) {
            errors.name = "El campo 'Nombre' es requerido";
        }

        if (!form.price.trim()) {
            errors.price = "El campo 'Precio' es requerido";
        }

        if (!form.description.trim()) {
            errors.description = "El campo 'Descripcion' es requerido";
        }
        if (form.category.id == "") {
            errors.category = "El campo 'Categoria' es requerido";
        }

        if (form.brand.id == "") {
            errors.brand = "El campo 'Marcas' es requerido";
        }

        if (!form.sizes[0] || form.sizes[0].id === 0){
            errors.sizes = "El campo 'Sizes' es requerido";
        }

        if (!form.code.trim()) {
            errors.code = "El campo 'Codigo' es requerido";
        }

        if (!form.stock.trim()) {
            errors.stock = "El campo 'Stock' es requerido";
        }

        if (!form.points.trim()) {
            errors.points = "El campo 'Puntos' es requerido";
        }
        return errors;
    };

    const {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit, } = useForm(initialForm, validationsForm);

    const handleChangeSize =(e)=>{
        if(e.target.checked) {
            const final = [
                ...sizeToCheck,
                {
                    "id": e.target.value
                }
            ];
            setsizeToCheck(final);
            form.sizes = final;
        } else {
            const sizes = sizeToCheck.filter((size) => size.id !== e.target.value);
            setsizeToCheck(sizes);
            form.sizes = sizes;
        }
    }
    

    return (
            <>
            <NotificationContainer />
            <div className="flex justify-center">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="name">
                                Nombre
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="name" type="text"
                                placeholder="Nombre del Producto"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.name && <p className={`text-red-500 text-xs italic`}>{errors.name}</p>}
                        </div>
                        <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="descripcion">
                                Descripcion
                            </label>
                            <textarea
                                autoComplete="off"
                                className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="descripcion" placeholder="Descripci&oacute;n del producto" name="description" rows="3"
                                value={form.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.description && <p className={`text-red-500 text-xs italic`}>{errors.description}</p>}
                        </div>

                        <div className="w-full">
                            <label className="block uppercase block tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="codigo">
                                C&oacute;digo
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="codigo" type="text" placeholder="Cod. del producto"
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.code && <p className={`text-red-500 text-xs italic`}>{errors.code}</p>}
                        </div>

                        <div className="w-full">
                            <label className="block uppercase block tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="category">
                                Categoria
                            </label>
                            <select value={form.category.id} onChange={handleChange} name="category" onBlur={handleBlur} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category">
                                    <option disabled={true} value="">Seleccionar</option>
                                {
                                    categories.map(category => (
                                        <option value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                            {errors.category && <p className={`text-red-500 text-xs italic`}>{errors.category}</p>}
                        </div>


                        <div className="w-full">
                            <label className="block uppercase block tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="brand">
                                Marcas
                            </label>
                            <select value={form.brand.id} onChange={handleChange} name="brand" onBlur={handleBlur} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="brand">
                                <option disabled={true} value="">Seleccionar</option>
                                {
                                    brands.map(brand => (
                                        <option value={brand.id}>{brand.name}</option>
                                    ))
                                }
                            </select>
                            {errors.brand && <p className={`text-red-500 text-xs italic`}>{errors.brand}</p>}
                        </div>

                        <div className="w-full">
                            <label className="block uppercase block tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="size">
                                Talles
                            </label>
                            <div className="flex grid grid-cols-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight">
                                {
                                    sizes.map( size  => (
                                        <div className="flex">
                                            <input type={"checkbox"} onClick={handleChangeSize} onBlur={handleBlur} className="form-checkbox rounded text-red-500" value={size.id}></input>
                                            <div className="mx-4">{size.name}</div>
                                        </div>
                                    ))
                                }
                                {errors.sizes &&  <p className={`text-red-500 text-xs italic`}>{errors.sizes}</p>} 
                            </div>
                        </div>   

                        <div className="w-full">
                            <label className="block uppercase block tracking-wide text-gray-700 text-xs font-bold mb-3"
                                htmlFor="puntos">
                                Puntos de producto
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="puntos" type="number"
                                placeholder="Puntos del producto"
                                name="points"
                                value={form.points}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.points && <p className={`text-red-500 text-xs italic`}>{errors.points}</p>}
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="block uppercase w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Precio
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div>
                                            <span className="text-center flex p-3 absolute text-gray-500 sm:text-sm align-middle">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                id="price"
                                                autoComplete="off"
                                                className="appearance-none block w-90 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 pl-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                placeholder="0.00" name="price"
                                                value={form.price}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                maxLength="7"
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]?[0-9]?(\.[0-9][0-9]?)?/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                            />
                                        </div>
                                        {errors.price && <p className={`text-red-500 text-xs italic`}>{errors.price}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="Stock">
                                    Stocks
                                </label>
                                <input
                                    id="Stock" type="number"
                                    placeholder="Stocks"
                                    name="stock"
                                    autoComplete="off"
                                    className="appearance-none block w-90 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={form.stock}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                                {errors.stock && <p className={`text-red-500 text-xs italic`}>{errors.stock}</p>}
                            </div>
                        </div>
                    </div>

                    <button type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8`}
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </>)
}

export default NewProduct;