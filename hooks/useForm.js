import { useState } from "react";
import { save } from "../services/productService";

 const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // para poder agregar un loader mientras se guarda
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name != "category") {
      setForm({
        ...form,
        [name]: value,
      });
    } else {
      setForm({
        ...form,
        category: {
          id: e.target.value,
        },
      });
    }
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));


    if (Object.keys(errors).length === 0) {

      save(form).then((result) => {

        if (result.status === 202) {
          // router.push("/");
          alert("Los datos fueron guardados correctamente")
          setForm(initialForm);
        }
      });
      alert("enviando fomulario");
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
    handleBlur,
    handleSubmit,
  };
};

export default useForm;
