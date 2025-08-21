import Logo from '../../Logo';
import MenuItem from './MenuItem';
import menuData from './menu.json';
import styles from './HeaderNavigation.module.sass';
import CONSTANTS from '../../../constants';

const HeaderNavigation = ({ data, startContests }) => {
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
  
        {data && data.role !== CONSTANTS.CREATOR && (
          <div className={styles.startContestBtn} onClick={startContests}>
            START CONTEST
          </div>
        )}
      </div>
    </div>
      </div>
  );
};

export default HeaderNavigation;
