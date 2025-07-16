import CONSTANTS from '../../../constants';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';
import styles from './HeaderTop.module.sass';

const HeaderTop = ({ userData, onLogout }) => {
  return (
    <div className={styles.loginSignnUpHeaders}>
      <div className={styles.container}>
      <div className={styles.numberContainer}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
        <a className={styles.phoneNumber} href="tel:8773553585">
         <span>(877) 355-3585</span>
        </a>
      </div>
      <div className={styles.userButtonsContainer}>
        {userData ? (
          <UserMenu userData={userData} onLogout={onLogout} />
        ) : (
          <GuestMenu />
        )}
      </div>
      </div>
    </div>
  );
};

export default HeaderTop;
