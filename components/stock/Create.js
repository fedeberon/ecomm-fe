import {search} from "../../services/productService";
import { useState} from "react";
import SearchProduct from "@/components/stock/SearchProduct";
import {save} from "/services/stockService"
import { NotificationManager, NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';

const Create = () => {

    const [errors, setErrors] = useState({})
    const [stocks, setStocks] = useState([])
    const[show, isShow] = useState(false)
    const[result, setResult] = useState([])

    const searchValue = async (e) => {
        if(e.target.value === '') return;
        const resultSearch = await search(e.target.value);
        setResult(resultSearch);
    }

    const remove = (id) => {
        const array = [...stocks];
        stocks.forEach((item, index) => {
            if(item.id = id) {
                array.splice(index, 1);
            }
        })
        setStocks(array)
    }

    const add = (product) => {
        const updatedCarsArray = [...stocks, {
          "quantity": null,
            "order" : null,
            product
        }];
        setStocks(updatedCarsArray)
        toggleModal();
        setResult([])
        document.getElementById('search').value = ""
    }

    const showOnShop = (product) => {
        window.open(`/products/${product.id} `, `_blank`)
    }

    const toggleModal = () => {
        isShow(!show)
    }

    const validateStock =(stoks)=>{

      let errors = {}
      if (stoks[0]?.order == null || stoks[0].order == "" ){
        errors.order = "El campo 'Orden' es requerido";
        setErrors(errors)
      }
      stoks.map(item =>{
        if (!item.quantity == null || item.quantity == "" || item.quantity < 1){
          errors.quantity = "El campo 'Cantidad' es requerido";
          setErrors(errors)
          return;
      }
      })
      setErrors(errors)
    }


    const saveStocks = () => {
 

      if(errors.order == undefined && errors.quantity == undefined){
        save(stocks).then((result) => {
          if (result.status == 200) {
            NotificationManager.info('El stock se cargo correctamente', 'Administracion de stock' , 3000);
          }else{
            NotificationManager.info(result.status +'No fue posible cargar el articulo: ', 'Administracion de productos' , 1000)
          }
        });   
      }
      return;

    }


    const handleChange = (e,index)=>{
    const { name, value } = e.target;
      if(name == "order"){
        stocks.map((stock)=>{
          stock[name] = value
        })
      } else{
        const stock = stocks[index];
        stock[name]= value;
      }
      validateStock(stocks);
    }
    return (

      <>
      <NotificationContainer/>
        <div className="flex"
        >
            <span className="text-sm border border-2 rounded-l px-4 py-2 bg-white w-32 whitespace-no-wrap">Orden #</span>
            <input name="order" className="border border-2 rounded-r px-4 py-2 w-full" type="text"
                    placeholder="Ingrese el n&uacute;mero de comprobante ..." onChange={(e)=>handleChange(e)} />
             {errors.order &&   <p className={`text-red-500 text-xs italic`}>*</p>}
        </div>
        <section className="container mx-auto p-6 font-mono">
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">C&oacute;digo</th>
                    <th className="px-4 py-3">stocks</th>
                    <th className="px-4 py-3">Cantidad</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {stocks === undefined || stocks.length == 0 ? (
                    <>No hay items</>
                  ) : (
                    stocks.map((item, index) => (
                      <tr className="text-gray-700">
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={item.product.image}
                                alt=""
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold text-black">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {item.product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">
                          {item.product.id}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          {item.product.stock}
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          <div className="custom-number-input h-10 w-32">
                            <div className="flex flex-row h-10 w-full rounded-lg  bg-transparent mt-1">
                              <input
                                onChange={(e)=>handleChange(e,index)}
                                type="number"
                                placeholder="00"
                                className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                name="quantity"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm border">
                          <button href={"#"} onClick={() => remove(item.product.id)}>
                            Quitar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <div className="flex items-center justify-center h-full">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={toggleModal}
          >
            Agregar
          </button>

          <button
            className="py-2 px-4 ml-4 bg-green-500 text-white rounded hover:bg-blue-700"
            onClick={saveStocks}
          >
            Guardar
          </button>
          {errors.quantity &&   <p className={`text-red-500 text-xs italic`}>{errors.quantity}</p>}

        </div>

        <SearchProduct
          show={show}
          isShow={isShow}
          add={add}
          searchValue={searchValue}
          showOnShop={showOnShop}
          result={result}
        />
      </>
    );
}

export default Create