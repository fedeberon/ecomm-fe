import {useEffect, useState} from "react";
import logo from "/images/Logo Dulce bb.png";

const WalletOfUser = ({walletOfUser, user}) => {
    const [isWallet, setIsWallet] = useState(false);
    const [points, setPoints] = useState(0);

    useEffect(() => {

        walletOfUser.length == 0 ? setIsWallet(false) : setIsWallet(true);

        setPoints(walletOfUser.reduce((a,v) =>  a = a + v.points , 0));
        }, [walletOfUser]);

  return (
      <div className='justify-between'>
          <div className={""}>
              <div className='text-white max-w-xs my-auto mx-auto bg-gradient-to-r from-pink-500 to-purple-500 p-4 py-5 px-5 rounded-xl'>
                  <div className="flex justify-between">
                      <div>
                          <h2> Mis puntos</h2>
                          <p className='text-2xl font-bold'> {points}</p>
                      </div>
                      <div className="flex items-center ">
                        <img src={logo.src} className={"w-16 relative lg:w-24"} />
                      </div>
                  </div>
                  {/* <div className='mt-5 flex justify-between items-center w-40'>
                      <span className='text-lg'> CUIL </span>
                      <span> {isWallet ? walletOfUser[0].user.cardId : user.user.username}</span>
                  </div> */}
                  <div className='flex justify-between mt-5 w-48 '>
                      {/* <div>
                          <h3 className="text-xs"> Vencimiento </h3>
                          <p className="font-bold"> 10/21 </p>
                      </div> */}
                      <div>
                          <h3 className="text-xs"> Titular </h3>
                          <p className="font-bold"> {isWallet ? walletOfUser[0].user.name : user.user.name }  {isWallet ? walletOfUser[0].user.lastName: ""} </p>
                      </div>
                  </div>
              </div>
          </div>
          <div className={""}>
              <div className="leading-relaxed font-primary font-extrabold text-2xl text-center text-palette-primary mt-4 py-2 sm:py-4">Adquisicion de puntos</div>
              <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                              <table className="min-w-full border-solid border-2 rounded">
                                  <thead className="border-b py-8">
                                  <tr>
                                      <th scope="col"
                                          className="text-sm text-center font-medium text-gray-900 py-4 text-left">
                                          #
                                      </th>
                                      <th scope="col"
                                          className="text-sm text-center font-medium text-gray-900 py-4 text-left">
                                          Producto
                                      </th>
                                      <th scope="col"
                                          className="text-sm text-center font-medium text-gray-900 py-4 text-left">
                                          Cantidad
                                      </th>
                                      <th scope="col"
                                          className="text-sm text-center font-medium justify-center text-gray-900 py-4 text-left">
                                          Puntos
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody className="bg-gray-100 items-center">
                                  {
                                      walletOfUser.map((w, index) => (
                                          <tr className="border-b" key={index}>
                                              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                  {w.id}
                                              </td>
                                              <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                  {w.product.name}
                                              </td>
                                              <td className="text-sm text-center text-gray-900 font-light text-center">
                                                  {w.quantity}
                                              </td>
                                              <td className="text-sm text-center text-gray-900 font-light text-center">
                                                  {w.points}
                                              </td>
                                          </tr>
                                      ))
                                  }
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
export default WalletOfUser;