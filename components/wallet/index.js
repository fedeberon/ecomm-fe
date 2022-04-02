import {useEffect, useState} from "react";
import logo from "/images/Logo Dulce bb.png";
import {useMemo} from "react";
import FilterComponent from "@/components/filter/FilterComponent";
import {paginationComponentOptions} from "../../DataTableUtils";
import DataTable from "react-data-table-component";
import DateObject from "react-date-object";

const WalletOfUser = ({walletOfUser, user}) => {
    const [isWallet, setIsWallet] = useState(false);
    const [points, setPoints] = useState(0);
    
    const [filterText, setFilterText] = useState('');
    const filteredItems = walletOfUser.filter(item => filterText == '' || filterText.toLowerCase().includes(item.id));
    

    useEffect(() => {
        walletOfUser.length == 0 ? setIsWallet(false) : setIsWallet(true);
        setPoints(walletOfUser.reduce((a,v) =>  a = a + v.points , 0));
        }, [walletOfUser]);
        const columns = [
            
            {
                name: 'id',
                selector: row => row.id,
                sortable: true
            },
            {
                name: 'Producto',
                selector: row => row.product.name,
                sortable: true
            },
            {
                name:'Puntos',
                selector: row => row.points,
                sortable: true
            },
            {
                name:'cantidad',
                selector: row => row.quantity,
                sortable: true
            },
            {
                name: 'Fecha',
                selector: row =>row.date,
                sortable: true
                
            }
        ]
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText]);



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
                          <p className="font-bold"> {user.name} {user.lastName} </p>
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

                          <DataTable
                            columns={columns}
                            data={filteredItems} 
                            pagination
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                          />


                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
export default WalletOfUser;


