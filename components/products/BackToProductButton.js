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
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-xs font-bold text-slate-600 hover:border-palette-sdark hover:text-palette-sdark transition"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="w-3" />
      Seguir comprando
    </button>
  )
}

export default BackToProductButton
