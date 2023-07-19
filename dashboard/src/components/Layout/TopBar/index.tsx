import { Link } from 'react-router-dom'
import styles from './TopBar.module.css'
import { useEffect } from 'react';
import { getAdmin } from '@/redux/states/users';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';

const TobBar = () => {
  const {user: auth} = useSelector((state: AppStore) => state.auth);
  const {user} = useSelector((state: AppStore) => state.users);
    
  const dispatch = useDispatch();

  const trialEndDate = new Date(user.trial_end_date);
const trialStartDate = new Date();

const differenceInMs = trialEndDate.getTime() - trialStartDate.getTime();
const differenceInDays = Math.floor(differenceInMs / (1000 * 3600 * 24));

  useEffect(() => {
      dispatch(getAdmin(auth.token) as any)
  }, [dispatch]);
  
  
  return (
    <div className={styles.container}>
      <p>Te quedan {differenceInDays} {differenceInDays > 1? "días" : 'día' } de prueba. <Link to='/'>Actualice ahora y obtenga su 50% de descuento</Link> </p>
    </div>
  )
}

export default TobBar
