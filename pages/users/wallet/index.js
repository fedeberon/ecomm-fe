import {getWalletUser} from "../../../services/walletService";

const Wallet = (walllet) =>{
   

    return(
            <div className=''>
                <div className='text-white max-w-xs my-auto mx-auto bg-gradient-to-r from-blue-900 to-blue-500 p-4 py-5 px-5 rounded-xl'>
                    <div className="flex justify-between">
                        <div>
                            <h2> Mis puntos</h2>
                            <p className='text-2xl font-bold'> {walllet.points}</p>
                        </div>
                        <div className="flex items-center ">
                            <div className='p-5 bg-gray-200 bg-opacity-40 rounded-full'></div>
                            <div className='p-5 bg-gray-200 bg-opacity-30 rounded-full -ml-4'></div>
                        </div>
                    </div>
                    <div className='mt-5 flex justify-between items-center w-52'>
                        <span className='text-lg'> CUIL </span>
                        /* <span> **-******-* </span> */
                    </div>
                    <div className='flex justify-between mt-5 w-48 '>
                        <div>
                            <h3 className="text-xs"> Vencimiento </h3>
                            <p className="font-bold"> 10/21 </p>
                        </div>
                        <div>
                            <h3 className="text-xs"> Titular </h3>
                            <p className="font-bold"> Esther E. </p>
                        </div>
                    </div>
                </div>
            </div>

    )
}
export default Wallet


export async function getStaticProps() {
    const walllet = await getWalletUser();
    return {
      props: {
        walllet
      },
    }
  }