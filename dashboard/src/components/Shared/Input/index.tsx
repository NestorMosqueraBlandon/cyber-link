import { ReactNode } from 'react'
import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  icon?: ReactNode
  className?: string
}

const Input = ({icon, className, ...rest}: InputProps) => {
  return (
    <div className={styles.input}>
      {icon && icon }
      <input {...rest} className={`${styles.input_element} ${className == 'none' && styles.input_none}`}  />
    </div>
  )
}

export default Input