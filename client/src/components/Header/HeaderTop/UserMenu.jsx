import { Link } from 'react-router-dom';
import styles from './HeaderTop.module.sass';
import CONSTANTS from '../../../constants';

export default function UserMenu({ userData, onLogout }) {
  return (
    <>
      <div className={styles.userInfo}>
        <img
          className={styles.avatar}
          src={
            userData.avatar === 'anon.png'
              ? CONSTANTS.ANONYM_IMAGE_PATH
              : `${CONSTANTS.publicURL}${userData.avatar}`
          }
          alt="user"
        />
        <span>{`Hi, ${userData.displayName}`}</span>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
        <ul>
          <li>
            <Link to="/dashboard">
              <span>View Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/account">
              <span>My Account</span>
            </Link>
          </li>
          <li>
            <Link to="http://www.google.com">
              <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link to="http://www.google.com">
              <span>Affiliate Dashboard</span>
            </Link>
          </li>
          <li>
            <span onClick={onLogout}>Logout</span>
          </li>
        </ul>
      </div>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
        className={styles.emailIcon}
        alt="email"
      />
    </>
  );
}
