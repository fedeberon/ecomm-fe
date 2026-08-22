import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faEdit, faTrash, faTag, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { useAddToCartContext } from '@/context/Store'
import UploadFile from "@/components/products/UploadFile";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { activateProduct, deleteProduct, updateAsAPromotion } from 'services/productService';

function ProductForm({ productData, image }) {
  const [title] = useState(productData.name);
  const [mainImg] = useState(image);
  const [id] = useState(productData.id);
  const [price] = useState(productData.price);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAddToCartContext();
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const router = useRouter();
  const [session] = useSession();
  const [promo, setPromo] = useState(productData.promo);
  const [status, setStatus] = useState(productData.deleted)

  const sizes = productData.sizes || [];
  const singleNoSize = sizes.length === 1 && (sizes[0]?.name === 'S/T' || sizes[0]?.id === 0);
  const maxQuantity = Math.max(1, Number(productData.stock) || 1);
  const outOfStock = Number(productData.stock) <= 0;

  const handlePromo = async () => {
    const producToUpdate = { id, promo: !promo }
    const product = await updateAsAPromotion(producToUpdate);
    setPromo(product.data.promo)
  }

  async function handleAddToCart() {
    const element = document.getElementById('size');
    let selectElement = 0;
    let selectedOptionText = 'Sin talle'

    if (element?.tagName === "SELECT") {
      const selectedOption = element.options[element.selectedIndex];
      selectElement = selectedOption.value;
      selectedOptionText = selectedOption.text;
    } else if (element?.tagName === "LABEL") {
      selectedOptionText = element.dataset.sizeName || element.textContent;
      selectElement = element.dataset.sizeId || 0;
    }

    if (quantity && !outOfStock) {
      addToCart({
        productTitle: title,
        productImage: mainImg,
        quantity,
        id,
        price,
        size: selectElement,
        sizeName: selectedOptionText
      })
      NotificationManager.info(title, 'Agregado al carrito', 2000, () => {
        router.push('/cart')
      });
    }
  }

  async function delateProduct() {
    try {
      const result = await deleteProduct(id)
      setStatus(result.data.deleted)
      NotificationManager.error('No se mostrará en los resultados de búsqueda', 'Baja de producto', 5000);
    } catch (error) {
      throw new Error("Fallo en la función de borrar producto")
    }
  }

  async function activeProduct() {
    try {
      const result = await activateProduct(id)
      setStatus(result.data.deleted)
      NotificationManager.info('Se mostrará en los resultados de búsqueda', 'Producto activo', 5000);
    } catch (error) {
      throw new Error("Fallo en la función de activar producto")
    }
  }

  const goToEdit = () => {
    window.location.href = '/products/update/' + id
  }

  const decreaseQuantity = () => setQuantity((value) => Math.max(1, Number(value) - 1));
  const increaseQuantity = () => setQuantity((value) => Math.min(maxQuantity, Number(value) + 1));

  return (
    <>
      <NotificationContainer />

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Cantidad</p>
            <div className="inline-flex items-center h-12 rounded-xl border border-slate-200 bg-white overflow-hidden">
              <button type="button" onClick={decreaseQuantity} className="w-11 h-full text-slate-500 hover:bg-slate-50" aria-label="Restar cantidad">
                <FontAwesomeIcon icon={faMinus} className="w-3 mx-auto" />
              </button>
              <input
                type="number"
                inputMode="numeric"
                id="quantity"
                name="quantity"
                min="1"
                max={maxQuantity}
                step="1"
                value={quantity}
                onChange={(e) => {
                  const next = Math.max(1, Math.min(maxQuantity, Number(e.target.value) || 1));
                  setQuantity(next);
                }}
                className="w-14 h-full border-0 border-l border-r border-slate-100 text-center text-sm font-bold text-slate-800 focus:ring-0"
              />
              <button type="button" onClick={increaseQuantity} className="w-11 h-full text-slate-500 hover:bg-slate-50" aria-label="Sumar cantidad">
                <FontAwesomeIcon icon={faPlus} className="w-3 mx-auto" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Talle</p>
            {sizes.length > 0 && !singleNoSize ? (
              <select
                name="size"
                id="size"
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 focus:border-palette-sdark focus:ring-palette-sdark"
                defaultValue={sizes[0]?.id}
              >
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>{size.name}</option>
                ))}
              </select>
            ) : (
              <label
                id="size"
                data-size-id={sizes[0]?.id || 0}
                data-size-name="Sin talle"
                className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600"
              >
                Sin talle
              </label>
            )}
          </div>
        </div>

        {status ? (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-bold text-red-600">
            Producto inactivo
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            aria-label="add-to-cart"
            className={`w-full h-13 rounded-xl text-base font-bold shadow-sm transition ${outOfStock ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-palette-sdark hover:bg-palette-dark text-white'}`}
          >
            {outOfStock ? 'Sin stock' : 'Agregar al carrito'}
          </button>
        )}

        <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-sm text-slate-600">
          <p className="font-bold text-slate-800">Compra segura</p>
          <p className="mt-1 text-xs leading-relaxed">Seleccioná la cantidad y agregá el producto al carrito para continuar con tu compra.</p>
        </div>

        {session?.user?.role?.includes("ADMIN") && (
          <div className="flex w-full justify-between h-12 mt-2 gap-2">
            {!status ? (
              <button onClick={delateProduct} className="bg-palette-primary text-white w-1/4 mt-2 rounded-md font-primary font-semibold text-xs flex justify-center items-center group cursor-pointer">
                <span className="hidden group-hover:block">Eliminar</span>
                <FontAwesomeIcon icon={faTrash} className="w-4 m-auto group-hover:hidden" />
              </button>
            ) : (
              <button onClick={activeProduct} className="bg-blue-500 text-white w-1/4 mt-2 rounded-md font-primary font-semibold text-xs flex justify-center items-center group cursor-pointer">
                <span className="hidden group-hover:block">Activar</span>
                <FontAwesomeIcon icon={faPlus} className="w-4 m-auto group-hover:hidden" />
              </button>
            )}

            <button type="button" aria-label="upload-images" className="bg-palette-primary text-white w-1/4 mt-2 rounded-md text-xs flex justify-center items-center group" onClick={() => setOpenUploadFile(true)}>
              <span className="hidden group-hover:block">Imágenes</span>
              <FontAwesomeIcon icon={faCloudUploadAlt} className="w-4 m-auto group-hover:hidden" />
            </button>

            <button type="button" aria-label="edit-data" className="bg-palette-primary text-white w-1/4 mt-2 rounded-md text-xs flex justify-center items-center group" onClick={goToEdit}>
              <span className="hidden group-hover:block">Editar</span>
              <FontAwesomeIcon icon={faEdit} className="w-4 m-auto group-hover:hidden" />
            </button>

            <button type="button" className={`${promo ? 'bg-blue-300' : 'bg-palette-secondary'} text-white w-1/4 mt-2 rounded-md text-xs flex justify-center items-center group`} onClick={handlePromo}>
              <span className="hidden group-hover:block">{promo ? 'Quitar promo' : 'Promo'}</span>
              <FontAwesomeIcon icon={faTag} className="w-4 m-auto group-hover:hidden" />
            </button>

            <UploadFile isOpen={openUploadFile} setIsOpen={setOpenUploadFile} folder={id} />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductForm
