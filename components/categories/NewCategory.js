const {useState} = require("react");
const { save } = require("../../services/categoriesService")
const {useRouter} = require("next/router");
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const NewCategory = () => {
    const router = useRouter()

    const [category, setCategory] = useState({
        name: ''
    });

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value,
        });
    }

    const submit =  (e) => {
        e.preventDefault();
        if(category.name.length <= 0){
            NotificationManager.info('No fue posible añadir la categoria, ingrese un nombre', 'Añadir categoria', 4000,  () => {
            });
        }
        else{
            save(category).then((result) => {
                if (result.status === 200) {
                    router.push('/category')
                }
            });
        }
    }

    return (
        <>
        <NotificationContainer/>
            <div className="flex justify-center">
                <form className="w-full max-w-lg" onSubmit={submit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-first-name">
                                Nombre
                            </label>
                            <input
                                autoComplete="off"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="name" type="text"
                                placeholder="Nombre del Producto"
                                name="name"
                                value={category.name}
                                onChange={handleChange}
                            />
                     </div>

                    <button type="submit"
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8`}>
                        Guardar
                    </button>
                </div>
            </form>
            </div>
        </>

    )
}

export default NewCategory;
