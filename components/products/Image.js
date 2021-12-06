import logo from "../../images/default.jpeg";

const Image = ({product}) => {

    return (
        <div className="flex-shrink-0 h-10 w-10">
            {
                product.images && product.images.length != 0
                    ?
                    <img className="h-10 w-10 rounded-full"
                         src={product.images[0].link}
                         alt=""/>
                    :
                    <img className="h-10 w-10 rounded-full"
                         src={logo.src}
                         alt=""/>
            }
        </div>
    )
}

export default Image