import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './HeaderTop.module.sass';
import CONSTANTS from '../../../constants';

export default function UserMenu({ userData, onLogout}) {
   const badgeCount = useSelector((state) => state.events.badgeCount);
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
      
      <Link to="/events" className={styles.linkEvent}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}events.png`}
          className={styles.eventsIcon}
          alt="events"
        />
         {badgeCount > 0 && <span className={styles.bage}>{badgeCount}</span>}
       </Link>

        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
          className={styles.emailIcon}
          alt="email"
        />
   
    </>
  );
}
