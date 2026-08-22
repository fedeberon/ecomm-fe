import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "@/components/products/ProductCard";
import { useMemo } from "react";

const Gallery = ({ productData = [] }) => {
    const chunkSize = 4;

    const groupedProducts = useMemo(() => {
        const groups = [];
        for (let i = 0; i < productData.length; i += chunkSize) {
            groups.push(productData.slice(i, i + chunkSize));
        }
        return groups;
    }, [productData]);

    if (!groupedProducts.length) return null;

    return (
        <div className="relative">
            <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                showIndicators={groupedProducts.length > 1}
                infiniteLoop={groupedProducts.length > 1}
                swipeable={true}
                emulateTouch={true}
                useKeyboardArrows={true}
                interval={5000}
                transitionTime={450}
                stopOnHover={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) => (
                    groupedProducts.length > 1 && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            aria-label={label || "Anterior"}
                            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-xl text-slate-700 shadow-md transition hover:text-palette-sdark"
                        >
                            ‹
                        </button>
                    )
                )}
                renderArrowNext={(onClickHandler, hasNext, label) => (
                    groupedProducts.length > 1 && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            aria-label={label || "Siguiente"}
                            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-xl text-slate-700 shadow-md transition hover:text-palette-sdark"
                        >
                            ›
                        </button>
                    )
                )}
                className="relative"
            >
                {groupedProducts.map((products, index) => (
                    <div className="grid grid-cols-1 gap-4 px-12 py-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" key={index}>
                        {products.map((product, innerIndex) => (
                            <div key={product?.id || innerIndex} className="mx-auto w-full max-w-[280px]">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Gallery;
