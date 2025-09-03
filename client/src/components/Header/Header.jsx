import { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearUserStore, getUser } from '../../store/slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import HeaderTop from './HeaderTop/HeaderTop';
import HeaderNavigation from './HeaderNavigation/HeaderNavigation';
import styles from './Header.module.sass';

const Header = ({ data, isFetching, getUser, clearUserStore }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, [data, getUser]);

  const logOut = () => {
    localStorage.clear();
    clearUserStore();
    navigate('/login', { replace: true });
  };

  const startContests = () => {
    navigate('/startContest');
  };

  const viewOffers = () => {
    navigate('/offers'); 
  };

  if (isFetching) return null;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <HeaderTop userData={data} onLogout={logOut} />
      <HeaderNavigation data={data} startContests={startContests} viewOffers={viewOffers}/>
    </div>
  );
};

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = { getUser, clearUserStore };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
