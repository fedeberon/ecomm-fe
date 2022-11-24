import Calendar from 'react-calendar';
import {useMemo, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import DateObject from "react-date-object";
import { search } from "../../services/reportService";
import List from '../reports/List';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Calendario() {
  const [date, setDate] = useState(new Date());
  const [filter, isShowFilter] = useState(false)
  const [info, setInfo] =useState()
 
  const close = () => {
    isShowFilter(false)
  }

  const open = () => {
    isShowFilter(!filter)
  }

  const data = useMemo(() => ({
    "start": "",
    "end": ""
  })
  );

  const [dates, setDates] = useState(data) 
  const handleChangeData = (async (e)=>{
    setDates({
      "start": new DateObject(e[0]).format("DD/MM/YYYY hh:mm:ss", ["Date", "Time"]),
      "end": new DateObject(e[1]).format("DD/MM/YYYY hh:mm:ss", ["Date", "Time"])
    })
  })

  const handleSubmit = (async(e)=>{
    e.preventDefault()
    await search(dates).then((data)=>{
      if(data.length===0){
        NotificationManager.info('No hay reportes dentro del rango de fechas')
        isShowFilter(false)
      }else{
      isShowFilter(false)
      setInfo(data)
      console.log(data)
      }
    })
  })

  return (
    <>
    <NotificationContainer/>
    <div className='app'>
                    <div className='flex justify-center py-2 h-20 '>

                        <div className='justify-between my-auto mx-4'>
                            
                            <button className="text-white  bg-palette-secondary border border-solid border-palette-secondary hover:bg-palette-slight hover:text-white active:bg-palette-slight font-bold
                                            uppercase
                                            text-xl
                                            p-2
                                            my-auto
                                            rounded-xl
                                            shadow-lg shadow-indigo-500/50
                                            outline-none
                                            focus:outline-none
                                            ease-linear
                                            transition-all
                                            duration-150"
                                            type="button"
                                            onClick={open}>     
                            {filter ? "Cerrar" : "Calendario" }
                            </button>
                        </div>
                      </div>
                    <div className={`fixed z-50  top-0 w-full left-0 ${filter ? "" : "hidden"}  `} id="modal">
                        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div onClick={close} className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-700 opacity-75"/>
                            </div>
                                <span className=" sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                            <div className="w-auto inline-block bg-white  rounded-lg text-left shadow-xl transform transition-all my-8 align-middle"
                              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                <div className=" m-auto px-4 pt-6 pb-2 sm:p-6 sm:pb-4">
                                <h1 className='text-center'>Buscar reportes por fecha Desde/Hasta</h1>
                                          <div className='calendar-container'>
                                            <Calendar 
                                            onChange={handleChangeData}
                                            selectRange={true}
                                            />
                                    </div>
                                    {date.length > 0 ? (
                                <p className='text-center'>
                                  <span className='bold'>Desde:</span>{' '}
                                  {date[0].toDateString()}
                                  &nbsp;|&nbsp;
                                  <span className='bold'>Hasta:</span> {date[1].toDateString()}
                                </p>
                              ) : (
                                <p className='text-center'>
                                  <span className='bold'>Fecha actual: </span>{' '}
                                  {date.toDateString()}
                                </p>
                              )}
                              </div>

                                <div class="p-3  mt-2 text-center space-x-4 md:block">
                                  <button class="mb-2 md:mb-0 bg-palette-slight border border-black-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:text-white rounded-full hover:shadow-lg hover:bg-palette-secondary" onClick={close}>Cerrar</button>
                                  <button class="mb-2 md:mb-0 bg-palette-slight border-black-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white hover:text-white rounded-full hover:shadow-lg hover:bg-palette-secondary" onClick={(e)=>handleSubmit(e)}>Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <List report={info}/>
    </div>
    </>
  );
}
 
export default Calendario;