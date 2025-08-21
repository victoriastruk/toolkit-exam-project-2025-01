import { Link } from 'react-router-dom';
import styles from './HeaderTop.module.sass';

export default function GuestMenu() {
  return (
    <>
      <Link to="/login" className={styles.link}>
        <span>LOGIN</span>
      </Link>
      <Link to="/registration" className={styles.link}>
        <span>SIGN UP</span>
      </Link>
    </>
  );
}
