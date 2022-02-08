
import { NotificationContainer } from "react-notifications";
import useForm from "../../hooks/useForm";


const NewProduct = () => {

    const initialForm={
        name: "",
        price: "",
        description: "",
        category : {
            id  :  ""
        },
        code : "",
        stock : "",
        points: ""
    }
    
    const validationsForm = (form) =>{
        let errors ={};
        let regexName =/^[A-Za-z]+$/;

        if (!form.name.trim()){
            errors.name = "El campo 'Nombre' es requerido";
        }

        if (!form.price.trim()){
            errors.price = "El campo 'Precio' es requerido";
        }

        if (!form.description.trim()){
            errors.description = "El campo 'Descripcion' es requerido";
        }
        if (!form.category.id.trim()){
            errors.category = "El campo 'Categoria' es requerido";
        }

        if (!form.code.trim()){
            errors.code = "El campo 'Codigo' es requerido";
        }

        if (!form.stock.trim()){
            errors.stock = "El campo 'Stock' es requerido";
        }

        if (!form.points.trim()){
            errors.points = "El campo 'Puntos' es requerido";
        }

        return errors
    };

    const { 
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,} = useForm(initialForm, validationsForm);


    return (
    <>
            <NotificationContainer/>
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
                                    {errors.name &&  <p className={`text-red-500 text-xs italic`}>{errors.name}</p>}
                            </div>
                            <div className="w-full">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="descripcion">
                                    Descripcion
                                </label>
                                <textarea
                                    autoComplete="off"
                                    className="resize-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="descripcion" placeholder="Descripci&oacute;n del producto" name="description" rows="3"
                                    value={form.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                    {errors.description &&  <p className={`text-red-500 text-xs italic`}>{errors.description}</p>}
                            </div>

                            <div className="w-full">
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="codigo">
                                    C&oacute;digo
                                </label>
                                <input
                                    autoComplete="off"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3    px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="codigo" type="text" placeholder="Cod. del producto"
                                    name="code"
                                    value={form.code}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                    {errors.code &&  <p className={`text-red-500 text-xs italic`}>{errors.code}</p>}
                            </div>

                            <div className="w-full">
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="category">
                                    Categoria
                                </label>
                                <select onChange={handleChange} name="category" onBlur={handleBlur} value={form.category.id} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3    px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category">
                                {
                                    categories.map(category => (
                                        <option value={category.id}>{category.name}</option>
                                    ))
                                }
                                    </select>
                                {errors.category &&  <p className={`text-red-500 text-xs italic`}>{errors.category}</p>}
                            </div>
                        </div>
                        <div>

                             <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="puntos">
                                Puntos de producto
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="puntos" type="number"
                                placeholder="Puntos del producto"
                                name="points"
                                value={form.points}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                            />
                            {errors.points &&  <p className={`text-red-500 text-xs italic`}>{errors.points}</p>}

                    </div>


                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Precio
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-2 pb-4 flex items-center pointer-events-none shadow-lg">
                                          <span className="text-center text-gray-500 sm:text-sm align-middle">
                                            $
                                          </span>
                                        </div>
                                        <input
                                               type="number"
                                               id="price"
                                               autoComplete="off"
                                               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 pl-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                               placeholder="0.00" name="price"
                                                value={form.price}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               required
                                               maxLength = "7"
                                               onKeyPress={(event) => {
                                                   if (!/[0-9]?[0-9]?(\.[0-9][0-9]?)?/.test(event.key)) {
                                                       event.preventDefault();
                                                   }
                                               }}
                                        />
                                    {errors.price &&  <p className={`text-red-500 text-xs italic`}>{errors.price}</p>}
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
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                {errors.stock &&  <p className={`text-red-500 text-xs italic`}>{errors.stock}</p>}
                            </div>
                        </div>

                        <button type="submit" 
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8`}
                                >
                            Guardar
                        </button>
                        <p className={`text-red-500 text-xs italic ${Object.keys(errors).length === 0 ? "invisible": "" }`}>Complete los campos.</p>
                    </form>
            </div>
     </>)
}

export default NewProduct;