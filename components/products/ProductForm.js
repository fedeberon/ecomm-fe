import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloudUploadAlt, faEdit, faTrash, faTag, faInfo} from '@fortawesome/free-solid-svg-icons'
import { useCartContext, useAddToCartContext } from '@/context/Store'
import UploadFile from "@/components/products/UploadFile";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {activateProduct, deleteProduct, updateAsAPromotion} from 'services/productService';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProductCard from "@/components/products/ProductCard";


function ProductForm({ productData, image}) {
  const [title, setTitle] = useState(productData.name);
  const [mainImg, setMainImg] = useState(image);
  const [id, setID] = useState(productData.id);
  const [price, setPrice] = useState(productData.price);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCartContext();
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const router = useRouter();
  const { data: session } = useSession()
  const [promo, setPromo] = useState(productData.promo);
  const [status, setStatus] = useState(productData.deleted)
  
   
 
  const handlePromo = async () => {
    let producToUpdate = {
      id: id,
      promo: !promo 
    }
    let product = await updateAsAPromotion(producToUpdate);
    setPromo(product.data.promo)
  }

  async function handleAddToCart() {
    const element = document.getElementById('size');
    let selectElement = 0;
    let selectedOptionText = 'Talle Unico'
    if (element.tagName === "SELECT") {
      const selectedOption = element.options[element.selectedIndex];
      selectElement = selectedOption.value;
      selectedOptionText = selectedOption.text;
    } else if (element.tagName === "LABEL") {
      selectedOptionText = element.textContent;
      selectElement = 0
    } else {
      console.log("Element is not a select or label");
    }

    if (quantity != '') {
      addToCart({
        productTitle: title,
        productImage: mainImg,
        quantity: quantity,
        id: id,
        price: price,
        size: selectElement,
        sizeName: selectedOptionText

      })
      NotificationManager.info(title, 'Agrado al carro de compras' , 2000 ,  () => {
        router.push('/cart')
      });
    }
  }

  async function delateProduct() {
    try {

      let result = await deleteProduct(id)

      setStatus(result.data.deleted)

      NotificationManager.error('No se mostrara en los resultados de busqueda', 'Baja de producto' , 5000);
    }
    catch(error){
      throw new Error("Fallo en la funcion de borrar producto")
    }
  }

  async function activeProduct() {
    try {

      let result = await activateProduct(id)

      setStatus(result.data.deleted)

      NotificationManager.info('Se mostrara en los resultados de busqueda', 'Producto Activo' , 5000);
    }
    catch(error){
      throw new Error("Fallo en la funcion de activar producto")
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

        <div className="w-full">

          <div className="flex flex-col space-y-2">
            <div className="flex">
              <div className="flex-col items-start space-y-1 mr-2">
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
                />
              </div>
              <div className="flex-col items-start space-y-1">

                  {productData.sizes.length > 0 ? (
                      <>
                      <select
                          name="category"
                          className="appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-400"
                          id="size"
                      >
                        <option disabled={true} value="-1">
                          Seleccionar
                        </option>
                        {
                          productData.sizes.map((provider) => (
                            <option key={provider.id} name={provider.name} value={provider.id}>
                              {provider.name}
                            </option>
                          ))
                        }
                      </select>
                      </>
                  ) : (
                      <label id='size' className="block text-gray-700 text-sm font-bold mb-2 mt-3">Talle Único</label>
                  )}
              </div>
            </div>


            {
                status == true
                    ?
                      <div className="bg-red-500 text-white p-4 rounded-lg">
                        Producto inactivo
                      </div>
                    :
                      <div className="flex flex-col items-start space-y-1">
                        <button
                            onClick={handleAddToCart}
                            aria-label="add-to-cart"
                            className="border border-palette-primary bg-purple-500 hover:bg-purple-600 text-lg text-white font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full rounded-md cursor-pointer  pl-4 pr-4"
                        >
                          Agregar al carrito
                        </button>
                      </div>
            }


          </div>

        </div>


        {
                session?.token?.token?.token?.token?.user?.role =='ADMIN'
          
            ?
              <div className='display flex w-full justify-between h-12'>

                {

                status == false
                    ?
                      <button onClick={delateProduct} className="bg-palette-primary text-white w-1/4 mt-2 mr-3  rounded-md font-primary font-semibold text-xs flex
                          justify-center items-baselinetransform transition duration-500 group cursor-pointer">
                            <p className="hidden m-1 group-hover:block">Eliminar Producto</p>
                            <FontAwesomeIcon icon={faTrash} className="w-5 m-auto group-hover:hidden"/>
                      </button>
                    :
                   <>
                     <button onClick={activeProduct} className="bg-blue-500 text-white w-1/4 mt-2 mr-3 rounded-md font-primary font-semibold text-xs flex justify-center items-baseline transform transition duration-500 group cursor-pointer">
                       <p className="hidden m-1 group-hover:block">Activar Producto</p>
                       <FontAwesomeIcon icon={faPlus} className="w-5 m-auto group-hover:hidden"/>
                     </button>
                   </>
                }
                <div
                    aria-label="upload-images"
                    className="bg-palette-primary text-white w-1/4 mt-2 mr-3 h-auto  font-primary font-semibold text-xs flex
                   justify-center items-baseline group rounded-md cursor-pointer"
                    onClick={() => setOpenUploadFile(true)}
                >
                  <p className="hidden m-1 group-hover:block text-center">Subir Imagenes</p>
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="w-5 m-auto group-hover:hidden" />
                </div>

                <div
                    aria-label="edit-data"
                    className="bg-palette-primary text-white text-center w-1/4 mt-2 mr-3 rounded-md font-primary font-semibold text-xs flex
                    justify-center items-baseline group  cursor-pointer"
                    onClick={goToEdit}>
                  <p className="hidden m-1  group-hover:block">Editar Producto</p>
                  <FontAwesomeIcon icon={faEdit} className="w-5 m-auto group-hover:hidden" />
                </div>

                {

                    promo
                    ?
                      <imput type='checkbox'
                      className="bg-blue-300 text-white text-center w-1/4 mt-2 rounded-md font-primary font-semibold text-xs flex
                        justify-center items-baseline hover:scale-125 transform transition duration-500 group cursor-pointer"
                        onClick={handlePromo} >
                          <p className="hidden m-1 group-hover:block">Eliminar Promocion</p>
                        <FontAwesomeIcon icon={faTag} className="w-5 m-auto group-hover:hidden" />
                      </imput>

                    :
                      <imput type='checkbox'
                      className="bg-palette-secondary text-white text-center w-1/4 mt-2 rounded-md font-primary font-semibold text-xs flex
                        justify-center items-baseline hover:scale-125 transform transition duration-500 group cursor-pointer"
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
