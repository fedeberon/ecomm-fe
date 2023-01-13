import ProductCard from '@/components/products/ProductCard'
import {useEffect, useState} from "react";
import {getProductsByType} from "../../services/productService"

function ProductByCategoriesListings({ products, brands, categories, category}) {

    const [isLoading, setIsLoading] = useState(false);
    const [productsToShow, setProductsToShow] = useState();

    let handleScroll = async (e) => {
        if(window.innerHeight + e.target.documentElement.scrollTop + 1  > e.target.documentElement.scrollHeight && !isLoading) {
          if(products.last===true){
              return;
          }
          setIsLoading(false)
      }
    }

    useEffect( ()  => {
        window.addEventListener('scroll', handleScroll);

        return(() => { window.removeEventListener('scroll', handleScroll) });
    }, [products, handleScroll])

    useEffect(async()=> {
      if(category){
        let product = await getProductsByType(category)
        setProductsToShow(product)
      }
    }, [category])
   
  // Get the button
  const backToTopButton = () =>{
  if (typeof window !== 'undefined') {
    
    const mybutton = document.getElementById("btn-back-to-top");
    mybutton.addEventListener("click", backToTop);
    window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
            mybutton.style.display = "block";
        }
    // When the user clicks on the button, scroll to the top of the document
    // When the user scrolls down 20px from the top of the document, show the button
      
      function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
      
    } 
}
   return ( 
          <div className='w-full'>


              <div className="mx-auto mt-3 w-11/12">
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-4 ">
                      {
                          productsToShow?.length >= 1
                          ?
                          productsToShow.map((product, index) => (
                              <ProductCard key={index} product={product} />
                          ))
                          :
                          <div className=" ">No hay productos disponibles en {category}</div>
                      }
          </div>
          <button type="button" data-mdb-ripple="true" onMouseDown={backToTopButton} data-mdb-ripple-color="light" className="z-0 -mx-9 md:-mx-7 shadow-lg invisible md:visible ease-out duration-500 sticky p-2 bg-palette-secondary animate-bounce text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-palette-sdark hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bottom-5 right-2" id="btn-back-to-top">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
          </button>
                  </div>

              {
                isLoading 
                ?
                <div className='flex items-center justify-center py-6'>
                            <div className='w-16 h-16 border-b-2 border-palette-secondary rounded-full animate-spin'></div>
                        </div> 
                        : 
                        <></>
                      }
              

              </div>
  )
}

export default ProductByCategoriesListings;
