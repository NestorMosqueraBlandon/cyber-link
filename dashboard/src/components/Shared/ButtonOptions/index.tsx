import { MoreVertical, UploadCloud } from 'react-feather'
import styles from './ButtonOptions.module.css'
import { useEffect, useRef, useState } from 'react';

const ButtonOptions = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado
 const menuRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
   // Agregar controlador de eventos para cerrar el menú cuando se hace clic fuera de él
   function handleOutsideClick(event: MouseEvent) {
     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
       setIsMenuOpen(false);
     }
   }

   // Agregar controlador de eventos al documento
   document.addEventListener("click", handleOutsideClick);

   // Limpiar el controlador de eventos cuando se desmonta el componente
   return () => {
     document.removeEventListener("click", handleOutsideClick);
   };
 }, [menuRef]);

 
 const handleButtonClick = () => {
   setIsMenuOpen(!isMenuOpen); // Cambiar el estado para abrir o cerrar el menú
 };

 return (
   <div className={styles.menu} ref={menuRef}>
     <button onClick={handleButtonClick}> <MoreVertical  size={18}/> </button>
     {isMenuOpen && (
       <ul className={styles.menuOptions}>
         <li><UploadCloud size={16} /> Importar contactos</li>
       </ul>
     )}
   </div>
 );
}

export default ButtonOptions
