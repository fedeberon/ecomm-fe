import { useState, useRef } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight , faTimes} from '@fortawesome/free-solid-svg-icons'
import logo  from '../../images/default.jpeg'
import {useSession} from "next-auth/react";
import * as productService from 'services/productService'

function ProductImage({ images , id}) {
    const defaultImage =
        {
            "url": "Image 2021-08-10 at 11.20.24 (1).jpeg",
            "link": logo,
            "main": false
        };

    const image = images && images.length != 0 ? images[0].link : defaultImage.link
    const [mainImg, setMainImg] = useState(image);
    const [delImg, setDelImg] = useState()
    const { data: session } = useSession()
    const ref = useRef();

    const [deletedModal,setDeletedModal] = useState(false)
  function scroll(scrollOffset) {
    ref.current.scrollLeft += scrollOffset
  }

  function deleteProduct(img){
    if(deletedModal==false){
      setDeletedModal(!deletedModal)
    }
    setDelImg(img)
  }

  function delImage(){
   productService.deletedImagen(id, delImg.url)
   window.location.reload()
  }

  return (

    <div className="w-96 p-2 max-w-md rounded-lg border border-palette-lighter">
      <div className="container relative  h-96">
        <Image
          src={mainImg}
          layout="fill"
          className="w-96 h-96 transform transform:rounded-lg duration-500 ease-in-out hover:scale-105"
        />
      </div>
      <div className="relative flex border-t border-palette-lighter">

          {
              images.length != 0
                ?
                  <button
                      aria-label="left-scroll"
                      className="h-32 bg-palette-lighter hover:bg-pink-200 relative left-0 z-10 opacity-75"
                      onClick={() => scroll(-300)}
                  >
                      <FontAwesomeIcon icon={faArrowLeft} className="w-3 mx-1 text-palette-primary" />
                  </button>
                  : <></>
          }

        <div
          ref={ref}
          style={{ scrollBehavior: "smooth" }}
          className="flex space-x-1 w-full overflow-auto border-t border-palette-lighter"
        >
          {
            images.map((imgItem) => (
              <div className="relative w-40 h-32 flex-shrink-0 rounded-sm ">
                  <Image
                      src={imgItem.link}
                      layout="fill"
                      className=""
                      onClick={() => setMainImg(imgItem.link)}
                  />
                {
                  session?.user?.role?.includes("ADMIN")
                  ?
                  <button className='absolute left-0' onClick={() => deleteProduct(imgItem)}><FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-white bg-red-500 rounded-full p-1" /></button>
                  :
                  <></>
                }
              </div>
            ))
          }
        </div>

          {
              images.length != 0
                  ?
                <button
                  aria-label="right-scroll"
                  className="h-32 bg-palette-lighter hover:bg-pink-200  absolute right-0 z-10 opacity-75"
                  onClick={() => scroll(300)}
                >
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 mx-1 text-palette-primary" />
                </button>
                  :
                  <></>
          }
      </div>
      {
        deletedModal== true
        ?
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
                             aria-modal="true">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                     aria-hidden="true"></div>

                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                      aria-hidden="true">&#8203;</span>

                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                    Esta seguro de querer Borrar esta imagen?
                                                </h3>
                                                <h2 className='text-md leading-6 font-medium text-gray-900'>Archivo: {delImg.url}</h2>
                                                <div className="flex">
                                                    <img className='m-auto w-80' src={delImg.link}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="button" onClick={() => delImage(delImg.url)}
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                            Eliminar
                                        </button>
                                        <button type="button" onClick={() => setDeletedModal(false)}
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
        :
        <></>
      }
    </div>
  )
}

export default ProductImage
