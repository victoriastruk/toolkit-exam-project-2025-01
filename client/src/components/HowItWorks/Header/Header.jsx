import Logo from '../../Logo';
import MainMenuDesktop from './MainMenu/MainMenuDesktop/MainMenuDesktop';
import RightMenu from './RightMenu/RightMenu';
import CONSTANTS from '../../../constants';

import styles from './Header.module.sass';

const Header = ({ showSearch, setShowSearch }) => {
  return (
    <div className={styles.headerInner}>
      <div className={styles.headerLeft}>
        <Logo
          className={styles.logo}
          src={`${CONSTANTS.STATIC_IMAGES_PATH}atom-logo.png`}
        />
      </div>

      <div className={styles.headerMid}>
        <MainMenuDesktop />
      </div>

      <div className={styles.headerRight}>
        <RightMenu showSearch={showSearch} setShowSearch={setShowSearch} />
      </div>
    </div>
  );
};

export default Header;
