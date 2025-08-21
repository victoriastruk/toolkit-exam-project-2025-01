import { useState, useEffect } from "react";
import MainMenuMobile from "../MainMenu/MainMenuMobile/MainMenuMobile";
import styles from "./RightMenu.module.sass";

const RightMenu = ({ showSearch, setShowSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <>
      <ul className={styles.icons}>
        <li
          className={styles.searchIcon}
          onClick={() => setShowSearch(!showSearch)}
        ></li>
        <li>
          <div className={styles.menuUser}>
            <div className={styles.userIcon}></div>
            <ul className={styles.dropMenuUser}>
              <li className={styles.menuItem}>
                <a href="#">
                  <div className={styles.user}></div>
                  <span>Login</span>
                </a>
              </li>
              <li className={styles.menuItem}>
                <a href="#">
                  <div className={styles.user}></div>
                  <span>Signup</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.menuTelephone}>
            <div className={styles.phoneIcon}></div>
            <ul className={styles.dropMenuTelephone}>
              <li className={styles.menuItem}>
                <a href="tel:1-877-355-3585">
                  <div className={styles.phone}></div>
                  <span>(877) 355-3585</span>
                </a>
              </li>

              <li className={styles.menuItem}>
                <a href="#">
                  <div className={styles.chatIcon}></div>
                  <span>Chat</span>
                </a>
              </li>

              <li className={styles.menuItem}>
                <a href="mailto:service@atom.com">
                  <div className={styles.emailIcon}></div>
                  <span>Email</span>
                </a>
              </li>

              <li className={styles.menuItem}>
                <a href="#">
                  <div className={styles.helpIcon}></div>
                  <span>Help Desk</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href="#">
            <div className={styles.heartIcon}></div>
          </a>
        </li>
        <li
          className={`${styles.menuMobileIcon} ${
            isMobileMenuOpen ? styles.open : ""
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </li>
      </ul>

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.show : ""
        }`}
      >
        <MainMenuMobile />
      </div>
    </>
  );
};

export default RightMenu;
