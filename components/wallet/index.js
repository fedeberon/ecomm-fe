import {useEffect, useState} from "react";


const WalletOfUser = ({walletOfUser, user}) => {
  const [isWallet, setIsWallet] = useState(false);
    const [points, setPoints] = useState(0);

    useEffect(() => {

        walletOfUser.length == 0 ? setIsWallet(false) : setIsWallet(true);

        setPoints(walletOfUser.reduce((a,v) =>  a = a + v.points , 0));
        }, [walletOfUser]);

  return (
      <div className='flex'>
          <div className={"w-1/2"}>
              <div className='text-white max-w-xs my-auto mx-auto bg-gradient-to-r from-blue-900 to-blue-500 p-4 py-5 px-5 rounded-xl'>
                  <div className="flex justify-between">
                      <div>
                          <h2> Mis puntos</h2>
                          <p className='text-2xl font-bold'> {points}</p>
                      </div>
                      <div className="flex items-center ">
                          <div className='p-5 bg-gray-200 bg-opacity-40 rounded-full'></div>
                          <div className='p-5 bg-gray-200 bg-opacity-30 rounded-full -ml-4'></div>
                      </div>
                  </div>
                  <div className='mt-5 flex justify-between items-center w-52'>
                      <span className='text-lg'> CUIL </span>
                      <span>  {isWallet ? walletOfUser[0].user.cardId : user.user.username} </span>
                  </div>
                  <div className='flex justify-between mt-5 w-48 '>
                      <div>
                          <h3 className="text-xs"> Vencimiento </h3>
                          <p className="font-bold"> 10/21 </p>
                      </div>
                      <div>
                          <h3 className="text-xs"> Titular </h3>
                          <p className="font-bold"> {isWallet ? walletOfUser[0].user.name : user.user.name }  {isWallet ? walletOfUser[0].user.lastName: ""} </p>
                      </div>
                  </div>
              </div>
          </div>
          <div className={"w-1/2"}>
              <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                              <table className="min-w-full">
                                  <thead className="border-b">
                                  <tr>
                                      <th scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                          #
                                      </th>
                                      <th scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                          Producto
                                      </th>
                                      <th scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                          Cantidad
                                      </th>
                                      <th scope="col"
                                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                          Puntos
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      walletOfUser.map((w, index) => (
                                          <tr className="border-b" key={index}>
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                  {w.id}
                                              </td>
                                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                  {w.product.name}
                                              </td>
                                              <td className="text-sm text-gray-900 font-light text-center">
                                                  {w.quantity}
                                              </td>
                                              <td className="text-sm text-gray-900 font-light text-center">
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