
import React, { useEffect, useRef, useState } from 'react';

const largeImages = ['/images/carrousel/panalera-02.jpg','/images/carrousel/panalera-01.jpg','/images/carrousel/panalera-03.jpg', '/images/carrousel/panalera-04.jpg', '/images/carrousel/panalera-05.jpg', '/images/carrousel/panalera-06.jpg']
const responsiveImages = ['/images/PanaleriaResponsive.png', '/images/LactanciaResponsive.png', '/images/AccesoriosResponsive.png']

function Carousel({ }) {
    const containerRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [images, setImages] = useState([])
    const [windowDimensions, setWindowDimensions] = useState([0, 0]);
    const [imgs, setImgs] = useState([]);
    const [initialHeight, setInitialHeight] = useState(null);

    //Obtains the img elements that will be set
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const newimgs = container.getElementsByTagName("img");
            setImgs(newimgs);
        }
    }, [containerRef]);

    //Gets the right type of image depending on the size of the screen
    //Used to get the true height of the window and pass it to the carousel    
    useEffect(() => {
        const updateWindowDimensions = () => {
            let height;

            setImages(largeImages)
            if (window.innerWidth >= 1024) {                
                height = window.innerHeight - 60;
            } else if (window.innerWidth >= 768) {
                height = window.innerHeight - 74.37;
            } else {
                setImages(responsiveImages)
                height = window.innerHeight - 88;
            }

            setWindowDimensions([height, window.innerWidth * 3]);

            imgs[1] && imgs[1].scrollIntoView({ block: 'nearest',inline: 'start'});
        };

        window.addEventListener('resize', updateWindowDimensions);
        updateWindowDimensions();

        setInitialHeight(windowDimensions[0]);

        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        };
    }, [imgs, initialHeight]);

    //This ensures the central element will remain in the center

    /*
    * spin(backwards) is able to generate a carousel that can move in an endless cycle in both directions. The first things it needs are the
    * container that will hold inside the three imgs that will cycle around (previous, current and next), these three imgs as well and
    * the number of imgs that will be cycled around (obtained from the length of the imgs array).
    * 
    * This function works by swapping the three imgs around in the desired direction. For example by pressing the backwards button, it will
    * rearrange the contents of the 3 imgs (prev, current, next) in a list of 9 imgs from 0, 1, 2 into 8, 0, 1. 
    * 
    * Then it will quickly move from the middle element to the final one (so fast it'll be unnoticeable) and will go back to the center (from 1
    * to 0). The opposite will happen if you press the forward button.
    */
    const spin = (backwards) => {
        const numimgs = imgs.length;

        if (numimgs < 2) { return; }
        if (backwards) {
            const prevImgIndex = currentImage !== 0 ? currentImage - 1 : images.length - 1;
            setCurrentImage(prevImgIndex);
            imgs[0].setAttribute("src", `${images[prevImgIndex]}`);

            const temp = imgs[numimgs - 1].cloneNode(true);

            for (let i = numimgs - 1; i > 0; i--) {
                const prevElement = imgs[i - 1].cloneNode(true);
                imgs[i].parentNode.replaceChild(prevElement, imgs[i]);
            }
            imgs[0].parentNode.replaceChild(temp, imgs[0]);
            container.scrollTo({ left: container.scrollWidth - container.clientWidth });
        } else {
            const nextImgIndex = currentImage !== images.length - 1 ? currentImage + 1 : 0;
            setCurrentImage(nextImgIndex);
            imgs[2].setAttribute("src", `${images[nextImgIndex]}`);

            const temp = imgs[0].cloneNode(true);

            for (let i = 0; i < numimgs - 1; i++) {
                const nextElement = imgs[i + 1].cloneNode(true);
                imgs[i].parentNode.replaceChild(nextElement, imgs[i]);
            }
            imgs[numimgs - 1].parentNode.replaceChild(temp, imgs[numimgs - 1]);
            container.scrollTo({ left: 0 });
        }

        imgs[1].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
            height:'200',
        });
    };

    // We need the height to adjust the carousel image
    const heightAdjust = {
        height: `${initialHeight}px`
    };

    //Buttons to navigate inside the carousel
    const arrowStyle = 'absolute text-white text-2xl z-10 bg-white h-10 w-10 rounded-full opacity-75 flex items-center justify-center';
    const sliderControl = isLeft => (
        <button type="button" onClick={isLeft ? () => spin(true) : () => spin()} className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`} style={{ top: '40%' }}>
            <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`} className={"bg-slate-900"}>
                {isLeft
                    ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:scale-125" viewBox="0 0 24 24" stroke="#ed7aad">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#ed7aad">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" d="M9 5l7 7-7 7" />
                    </svg>}
            </span>
        </button>
    );

    const positions = [1, 2, 3];
    return (
        <div style={heightAdjust} className='relative'>
            <div id="container" ref={containerRef} className="w-full overflow-hidden">
                {sliderControl(true)}
                <div className=" flex " style={{ width: `${windowDimensions[1]}px`}}>
                    {positions.map((item, index) => (
                        <img key={index}
                            className="w-1/3"
                            style={heightAdjust}
                            src={`${images[0]}`}></img>
                    ))}
                </div>
            </div>
            {sliderControl()}
        </div>
    );
}

export default Carousel;