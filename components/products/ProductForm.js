import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart, faCloudUploadAlt, faArrowLeft, faEdit} from '@fortawesome/free-solid-svg-icons'
import { useCartContext, useAddToCartContext } from '@/context/Store'
import UploadFile from "@/components/products/UploadFile";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function ProductForm({ title, mainImg, id, images, price }) {
  const [quantity, setQuantity] = useState(1)
  const isLoading = useCartContext()[2]
  const addToCart = useAddToCartContext()
  const [openUploadFile, setOpenUploadFile] = useState(false);

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
      NotificationManager.info('Se agrego ' + title + '.', 'Carro de compras' , 2000 ,  () => {
        window.location.href = '/cart';
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
        <div className="flex justify-start space-x-2 w-full">
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
          <div className="flex flex-col items-start space-y-1 flex-grow">
            <label className="text-gray-500 text-base">Size</label>
            <select
                id="size-selector"
                name="size-selector"
                value={id}
                className="form-select border border-gray-300 rounded-sm w-full text-gray-900 focus:border-palette-light focus:ring-palette-light"
            >
              {
                images.map(item => (
                    <option
                        id={item.link}
                        key={item.link}
                        value={item.link}
                    >
                      {item.url}
                    </option>
                ))
              }
            </select>
          </div>
        </div>
        <button
            className={atcBtnStyle}
            aria-label="cart-button"
            onClick={handleAddToCart}
        >
          Agregar al carrito
          <FontAwesomeIcon icon={faShoppingCart} className="w-5 ml-2" />
        </button>

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

      </div>
    </>

  )
}

export default ProductForm
