import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/default.jpeg'
import { useSession } from "next-auth/client";
import * as productService from 'services/productService'

function ProductImage({ images = [], id }) {
  const defaultImage = { url: "default.jpeg", link: logo, main: false };
  const safeImages = images.length ? images : [defaultImage];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [delImg, setDelImg] = useState();
  const [session] = useSession();
  const [deletedModal, setDeletedModal] = useState(false);
  const selectedImage = safeImages[selectedIndex] || safeImages[0];

  const previousImage = () => setSelectedIndex((index) => (index - 1 + safeImages.length) % safeImages.length);
  const nextImage = () => setSelectedIndex((index) => (index + 1) % safeImages.length);

  function deleteProduct(img) { setDelImg(img); setDeletedModal(true); }
  async function delImage() { await productService.deletedImagen(id, delImg.url); window.location.reload(); }

  return (
    <div className="w-full max-w-[430px] mx-auto">
      <div className="relative overflow-hidden rounded-[18px] bg-white border border-slate-100 h-[300px] sm:h-[330px] lg:h-[350px] flex items-center justify-center">
        <img src={selectedImage?.link?.src || selectedImage?.link} alt={selectedImage?.url || 'Imagen del producto'} className="w-full h-full object-contain p-3 sm:p-4 transition duration-300" />
        {safeImages.length > 1 && <>
          <button type="button" onClick={previousImage} aria-label="Imagen anterior" className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/95 border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:text-palette-sdark"><FontAwesomeIcon icon={faArrowLeft} className="w-3" /></button>
          <button type="button" onClick={nextImage} aria-label="Imagen siguiente" className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/95 border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:text-palette-sdark"><FontAwesomeIcon icon={faArrowRight} className="w-3" /></button>
        </>}
      </div>

      {safeImages.length > 1 && <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {safeImages.map((imgItem, index) => <div key={`${imgItem.url}-${index}`} className="relative flex-shrink-0">
          <button type="button" onClick={() => setSelectedIndex(index)} className={`w-12 h-12 rounded-lg bg-white border-2 overflow-hidden transition ${selectedIndex === index ? 'border-palette-sdark shadow-sm' : 'border-slate-100 hover:border-slate-200'}`}>
            <img src={imgItem?.link?.src || imgItem?.link} alt={imgItem.url || `Imagen ${index + 1}`} className="w-full h-full object-contain p-1" />
          </button>
          {session?.user?.role?.includes("ADMIN") && images.length > 0 && <button type="button" className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow" onClick={() => deleteProduct(imgItem)} aria-label="Eliminar imagen"><FontAwesomeIcon icon={faTimes} className="w-2" /></button>}
        </div>)}
      </div>}
      {safeImages.length > 1 && <p className="mt-1 text-[10px] text-slate-400">{selectedIndex + 1} de {safeImages.length} imágenes</p>}

      {deletedModal && delImg && <div className="fixed z-[70] inset-0 flex items-center justify-center p-4">
        <button className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDeletedModal(false)} aria-label="Cerrar" />
        <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
          <h3 className="text-lg font-bold text-slate-900">¿Eliminar esta imagen?</h3><p className="mt-1 text-sm text-slate-500">{delImg.url}</p>
          <img src={delImg.link} alt={delImg.url} className="mt-4 w-full max-h-64 object-contain rounded-2xl bg-slate-50" />
          <div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setDeletedModal(false)} className="h-10 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600">Cancelar</button><button type="button" onClick={delImage} className="h-10 px-4 rounded-xl bg-red-600 text-white text-sm font-bold">Eliminar</button></div>
        </div>
      </div>}
    </div>
  )
}

export default ProductImage
