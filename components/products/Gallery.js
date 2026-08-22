import ProductCard from "@/components/products/ProductCard";
import { useEffect, useMemo, useState } from "react";

const Gallery = ({ productData = [] }) => {
    const chunkSize = 4;
    const [currentSlide, setCurrentSlide] = useState(0);

    const groupedProducts = useMemo(() => {
        const groups = [];
        for (let i = 0; i < productData.length; i += chunkSize) {
            groups.push(productData.slice(i, i + chunkSize));
        }
        return groups;
    }, [productData]);

    useEffect(() => {
        setCurrentSlide(0);
    }, [productData]);

    useEffect(() => {
        if (groupedProducts.length <= 1) return undefined;
        const timer = setInterval(() => {
            setCurrentSlide((slide) => (slide + 1) % groupedProducts.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [groupedProducts.length]);

    if (!groupedProducts.length) return null;

    const previousSlide = () => {
        setCurrentSlide((slide) => (slide - 1 + groupedProducts.length) % groupedProducts.length);
    };

    const nextSlide = () => {
        setCurrentSlide((slide) => (slide + 1) % groupedProducts.length);
    };

    return (
        <div className="relative w-full overflow-hidden">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {groupedProducts.map((products, index) => (
                        <div className="min-w-full px-12 py-2" key={index}>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                                {products.map((product, innerIndex) => (
                                    <div key={product?.id || innerIndex} className="mx-auto w-full max-w-[280px]">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {groupedProducts.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={previousSlide}
                        aria-label="Anterior"
                        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-2xl text-slate-700 shadow-md transition hover:text-palette-sdark"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Siguiente"
                        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-2xl text-slate-700 shadow-md transition hover:text-palette-sdark"
                    >
                        ›
                    </button>
                    <div className="mt-3 flex justify-center gap-2">
                        {groupedProducts.map((_, index) => (
                            <button
                                type="button"
                                key={index}
                                aria-label={`Ir al slide ${index + 1}`}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-6 bg-palette-sdark" : "w-2 bg-slate-300"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Gallery;
