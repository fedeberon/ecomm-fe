const {useState} = require("react");
const {save} = require("../../services/sizeService");
const {useRouter} = require("next/router");
const NewSize = () => {
    const router = useRouter()

    const [size, setSize] = useState({
        name: ''
    });

    const handleChange = (e) => {
        setSize({
            ...size,
            [e.target.name]: e.target.value,
        });
    }

    const submit =  (e) => {
        e.preventDefault();
        save(size).then((result) => {
            if (result.status === 202) {
                router.push('/size')
            }
        });
    }

    return (
        <>
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
                                placeholder="Nombre del Talle"
                                name="name"
                                value={size.name}
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

export default NewSize;
