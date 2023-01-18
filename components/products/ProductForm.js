import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faEdit, faTrash, faTag} from '@fortawesome/free-solid-svg-icons'
import { useCartContext, useAddToCartContext } from '@/context/Store'
import UploadFile from "@/components/products/UploadFile";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {useSession} from "next-auth/client";
import {useRouter} from "next/router";
import { deleteProduct, updateAsAPromotion } from 'services/productService';


function ProductForm({ productData, image}) {
  const [title, setTitle] = useState(productData.name);
  const [mainImg, setMainImg] = useState(image);
  const [id, setID] = useState(productData.id);
  const [price, setPrice] = useState(productData.price);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCartContext();
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const [promo, setPromo] = useState(productData.promo);
  
   
 
  const handlePromo = async () => {
    let producToUpdate = {
      id: id,
      promo: !promo 
    }
    let product = await updateAsAPromotion(producToUpdate);
    setPromo(product.data.promo)
  }

  async function handleAddToCart() {
    if (quantity != '') {
      addToCart({
        productTitle: title,
        productImage: mainImg,
        quantity: quantity,
        id: id,
        price: price
      })
      NotificationManager.info('Se agrego ' + title + '.', 'Carro de compras' , 1000 ,  () => {
        router.push('/cart')
      });
    }
  }

  async function delateProduct () {
    try{
      
      await deleteProduct(id)

      NotificationManager.info('Producto borrado', () => {
        router.push('/')
      });

      window.location.href = '/'
    }
    catch(error){
      throw new Error("Fallo en la funcion de borrar producto")
    }
  }

  const goToEdit = () => {
    window.location.href = '/products/update/' + id
  }

  function updateQuantity(e) {
    if (e === '') {
      setQuantity('')
    } else {
      setQuantity(Math.floor(e))
    }
  }

  return (
    <>
      <NotificationContainer/>
      <div className="w-full">
        <div className="flex justify-start space-x-2">

          <div className="flex flex-col items-start space-y-1 flex-grow-0">
            <label className="text-gray-500 text-base">Qty.</label>
            <input
                type="number"
                inputMode="numeric"
                id="quantity"
                name="quantity"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => updateQuantity(e.target.value)}
                className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
            ></input>
          </div>

          <div className="flex flex-col items-start space-y-1 flex-grow-0">
            <label className="text-gray-500 text-base">&nbsp;</label>
            <a
                onClick={handleAddToCart}
                aria-label="add-to-cart"
                className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
                justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-md cursor-pointer  pl-4 pr-4">
              Agregar al carrito
            </a>
          </div>

        </div>
        {
                session?.user?.role?.includes("ADMIN")
          
            ?
              <div className='display flex w-full justify-between h-12'>
                <button onClick={delateProduct} className="bg-palette-primary text-white w-1/4 mt-2 mr-3  rounded-sm font-primary font-semibold text-xs flex
                    justify-center items-baseline hover:scale-125 transform transition duration-500 group hover:bg-palette-light cursor-pointer">
                      <p className="hidden m-1 group-hover:block">Eliminar Producto</p>
                      <FontAwesomeIcon icon={faTrash} className="w-5 m-auto group-hover:hidden"/>
                </button>
                <div
                    aria-label="upload-images"
                    className="bg-palette-primary text-white w-1/4 mt-2 mr-3 h-auto rounded-sm font-primary font-semibold text-xs flex
                    justify-center items-baseline hover:scale-125 transform transition duration-500 group hover:bg-palette-light cursor-pointer"
                    onClick={() => setOpenUploadFile(true)}
                >
                  <p className="hidden m-1 group-hover:block">Subir Imagenes</p>
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="w-5 m-auto group-hover:hidden" />
                </div>

                <div
                    aria-label="edit-data"
                    className="bg-palette-primary text-white w-1/4 mt-2 mr-3 rounded-sm font-primary font-semibold text-xs flex
                    justify-center items-baseline hover:scale-125 transform transition duration-500 group hover:bg-palette-light cursor-pointer"
                    onClick={goToEdit}>
                  <p className="hidden m-1  group-hover:block">Editar Producto</p>
                  <FontAwesomeIcon icon={faEdit} className="w-5 m-auto group-hover:hidden" />
                </div>

                {

                    promo
                    ?
                      <imput type='checkbox'
                      className="bg-blue-400 text-white w-1/4 mt-2 mr-3 rounded-sm font-primary font-semibold text-xs flex
                      justify-center items-baseline hover:scale-125 transform transition duration-500 group hover:bg-blue-400 cursor-pointer"
                        onClick={handlePromo} >
                          <p className="hidden m-1 group-hover:block">Eliminar Promocion</p>
                        <FontAwesomeIcon icon={faTag} className="w-5 m-auto group-hover:hidden" />
                      </imput>

                    :
                      <imput type='checkbox'
                      className="bg-red-600 text-white w-1/4 mt-2 rounded-sm font-primary font-semibold text-xs flex
                        justify-center items-baseline hover:scale-125 transform transition duration-500 group hover:bg-red-400 cursor-pointer"
                        onClick={handlePromo} >
                          <p className="hidden m-1 group-hover:block">Añadir Promocion</p>
                        <FontAwesomeIcon icon={faTag} className="w-5 m-auto group-hover:hidden" />
                      </imput>
                }

                

                <UploadFile
                    isOpen={openUploadFile}
                    setIsOpen={setOpenUploadFile}
                    folder={id}

                />
              </div>
              :
              <></>
        }


      </div>
    </>

  )
}

export default ProductForm
