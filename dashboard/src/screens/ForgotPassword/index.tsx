import { Link } from 'react-router-dom'
import styles from './Accounts.module.css'
import { ArrowLeft, Plus } from 'react-feather'
import Field from '@/components/Shared/Field'
import Input from '@/components/Shared/Input'
import Button from '@/components/Shared/Button'

const user = {
 name: "Prooving",
 account: "Nevobit"
}

const ForgotPassword = () => {
  return (
    <div>
      <div className={styles.header}>
       <img src="/images/logos/logo.png" alt="" />
       <div>
          <span>{user.name.charAt(0)}</span>
          <div>
            <h3>{user.name}</h3>
          </div>
        </div>
      </div>
      <form className={styles.form}>
      <h2 className={styles.title}>Recuperar contraseña</h2>
      <p>Introduzca abajo su email y le enviaremos instrucciones para cambiar la contraseña.</p>
      <Field label='Email'>
        <Input placeholder='Introduce tu correo electronico' />
      </Field>
      <Link to='/'><ArrowLeft size={16} strokeWidth={2.5} />Volver a iniciar sesión</Link>
      <Button>Enviar</Button>
     </form>
    </div>
  )
}

export default ForgotPassword
