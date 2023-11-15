import Image from 'next/image'
import Link from 'next/link'
import Price from '@/components/products/Price'
import logo from "../../images/default.jpeg";

function ProductCard({ product }) {
  const title = product.name;
  const description = product.description;
  const price = product.price;
  const promo = product.promo;

  let defaultImage = {
        "url": "default.jpeg",
        "link": logo,
        "main": false
      };

  let image = product.images && product.images.length != 0 ? product.images[0].link : defaultImage.link

  return (
    (<Link
      href={`/products/${product.id}`}
      passHref
      className="h-120 w-80 max-w-80 bg-white overflow-hidden rounded-lg shadow-lg mx-auto border border-palette-lighter">

      <div className="h-72 border-b-2 m-2 border-palette-lighter relative">
        {
          <Image
              src={image.src ? image.src : image}
              layout="fill"
              className="transform imgproduct duration-500 ease-in-out hover:scale-110"
          />
        }
      </div>
      <div className="h-48 relative">

          {

            promo
            ?
              <div>
                <span className={'absolute py-2 px-8 text-sm text-white -top-2 right-4 bg-palette-secondary rounded-md transform translate-x-5 -translate-y-5 shadow-xl'}>Promo</span>
              </div>
            :
              <div></div>
          }

        

        <div className="w-full bg-white font-primary truncate text-palette-primary text-2xl pt-4 px-4 font-bold">
          {title}
        </div>


        <div className="relative text-lg bg-white h-20 overflow-hidden text-palette-secondary p-4 font-primary font-semibold">
          <div className="relative">
            {description}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 text-lg text-palette-secondary p-4 truncate font-primary font-light">
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

    </Link>)
  );
}

export default ProductCard
