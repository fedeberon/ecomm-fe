import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/products/Price'
import logo from "../../images/default.jpeg";
import { useState } from "react";


function ProductCard({ product }) {
  const title = product.name;
  const description = product.description;
  const price = product.price;
  const promo = product.promo;

  

  const defaultImage = {
        "url": "default.jpeg",
        "link": logo,
        "main": false
      };

  const image = product.images && product.images.length != 0 ? product.images[0].link : defaultImage.link

  return (
    <Link
      href={`/products/${product.id}`}
      passHref
    >
      <a className="h-120 w-80 rounded shadow-lg mx-auto border border-palette-lighter">
        <div className="h-72 border-b-2 m-2 border-palette-lighter relative">
          {
            <Image
                src={image}
                layout="fill"
                className="transform duration-500 ease-in-out hover:scale-110"
            />
          }
        </div>
        <div className="h-48 relative">

            {

              promo
              ?
                <div>
                  <span className={'absolute py-2 px-8 text-sm text-white -top-2 right-4 bg-red-600 rounded-md transform translate-x-5 -translate-y-5 shadow-xl'}>Promo</span>
                </div>
              :
                <div></div>
            }

          

          <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
            {title}
          </div>
          <div className="text-lg text-gray-600 p-4 font-primary font-light">
            {description}
          </div>
          <div className="text-lg text-gray-600 p-4 font-primary font-light">
            {product.category ? product.category.name : ''}
          </div>
          <div
            className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
          >
            <Price
              currency="$"
              num={price}
              numSize="text-lg"
            />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
