import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h3>Oh no!</h3>
      <p>This page you are looking for does not exists</p>
      <span>Report this page</span>
      
      <p>Go back</p>
      <div className={styles.buttons}>
        <Link to='/'>Boards</Link>
        <Link to='/'>Ventas</Link>
        <Link to='/'>Gastos</Link>
        <Link to='/'>Contactos</Link>
      </div>
    </div>
  )
}

export default NotFound
