import { useEffect, useState } from "react";
import logo from "/images/Logo Dulce bb.png";
import logo2 from "/images/logo3buhos.png"
import { useMemo } from "react";
import FilterComponent from "@/components/filter/FilterComponent";
import DataTable from "react-data-table-component";
import DateObject from "react-date-object";
import AddPoints from "./AddPoints";
import RemovePoints from "./RemovePoints";
import { useSession } from "next-auth/client";
import { getPoints } from "services/walletService";




const WalletOfUser = ({ walletOfUser, user }) => {
    const [isWallet, setIsWallet] = useState(false);
    const [points, setPoints] = useState(0);
    const [addPoints, setAddPoints] = useState(false)
    const [removePoints, setRemovePoints] = useState(false)
    const [session, loading] = useSession();

    const [filterText, setFilterText] = useState('');
    const filteredItems = walletOfUser && walletOfUser.filter(item => filterText == '' || filterText.toLowerCase().includes(item.id));
    
    useEffect(async () => {
        walletOfUser.length == 0 ? setIsWallet(false) : setIsWallet(true);
        setPoints(await getPoints(user.username))
    }, [walletOfUser]);


    const columns = [

        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Producto',
            selector: row => row.product === null ? "Puntos" : row.product.name,
            sortable: true
        },
        {
            name: 'Puntos',
            selector: row => row.points,
            sortable: true
        },
        {
            name: 'Cantidad',
            selector: row => row.quantity,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => testDuePoints(row.date),
            sortable: true

        }
    ]

    const conditionalRowStyles = [
        {
            when: row => row.points,
            style: row => ({
            
                textDecoration: row.isConsumed === true ? "line-through" : null,
                color: row.isConsumed === true ? "red" : null
            }),
        }
    ]

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };
        return (
            <FilterComponent  onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText]);


    const testDuePoints = (date, active) => {
        let today = new Date();
        let buydate = new Date(date);
        let expiredate = new Date(date)
        expiredate.setMonth(buydate.getMonth() + 3);
        expiredate.setDate(1)
        let time = date.split("T")
        date = time[0]+time[1]

        let result = today > expiredate

        // To Columns
        if (result) {
            return "Vencido: " + new DateObject(date).format("DD/MM/YYYY hh:mm:ss", ["Date", "Time"]);
        } else {
            return new DateObject(date).format("DD/MM/YYYY hh:mm:ss", ["Date", "Time"])

        }
    }

    const handleAddPointsOnClose = () => setAddPoints(false)
    const handleRemovePointsOnClose = () => setRemovePoints(false)



    return (
        <div className='justify-between'>
            {user.twins
                ?
                <div id="myDiv">
                    <div className='m-auto w-80 h-48 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500 bg-gradient-to-r from-blue-500 to-green-400 p-4 py-3 px-5 rounded-xl'>
                        <div className="relative flex justify-between">
                            <div>
                                <h2 className='relative text-left font-bold text-xl decoration-pink-500 font-bold'>Tarjeta Mellizos</h2>
                                <h2 className="relative italic">20% de descuento</h2>

                            </div>
                            <div className="relative flex items-center">
                                <img src={logo2.src} className={"w-24 relative lg:w-32 mt-2"} />
                            </div>
                        </div>
                        <div className='relative flex justify-between mt-8 w-48 '>
                            <div>
                                <h3 className="relative text-xs"> Titular </h3>
                                <p className="relative font-bold"> {user.name} {user.lastName} </p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                    <div className='m-auto w-80 h-48 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500 bg-gradient-to-r from-pink-500 to-purple-500 p-4 py-5 px-5'>
                        <div className="flex justify-between">
                            <div>

                                <h2> Mis puntos</h2>
                                <p className='text-2xl font-bold'> {points} </p>
                            </div>
                            <div className="flex items-center">
                                <img src={logo.src} className={"w-16 relative lg:w-24"} />
                            </div>
                        </div>
                        <div className='flex justify-between mt-8 w-48 '>
                            <div>
                                <h3 className="text-xs"> Titular </h3>
                                <p className="font-bold"> {user.name} {user.lastName} </p>
                            </div>
                        </div>
                    </div>
                </>
            }



            <div className={""}>
                <div className="leading-relaxed font-primary font-extrabold text-2xl text-center text-palette-primary mt-4 py-2 sm:py-4">Adquisicion de puntos</div>
            
           {
           session?.user?.role?.includes("ADMIN")
          ? 
            <div className="flex justify-between m-auto w-80 h-10">
                <a
                    onClick={() => setRemovePoints(true)}
                    aria-label="back-to-products"
                    className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 py-2 px-4
                    justify-center items-center md:-mt-2  focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm cursor-pointer">
                    Quitar puntos
                </a>  
                <a
                    onClick={() => setAddPoints(true)}
                    aria-label="back-to-products"
                    className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 py-2 px-4
                    justify-center items-center md:-mt-2  focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm cursor-pointer">
                    Añadir puntos
                </a>
            </div>
            : null
            }

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
                                    conditionalRowStyles={conditionalRowStyles}
                                />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <AddPoints onClose={handleAddPointsOnClose} visible={addPoints} user={user}/>
                <RemovePoints onClose={handleRemovePointsOnClose} visible={removePoints} user={user}/>
        </div>

    );
}
export default WalletOfUser;


