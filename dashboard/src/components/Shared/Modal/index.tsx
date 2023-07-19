import { useEffect, useState } from 'react';
import styles from './Modal.module.css'
import Button from '../Button';

interface Props {
 isOpen: boolean;
 closeModal: () => void;
 children: React.ReactNode;
 footer?: React.ReactNode;
 closeButton?: boolean;
}

const Modal = ({isOpen, closeModal, children, footer, closeButton}: Props) => {
 const [shouldRender, setShouldRender] = useState(isOpen);
 
 useEffect(() => {
  if (isOpen) {
    setShouldRender(true);
    // document.body.style.overflow = 'hidden';
  }
}, [isOpen]);

  return (
   <div>
    {isOpen && (
     
   <div className={`${styles.modal} ${isOpen? styles.open : styles.close}`}>
   <div className={styles.modal_content}>
     <div className={styles.header}>
      <h4>Aviso</h4>
     </div>
     {children}
     <div className={styles.footer}>
      {footer}
      {closeButton && (
      <Button variant='third' onClick={closeModal} >Cancelar</Button>         
      )}
     </div>
   </div>
 </div>
    )}
 
 </div>
 
  )
}

export default Modal
