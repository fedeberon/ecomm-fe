import ProductImage from '@/components/products/ProductImage'
import ProductDetails from '@/components/products/ProductDetails'
import Gallery from "@/components/products/Gallery";
import { useEffect, useState } from "react";
import * as productService from "../../services/productService";

function ProductSection({ productData }) {
    const [productsRelated, setProductsRelated] = useState([])

    useEffect(() => {
        let mounted = true;
        const loadRelated = async () => {
            const products = await productService.getProductsRelated(productData)
            if (mounted) setProductsRelated(products || [])
        }
        loadRelated()
        return () => { mounted = false }
    }, [productData?.id])

    return (
        <main className="bg-slate-50 min-h-screen py-4 sm:py-5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-0">
                        <div className="p-4 sm:p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-slate-100">
                            <ProductImage images={productData.images || []} id={productData.id} />
                        </div>
                        <div className="p-5 sm:p-6 lg:p-7">
                            <ProductDetails productData={productData} />
                        </div>
                    </div>
                </div>

                {productsRelated?.length > 0 && (
                    <section className="mt-7">
                        <div className="mb-3">
                            <h2 className="text-lg sm:text-xl font-bold text-slate-900">También te puede interesar</h2>
                            <p className="text-xs text-slate-500 mt-1">Productos relacionados</p>
                        </div>
                        <Gallery productData={productsRelated} />
                    </section>
                )}
            </div>
        </main>
    )
}

export default ProductSection
