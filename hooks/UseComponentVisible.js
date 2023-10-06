import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(false); 
    const componentRef = useRef(null); // Crea una referencia para el componente


    useEffect(() => {
        // Función para cerrar el componente cuando se hace clic fuera de él
        const handleClickOutside = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                setIsComponentVisible(false);
            }
        }

        // Agregar event listener cuando el componente se monta
        document.addEventListener("mousedown", handleClickOutside);

        // Remover event listener cuando el componente se desmonta
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);


    return { componentRef, isComponentVisible, setIsComponentVisible };
}