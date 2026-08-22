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
        <main className="bg-slate-50 min-h-screen py-3 sm:py-4">
            <div className="max-w-5xl mx-auto px-4 sm:px-5">
                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-0">
                        <div className="p-3 sm:p-4 lg:p-5 border-b lg:border-b-0 lg:border-r border-slate-100">
                            <ProductImage images={productData.images || []} id={productData.id} />
                        </div>
                        <div className="p-4 sm:p-5 lg:p-5">
                            <ProductDetails productData={productData} />
                        </div>
                    </div>
                </div>

                {productsRelated?.length > 0 && (
                    <section className="mt-5">
                        <div className="mb-3">
                            <h2 className="text-lg font-bold text-slate-900">También te puede interesar</h2>
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
