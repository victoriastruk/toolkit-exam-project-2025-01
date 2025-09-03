import Logo from '../../Logo';
import MenuItem from './MenuItem';
import menuData from './menu.json';
import styles from './HeaderNavigation.module.sass';
import CONSTANTS from '../../../constants';

const HeaderNavigation = ({ data, startContests, viewOffers }) => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.container}>
      <Logo />
      <div className={styles.leftNav}>
       
          <ul className={styles.nav}>
            {menuData.map((menuItem) => (
              <MenuItem key={menuItem.title} item={menuItem} />
            ))}
          </ul>
  
        {data && data.role === CONSTANTS.CUSTOMER && (
          <div className={styles.startContestBtn} onClick={startContests}>
            START CONTEST
          </div>
        )}

         {data && data.role === CONSTANTS.MODERATOR && (
          <div className={styles.startContestBtn} onClick={viewOffers}>
            REVIEW OFFERS
          </div>
        )}
      </div>
    </div>
      </div>
  );
};

export default HeaderNavigation;
