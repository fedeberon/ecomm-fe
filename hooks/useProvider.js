import { useState } from "react";
import { save } from "../services/providersService"
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



 const useProvider = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // para poder agregar un loader mientras se guarda
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleChangeBrand = (e) =>{
    const { name, value } = e.target;

    if (name != "brand") {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }
  

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    let tal = validateForm(form);


    if (Object.keys(tal).length === 0) {
      save(form).then((result) => {
        if (result.data.hasOwnProperty("name")) {
          NotificationManager.info('El articulo: ' +'\"'+ form.name +'\"'+ "se cargo correctamente", 'Administracion de productos' , 1000);
        }else{
          NotificationManager.info(result.status +'No fue posible cargar el articulo: ' +'\"'+ form.name +'\"', 'Administracion de productos' , 1000)
        }

      });   

    } 

    else {

      return;

    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleChangeBrand,
    handleBlur,
    handleSubmit,
  };
};

export default useProvider;
