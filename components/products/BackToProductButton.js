import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

function BackToProductButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="back-to-products"
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-palette-sdark hover:text-palette-sdark focus:outline-none focus:ring-4 focus:ring-cyan-100"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="w-3" />
      Seguir comprando
    </button>
  )
}

export default BackToProductButton
