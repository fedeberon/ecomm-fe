import { useEffect, useState } from "react";
import CreditCard from "@/components/cart/CreditCard";
import { getSession } from "next-auth/client";
import { getBilling } from "../../services/billingService";
import { useRouter } from "next/router";
import { buyWithPoints, createCheckout } from "../../services/productService";
import { useCartContext, useCleanCartContext } from "@/context/Store";
import Loading from "@/components/utils/Loading";
import { getPoints } from "../../services/walletService";
import logo from "../../images/Logo Dulce bb.png";
import { findAll, getByUsername } from "../../services/userService";
import CartTableBill from "@/components/cart/CartTableBill";
import { getPersonByCUIT } from "../../services/personService.js";
import logo2 from "/images/logo3buhos.png";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PageTitle from "@/components/PageTitle";

const Payment = ({ myPoints, users }) => {
  const [checkout, setCheckout] = useState();
  const [error, setError] = useState();
  const router = useRouter();
  const [cart, checkoutUrl] = useCartContext();
  const [loading, setLoading] = useState(false);
  const cleanCart = useCleanCartContext();
  const [card, setCard] = useState("visa");
  const [coupon, setCoupon] = useState("");
  const [points, setPoints] = useState(myPoints);
  const [check, setCheck] = useState(false);
  const [cross, setCross] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [personLoaded, setPersonLoaded] = useState()

  useEffect(async () => {
    setLoading(true);
    let checkout = await createCheckout(cart);
    setCheckout(checkout.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let total = cart.reduce((a, v) => a + v.price, 0);
    setTotalAmount(total);
  }, [cart]);

  const [person, setPerson] = useState({
    username: "",
    name: "",
    lastName: "",
    username: "",
    address: "",
    cuit: "",
  });

  const [tabs, setTabs] = useState({
    data: true,
    creditCard: false,
    pointCard: false,
  });

  const handleClick = (e) => {
    const { name } = e.target;
    setTabs({
      factura: false,
      data: false,
      creditCard: false,
      pointCard: false,
      paymentMethod: false,
    });
    setTabs({
      [name]: true,
    });
  };

  const submit = async (type) => {
    setLoading(true);
    let session = await getSession();
    const response = await getBilling(
      person,
      checkout,
      type,
      session,
      coupon,
      card
    );
    if (response.status === 200) {
      await router.push("/bills/" + response.data.id);
      cleanCart();
    }
    if (response.status === 500 || response.status === 400) {
      console.log(response)
      setError(response.data.error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreditPoints = (username) => {
    if (username != null) {
      setLoading(true);

      let walletDiscount = {
        "username": username,
        "checkoutId": checkout.id,
      };
      buyWithPoints(walletDiscount).then((res) => {
        if (res.data === "puntos insuficientes") {
          NotificationManager.info('El usuario no tiene puntos suficientes', 'Puntos insuficientes', 4000, () => {
          });
          setLoading(false);
        } else {
          setLoading(false);
          router.push(`/users/wallet/${username}`)
          cleanCart();
        }

      });
    }
  }

  const handleChangeUsers = (e) => {
    const { value } = e.target;
    if (value != "seleccionar") {
      setPersonLoaded(true)
      getPoints(value).then((res) => {
        setPoints(res);
    
      });

      getByUsername(value).then((res) => {
        setPerson({
          username: res.username,
          name: res.name,
          lastName: res.lastName,
          address: res.address,
          cuit: res.cuit,
          twins: res.twins,
        });
      });
    } else {
      setPersonLoaded(false)
      setPerson({ name:"SELECIONAR USUARIO" })
      setPoints(0)
    }

    
  };

  

  const handleCUIT = async (cuit) => {
    let dataCuit = await getPersonByCUIT(cuit);
    if (dataCuit.status === undefined) {
      setCheck(true);
    } else {
      setCheck(false);
    }
    if (dataCuit.status === 400) {
      setCross(true);
    } else {
      setCross(false);
    }
  };

  const [showCreditCard, setShowCreditCard] = useState(false);

  const [showPointCard, setShowPointCard] = useState(false);

  const handleSelect = (e) => {
    const { value } = e.target;
     
    if (value === "seleccionar") {
      setShowPointCard(false);
      setShowCreditCard(false);
      
    }

    if (value === "credit card") {
      

      setShowCreditCard(true);
      setShowPointCard(false);
    }
    if (value === "point card") {
      setShowPointCard(true);
      setShowCreditCard(false);
    }
  };

  return (
      <div className="mx-auto max-w-full">
        <PageTitle text="Pago" />
        <NotificationContainer/>
        {checkout ? (
          <div className="bg-white-100 lg:px-3">
            <div className="lg:mx-6 bg-white  min-h-screen w-full">
                <div
                  id="second"
                  className={`${tabs.data ? `` : `hidden`} justify-center  p-4`}
                >
                  <div className=" py-8 px-5 md:px-10 bg-white m-auto w-full md:w-1/2">
                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                      Detalle de Facturaci&oacute;n
                    </h1>

                    <select
                      id="user"
                      className="text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                      onChange={handleChangeUsers}
                    >
                      <option value="seleccionar">Seleccione el usuario </option>
                      {users.map((user, index) => {
                        return (
                          <option
                            key={index}
                            value={user.username}
                            name={`${user.name}`}
                          >
                            {user.name}
                          </option>
                        );
                      })}
                    </select>

                    <label
                      htmlFor="cuit"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      CUIT
                    </label>
                    <br />
                    <label
                      htmlFor="cuit"
                      className="text-red-600 uppercase text-sm font-bold leading-tight tracking-normal"
                    >
                      {error ? error : ""}
                    </label>
                    <div className="relative mb-5 mt-2">
                      <input
                        id="cuit"
                        name="cuit"
                        onChange={handleChange}
                        value={person.cuit}
                        className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="XX-XXXXXXXX-X"
                      ></input>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          handleCUIT(person.cuit);
                        }}
                      >
                        Verificar CUIT
                      </button>
                      {cross ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 absolute right-1 top-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="red"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <></>
                      )}
                      {check ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 absolute right-1 top-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="green"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <></>
                      )}
                    </div>




                    <label
                      htmlFor="name"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Nombre
                    </label>
                    <div className="relative mb-5 mt-2">
                      <input
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={person.name}
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Nombre"
                      />
                    </div>

                    <label
                      htmlFor="lastName"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      Apellido
                    </label>
                    <div className="relative mb-5 mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        onChange={handleChange}
                        value={person.lastName}
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Apellido"
                      />
                    </div>

                    <label
                      htmlFor="email"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                      e-Mail
                    </label>
                    <div className="relative mb-5 mt-2">
                      <input
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={person.username}
                        className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="e-Mail"
                      />
                    </div>
                    <div  className="flex items-center justify-center m-auto w-full">
                    <CartTableBill cart={cart} />
                    </div>
                    <div className="flex items-center justify-center m-auto w-full">
                    
                    <label
                      className="block uppercase block tracking-wide text-palette-primary text-xs font-bold mb-10 mt-4"
                      htmlFor="size"
                    >
                      SELECCIONA UN METODO DE PAGO
                    </label>
                    <select
                      onChange={handleSelect}
                      name="cardSelect"
                      id="selectCard"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value={"seleccionar"}>SELECCIONAR</option>
                      <option value={"credit card"}>TARJETA CREDITO</option>
                      <option value={"point card"}>TARJETA PUNTOS</option>
                    </select>
                  </div>

                    {totalAmount == 0 ? (
                      <div
                        className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
                        role="alert"
                      >
                        Encontramos el item en el carro con importes igual a CERO
                        !!
                      </div>
                    ) : (
                      <div className="flex items-center justify-center m-auto w-full">
                        <a
                          onClick={() => submit("A")}
                          aria-label="checkout-products"
                          className="bg-gray-500 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                              justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-gray-700 rounded-md mr-4"
                        >
                          Factura A
                        </a>

                        <a
                          onClick={() => submit("B")}
                          aria-label="checkout-products"
                          className="bg-yellow-600 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                          justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-yellow-700 rounded-md ml-4"
                        >
                          Factura B
                        </a>

                        <a
                          onClick={() => submit("C")}
                          aria-label="checkout-products"
                          className="bg-yellow-600 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                          justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-yellow-700 rounded-md ml-4"
                        >
                          Consumidor Final
                        </a>
                      </div>
  
                    )}

                    <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Close"
                        className="icon icon-tabler icon-tabler-x"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  id="third"
                  className={`${tabs.paymentMethod ? `` : `hidden`}`}
                >

           

                  {showCreditCard ? (
                    <div id="third" className="flex bg-white justify-center p-2">
                      <CreditCard
                        person={person}
                        setCard={setCard}
                        card={card}
                        coupon={coupon}
                        setCoupon={setCoupon}
                      />
                    </div>
                  ) : null}

                  {showPointCard ? (
                    <div id="quarter">
                      {person.twins ? (
                        <div id="myDiv">
                          <div className="m-auto w-80 h-48 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500 bg-gradient-to-r from-blue-500 to-green-400 p-4 py-3 px-5 rounded-xl">
                            <div className="relative flex justify-between">
                              <div>
                                <h2 className="relative text-left font-bold text-xl decoration-pink-500 font-bold">
                                  Tarjeta Mellizos
                                </h2>
                                <h2 className="relative italic">
                                  20% de descuento
                                </h2>
                              </div>
                              <div className="relative flex items-center">
                                <img
                                  src={logo2.src}
                                  className={"w-16 relative lg:w-24"}
                                />
                              </div>
                            </div>
                            <div className="relative flex justify-between mt-8 w-48 ">
                              <div>
                                <h3 className="relative text-xs"> Titular </h3>
                                <p className="relative font-bold">
                                  {" "}
                                  {person.name} {person.lastName}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="m-auto w-80 h-48 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500 bg-gradient-to-r from-pink-500 to-purple-500 p-4 py-5 px-5">
                          <div className="flex justify-between">
                            <div>
                              <h2>Puntos: </h2>
                              <p className="text-2xl font-bold"> {points}</p>
                            </div>
                            <div className="flex items-center ">
                              <img
                                src={logo.src}
                                className={"w-16 relative lg:w-24"}
                              />
                            </div>
                          </div>
                          <div className="flex justify-between mt-8 w-48 ">
                            <div>
                              <h3 className="text-xs"> Titular </h3>
                              <p className="font-bold">
                                {" "}
                                {person.name} {person.lastName}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <hr className="my-5" />
                      <div className="justify-center">
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                          Detalle de Facturaci&oacute;n
                        </h1>

                        <select
                          id="user"
                          className="text-gray-600 focus:outline-none  font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                          onChange={handleChangeUsers}

                        >
                          <option value="seleccionar">Seleccione el usuario </option>
                          {users.map((user, index) => {
                            return (
                              <option
                                key={index}
                                value={user.username}
                                name={`${user.name}`}
                              >
                                {user.name}
                              </option>
                            );
                          })}
                        </select>

                        {!personLoaded ?
                        (
                          <p
                            aria-label="checkout-products"
                            className="mt-8 w-80 bg-indigo-600 mx-auto text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
                                                      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3  rounded-sm min-w-full"
                          >
                            SELECCIONAR USUARIO


                          </p>
                        )

                        :

                        (person.twins ?  (
                          <p
                            aria-label="checkout-products"
                            className="mt-8 w-80 bg-indigo-600 mx-auto text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex
                                                      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3  rounded-sm min-w-full"
                          >
                            EL 20% DE DESCUENTO SE APLICARA A EN LA FACTURA FINAL
                            DEL TOTAL DE LA COMPRA


                          </p>
                        ) : (

                          <a
                            onClick={() => handleCreditPoints(person.username)}
                            value={person}
                            aria-label="checkout-products"
                            className="mt-8 w-80 bg-gradient-to-r from-blue-900 to-blue-500 mx-auto text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex cursor-pointer
                                                      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-1/3 hover:bg-blue-600 rounded-sm min-w-full"
                          >
                            Tarjeta de Puntos. Saldo: {points}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              
            </div>
          </div>
        ) : (
          <></>
        )}

        {loading ? <Loading message={"Un momento por favor ..."} /> : <></>}
      </div>
  );
};

export default Payment;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const users = await findAll();
  if (session == null) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  const myPoints = await getPoints(session.user.username);
  const user = session.user;
  return {
    props: {
      myPoints,
      user,
      users,
    },
  };
}
