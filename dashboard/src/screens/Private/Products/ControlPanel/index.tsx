import Button from '@/components/Shared/Button'
import styles from './ControlPanel.module.css'
import { ExternalLink, Settings, TrendingUp } from 'react-feather'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppStore } from '@/redux/store'
import { PrivateRoutes } from '@/constant-definitions'
import { DivisaFormater } from '@/utilities/divisa-formater'

const ControlPanel = () => {
  const { products} = useSelector((state: AppStore) => state.products);
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
       <h2 className={styles.title}>Panel de control</h2>
       <div>
       <Button variant='third' > <Settings size={14} /></Button>
        <Button variant='third' > <ExternalLink size={16} /> Ver catalogo</Button>
       </div>
      </div>
      
      <div className={styles.box}>
       <div className={styles.box_header}>
       <h3>Productos</h3>
       <Link to={PrivateRoutes.PRODUCTS}>Ir a productos</Link>        
       </div>
       
       <div className={styles.boxes}>
        <div>
         <h4>Unidades de producto</h4>
         <p>{products.reduce((a:any, c:any) => a + Number(c.stock[0].amount), 0)}</p>
        </div>
        
        <div>
         <h4>Valor del stock</h4>
         <p>{DivisaFormater({value:products.reduce((a:any, c:any) => a + Number(c.total) * Number(c.stock[0].amount), 0)})}</p>
        </div>
        <div>
         <h4>Costo medio</h4>
         <p>{DivisaFormater({value:products.reduce((a:any, c:any) => a + Number(c.cost) * Number(c.stock[0].amount), 0)})}</p>
        </div>
       </div>
      </div>
      <div className={styles.box}>
       <div className={styles.box_header}>
       <h3>Pedidos</h3>
       <Link to='/'>Ir a pedidos</Link>        
       </div>
      </div>
      <div className={styles.box}>
       <div className={styles.box_header}>
       <h3>Operaciones</h3>
       <Link to={PrivateRoutes.PRODUCTS}>Ir a productos</Link>        
       </div>
      </div>
      <div className={styles.box}>
       <div className={styles.box_header}>
       <h3>Almacenes</h3>
       <Link to='/'>Gestionar</Link>        
       </div>
      </div>
      <div className={styles.box}>
       <div className={styles.box_header}>
       <h3>Propiedades del producto</h3>
       <Link to='/'>Ir a ajustes</Link>        
       </div>
      </div>
    </div>
  )
}

export default ControlPanel
