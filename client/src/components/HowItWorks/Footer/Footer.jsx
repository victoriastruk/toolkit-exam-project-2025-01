import { useState } from 'react';
import { services, tools, sellers, creatives, atom, legal } from './footerData';
import styles from './Footer.module.sass';

const Footer = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderLinks = (title, links, keyName) => (
    <div className={styles.linksItem}>
      <h4
        onClick={() => toggleSection(keyName)}
        className={styles.accordionHeader}
      >
        {title}
        <span
          className={openSections[keyName] ? styles.arrowUp : styles.arrowDown}
        ></span>
      </h4>
      <ul
        className={`${styles.accordionContent} ${
          openSections[keyName] ? styles.open : ''
        }`}
      >
        {links.map(({ title, href }, index) => (
          <li key={index}>
            <a href={href}>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <>
      <div className={styles.linksWrapper}>
        {renderLinks('Services', services, 'services')}
        {renderLinks('Tools', tools, 'tools')}
        <div className={styles.wraperLink}>
          {renderLinks('Sellers', sellers, 'sellers')}
          {renderLinks('Creatives', creatives, 'creatives')}
        </div>
        <div className={styles.wraperLink}>
          {renderLinks('Atom', atom, 'atom')}
          {renderLinks('Legal', legal, 'legal')}
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          <span>Copyright © 2025 Atom.com</span>
          <div className={styles.dot}></div>
          <a href="#">Consent Preferences</a>
        </div>
        <a href="#" className={styles.approved}>
          <div className={styles.trustPilot}>
            <strong>Excellent</strong>
            <div className={styles.stars}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className={styles.halfStar}></div>
            </div>
            <span>Trustpilot</span>
          </div>

          <div className={styles.ratings}>
            <strong>4.5/ 5</strong>
            <br />
            <span>based on 716 ratings</span>
          </div>
        </a>

        <ul className={styles.social}>
          <li>
            <a href="#">
              <img src="/staticImages/facebook.svg" alt="Facebook icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/staticImages/twitter.svg" alt="Twitter icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/staticImages/instagram.svg" alt="Instagram icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/staticImages/linkedin.svg" alt="LinkedIn icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/staticImages/youtube.svg" alt="Youtube icon" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
