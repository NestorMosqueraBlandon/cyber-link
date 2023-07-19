import Button from '@/components/Shared/Button'
import styles from './Empty.module.css'

interface Props {
 title: string;
 copy: string;
 image: string;
}

const Empty = ({title, copy, image}: Props) => {
  return (
   <div className={styles.container_empty}>
   <img src={image} alt={title} />
   <h2>{title}s</h2>
   <p>{copy}</p>
   <div className={styles.options}>
    <Button>Añade tu primer {title.toLowerCase()}</Button>
    <Button variant='third'>Importar {title}s</Button>
   </div>
  </div>
  )
}

export default Empty
