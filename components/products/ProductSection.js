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
        <main className="bg-slate-50 min-h-screen py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-0">
                        <div className="p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
                            <ProductImage images={productData.images || []} id={productData.id} />
                        </div>
                        <div className="p-5 sm:p-7 lg:p-9">
                            <ProductDetails productData={productData} />
                        </div>
                    </div>
                </div>

                {productsRelated?.length > 0 && (
                    <section className="mt-10">
                        <div className="mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">También te puede interesar</h2>
                            <p className="text-sm text-slate-500 mt-1">Productos relacionados</p>
                        </div>
                        <Gallery productData={productsRelated} />
                    </section>
                )}
            </div>
        </main>
    )
}

export default ProductSection
