import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons' 
import { useRouter } from 'next/router'


function BackToProductButton() {
  const router = useRouter() 

  return (
      <a
        onClick={() => router.back()}
          aria-label="back-to-products"
          className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
        justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm cursor-pointer">
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 mr-2 inline-flex" />
          Seguir comprando
      </a> 
  )
}

export default BackToProductButton
