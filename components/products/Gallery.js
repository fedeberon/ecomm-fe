import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "@/components/products/ProductCard";
import { useMemo } from "react";

const Gallery = ({ productData = [] }) => {
    const chunkSize = 3;

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
                            className={`absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-2xl text-slate-700 shadow-lg transition hover:bg-white hover:text-palette-sdark ${!hasPrev && !groupedProducts.length ? 'hidden' : ''}`}
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
                            className={`absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-2xl text-slate-700 shadow-lg transition hover:bg-white hover:text-palette-sdark ${!hasNext && !groupedProducts.length ? 'hidden' : ''}`}
                        >
                            ›
                        </button>
                    )
                )}
                className="relative"
            >
                {groupedProducts.map((products, index) => (
                    <div className="grid grid-cols-1 gap-5 px-14 sm:grid-cols-2 xl:grid-cols-3" key={index}>
                        {products.map((product, innerIndex) => (
                            <div
                                key={product?.id || innerIndex}
                                className="m-auto w-full max-w-sm rounded-2xl bg-white p-4 shadow-md"
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

export default Gallery;
