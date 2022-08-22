import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faEdit} from '@fortawesome/free-solid-svg-icons'
import { useCartContext, useAddToCartContext } from '@/context/Store'
import UploadFile from "@/components/products/UploadFile";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {useSession} from "next-auth/client";
import {useRouter} from "next/router";
import { updateAsAPromotion } from 'services/productService';


function ProductForm({ title, mainImg, id, images, price, isPromo }) {
  const [quantity, setQuantity] = useState(1);
  const isLoading = useCartContext()[2];
  const addToCart = useAddToCartContext();
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const [promo, setPromo] = useState(isPromo);
  
   
 
  const handlePromo = async () => {
    let producToUpdate = {
      id: id,
      promo: !promo 
    }
    let product = await updateAsAPromotion(producToUpdate);
    setPromo(product.data.promo)
  }

  
  const atcBtnStyle = isLoading ?
    `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                      justify-center items-baseline  hover:bg-palette-dark opacity-25 cursor-none`
    :
    `pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
                      justify-center items-baseline  hover:bg-palette-dark`



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
            />
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
              <>
                <a
                    aria-label="upload-images"
                    className="pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex
                      justify-center items-baseline  hover:bg-palette-light cursor-pointer"
                    onClick={() => setOpenUploadFile(true)}
                >
                  Subir Imagenes
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="w-5 ml-2" />
                </a>

                <a
                    aria-label="edit-data"
                    className="pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex
                      justify-center items-baseline  hover:bg-palette-light cursor-pointer"
                    onClick={goToEdit}>
                  Modificar Datos
                  <FontAwesomeIcon icon={faEdit} className="w-5 ml-2" />
                </a>

                {

                    promo
                    ?
                      <imput type='checkbox'
                      className="pt-3 pb-2 bg-blue-600 text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex
                        justify-center items-baseline  hover:bg-blue-400 cursor-pointer"
                        onClick={handlePromo} >
                        Promocion
                      </input>

                    :
                      <imput type='checkbox'
                      className="pt-3 pb-2 bg-red-600 text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex
                        justify-center items-baseline  hover:bg-red-400 cursor-pointer"
                        onClick={handlePromo} >
                        Sin Promocion
                      </input>
                }

                

                <UploadFile
                    isOpen={openUploadFile}
                    setIsOpen={setOpenUploadFile}
                    folder={id}

                />
              </>
              :
              <></>
        }


      </div>
    </>

  )
}

export default ProductForm
