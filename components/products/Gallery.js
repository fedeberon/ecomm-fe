import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "@/components/products/ProductCard";
import {useEffect, useState} from "react";

const Gallery = ({ productData }) => {
    const chunkSize = 3; // Tamaño de cada conjunto de productos

    // Agrupa los productos en conjuntos de tamaño chunkSize
    const [groupedProducts, setGroupedProducts] = useState([]);

    for (let i = 0; i < productData.length; i += chunkSize) {
        groupedProducts.push(productData.slice(i, i + chunkSize));
    }

    return (
        <div>
            <Carousel
                showArrows={true}
                infiniteLoop={true}
                selectedItem={0}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                            onClick={onClickHandler}
                            aria-label={label}
                        >
                            {/* Agrega aquí tu icono de flecha izquierda */}
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                            onClick={onClickHandler}
                            aria-label={label}
                        >
                            {/* Agrega aquí tu icono de flecha derecha */}
                        </button>
                    )
                }
                className="relative"
            >
                {groupedProducts.map((products, index) => (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-9 2xl:gap-4" key={index} >
                        {products.map((product, innerIndex) => (
                            <div
                                key={innerIndex}
                                className="m-auto bg-white shadow-md rounded-lg p-4 w-80 h-120"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Gallery