import { Link } from 'react-router-dom';
import MainMenu from './MainMenu/MainMenu';
import RightMenu from './RightMenu/RightMenu';

import styles from './Header.module.sass';

const Header = ({ showSearch, setShowSearch }) => {
  return (
    <div className={styles.headerInner}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.logo}>
          <img
            alt="Atom"
            src="https://img.atom.com/public/images/atom-logo.png"
          />
        </Link>
      </div>

      <div className={styles.headerMid}>
        <MainMenu />
      </div>

      <div className={styles.headerRight}>
        <RightMenu showSearch={showSearch} setShowSearch={setShowSearch} />
      </div>
    </div>
  );
};

export default Header;
