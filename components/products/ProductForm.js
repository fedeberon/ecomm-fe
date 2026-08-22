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
      addToCart({ productTitle: title, productImage: mainImg, quantity, id, price, size: selectElement, sizeName: selectedOptionText })
      NotificationManager.info(title, 'Agregado al carrito', 2000, () => router.push('/cart'));
    }
  }

  async function delateProduct() {
    const result = await deleteProduct(id)
    setStatus(result.data.deleted)
    NotificationManager.error('No se mostrará en los resultados de búsqueda', 'Baja de producto', 5000);
  }

  async function activeProduct() {
    const result = await activateProduct(id)
    setStatus(result.data.deleted)
    NotificationManager.info('Se mostrará en los resultados de búsqueda', 'Producto activo', 5000);
  }

  const goToEdit = () => { window.location.href = '/products/update/' + id }
  const decreaseQuantity = () => setQuantity((value) => Math.max(1, Number(value) - 1));
  const increaseQuantity = () => setQuantity((value) => Math.min(maxQuantity, Number(value) + 1));

  return (
    <>
      <NotificationContainer />
      <div className="w-full">
        <div className="grid grid-cols-[150px_1fr] gap-3 items-end mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Cantidad</p>
            <div className="flex items-center h-10 rounded-lg border border-slate-200 bg-white overflow-hidden">
              <button type="button" onClick={decreaseQuantity} className="w-10 h-full text-slate-500 hover:bg-slate-50" aria-label="Restar cantidad">
                <FontAwesomeIcon icon={faMinus} className="w-2.5 mx-auto" />
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
                onChange={(e) => setQuantity(Math.max(1, Math.min(maxQuantity, Number(e.target.value) || 1)))}
                className="w-12 h-full border-0 border-l border-r border-slate-100 text-center text-sm font-bold text-slate-800 focus:ring-0"
              />
              <button type="button" onClick={increaseQuantity} className="w-10 h-full text-slate-500 hover:bg-slate-50" aria-label="Sumar cantidad">
                <FontAwesomeIcon icon={faPlus} className="w-2.5 mx-auto" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Talle</p>
            {sizes.length > 0 && !singleNoSize ? (
              <select name="size" id="size" className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 focus:border-palette-sdark focus:ring-palette-sdark" defaultValue={sizes[0]?.id}>
                {sizes.map((size) => <option key={size.id} value={size.id}>{size.name}</option>)}
              </select>
            ) : (
              <label id="size" data-size-id={sizes[0]?.id || 0} data-size-name="Sin talle" className="flex h-10 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">Sin talle</label>
            )}
          </div>
        </div>

        {status ? (
          <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-xs font-bold text-red-600">Producto inactivo</div>
        ) : (
          <button onClick={handleAddToCart} disabled={outOfStock} aria-label="add-to-cart" className={`w-full h-11 rounded-lg text-sm font-bold shadow-sm transition ${outOfStock ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-palette-sdark hover:bg-palette-dark text-white'}`}>
            {outOfStock ? 'Sin stock' : 'Agregar al carrito'}
          </button>
        )}

        <p className="mt-2 text-[11px] text-slate-400 text-center">Compra segura · Elegí cantidad y agregá al carrito.</p>

        {session?.user?.role?.includes("ADMIN") && (
          <div className="flex w-full justify-between h-10 mt-2 gap-2">
            {!status ? (
              <button onClick={delateProduct} className="bg-palette-primary text-white w-1/4 rounded-md text-xs flex justify-center items-center group"><FontAwesomeIcon icon={faTrash} className="w-3.5" /></button>
            ) : (
              <button onClick={activeProduct} className="bg-blue-500 text-white w-1/4 rounded-md text-xs flex justify-center items-center"><FontAwesomeIcon icon={faPlus} className="w-3.5" /></button>
            )}
            <button type="button" className="bg-palette-primary text-white w-1/4 rounded-md text-xs flex justify-center items-center" onClick={() => setOpenUploadFile(true)}><FontAwesomeIcon icon={faCloudUploadAlt} className="w-3.5" /></button>
            <button type="button" className="bg-palette-primary text-white w-1/4 rounded-md text-xs flex justify-center items-center" onClick={goToEdit}><FontAwesomeIcon icon={faEdit} className="w-3.5" /></button>
            <button type="button" className={`${promo ? 'bg-blue-300' : 'bg-palette-secondary'} text-white w-1/4 rounded-md text-xs flex justify-center items-center`} onClick={handlePromo}><FontAwesomeIcon icon={faTag} className="w-3.5" /></button>
            <UploadFile isOpen={openUploadFile} setIsOpen={setOpenUploadFile} folder={id} />
          </div>
        )}
      </div>
    </>
  )
}

export default ProductForm
