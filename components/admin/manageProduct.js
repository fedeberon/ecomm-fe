import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt, faEdit} from "@fortawesome/free-solid-svg-icons";
import UploadFile from "@/components/products/UploadFile";
import {useState} from "react";

const ManageProduct = () => {
    const [openUploadFile, setOpenUploadFile] = useState(false);

    const goToEdit = () => {
        window.location.href = '/products/update/' + id
    }


    return (
        <>
            <a
                aria-label="back-to-products"
                className="pt-3 pb-2 bg-red-600 text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex
                      justify-center items-baseline  hover:bg-red-400"
                onClick={() => setOpenUploadFile(true)}
            >
                Subir Imagenes
                <FontAwesomeIcon icon={faCloudUploadAlt} className="w-5 ml-2" />
            </a>

            <a
                aria-label="back-to-products"
                className="pt-3 pb-2 bg-red-600 text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex
                      justify-center items-baseline  hover:bg-red-400"
                onClick={goToEdit}
            >
                Modificar Datos
                <FontAwesomeIcon icon={faEdit} className="w-5 ml-2" />
            </a>

            <UploadFile
                isOpen={openUploadFile}
                setIsOpen={setOpenUploadFile}
                folder={id}
            />
        </>
    )
}
export default ManageProduct