import React, { useEffect, useRef, useState } from 'react';

const largeImages = ['/images/panaleria.png','/images/lactancia.png','/images/CarrouselAccesorios.png']  
const responsiveImages = ['/images/PanaleriaResponsive.png','/images/LactanciaResponsive.png','/images/AccesoriosResponsive.png']  

function Carousel() {    
    const containerRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [images,setImages]=useState([])

    useEffect(()=>{
        if(typeof screen !== 'undefined'){
            if (screen.width >= 640) 
            {setImages(largeImages)} 
        else{
            setImages(responsiveImages)}
        }
    })

    useEffect(() => {
        fixPosition();
    }, []);

    const fixPosition = () => {
        const blocks = containerRef.current.getElementsByClassName("box");
        blocks[1].setAttribute("img", `${images[0]}`);
    };

    /*
    * spin(backwards) is able to generate a carousel that can move in an endless cycle in both directions. The first things it needs are the
    * container that will hold inside the three elements that will cycle around (previous, current and next), these three elements as well and
    * the number of elements that will be cycled around (obtained from the length of the elements array).
    * 
    * This function works by swapping the three elements around in the desired direction. For example by pressing the backwards button, it will
    * rearrange the contents of the 3 elements (prev, current, next) in a list of 9 elements from 0, 1, 2 into 8, 0, 1. 
    * 
    * Then it will quickly move from the middle element to the final one (so fast it'll be unnoticeable) and will go back to the center (from 1
    * to 0). The opposite will happen if you press the forward button.
    */
    const spin = (backwards) => {
        const container = containerRef.current;
        const elements = container.getElementsByClassName("box");
        const numElements = elements.length;

        if (numElements < 2) {return;}
        if (backwards) {
            const prevImgIndex = currentImage !== 0 ? currentImage - 1 : images.length - 1;
            setCurrentImage(prevImgIndex);
            elements[0].setAttribute("src", `${images[prevImgIndex]}`);

            const temp = elements[numElements - 1].cloneNode(true);

            for (let i = numElements - 1; i > 0; i--) {
                const prevElement = elements[i - 1].cloneNode(true);
                elements[i].parentNode.replaceChild(prevElement, elements[i]);
            }
            elements[0].parentNode.replaceChild(temp, elements[0]);
            container.scrollTo({ left: container.scrollWidth - container.clientWidth });
        } else {
            const nextImgIndex = currentImage !== images.length - 1 ? currentImage + 1 : 0;
            setCurrentImage(nextImgIndex);
            elements[2].setAttribute("src", `${images[nextImgIndex]}`);

            const temp = elements[0].cloneNode(true);

            for (let i = 0; i < numElements - 1; i++) {
                const nextElement = elements[i + 1].cloneNode(true);
                elements[i].parentNode.replaceChild(nextElement, elements[i]);
            }
            elements[numElements - 1].parentNode.replaceChild(temp, elements[numElements - 1]);
            container.scrollTo({ left: 0 });
        }

        elements[1].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        });
    };

    //Buttons to navigate inside the carousel
    const arrowStyle = 'absolute text-white text-2xl z-10 bg-white h-10 w-10 rounded-full opacity-75 flex items-center justify-center';
    const sliderControl = isLeft => (
        <button type="button" onClick={isLeft ? () => spin(true) : () => spin()} className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`} style={{ top: '40%' }}>
            <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`} className={"bg-slate-900"}>
                {isLeft
                    ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:scale-125" viewBox="0 0 24 24" stroke="#ed7aad">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="7" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ed7aad">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="7" d="M9 5l7 7-7 7" />
                    </svg>}
            </span>
        </button>
    );

    return (
        <div className='relative'>
            <div id="container" ref={containerRef} className="w-full overflow-hidden max-h-96 min-h-96">
            {sliderControl(true)}
                <div className=" flex max-h-96 min-h-96" style={{ width: '300%'}}>
                    <img className="box w-1/3  max-h-96 min-h-96"></img>
                    <img className="box w-1/3  max-h-96 min-h-96" src={`${images[0]}`}></img>
                    <img className="box w-1/3  max-h-96 min-h-96"></img>
                </div>
            </div>
            {sliderControl()}
        </div>
    );
}

export default Carousel;