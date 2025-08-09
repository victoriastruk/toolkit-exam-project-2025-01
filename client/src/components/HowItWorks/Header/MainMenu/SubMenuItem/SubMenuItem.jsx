import styles from './SubMenuItem.module.sass';

const SubMenuItem = ({ href, icon, title, description }) => {
  return (
    <a className={styles.subMenuLink} href={href}>
      {icon && (
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={icon} alt={title} />
        </div>
      )}
      <div className={styles.linkDetails}>
        <div className={styles.title}>
          {title}
          <img
            className={styles.arrow}
            src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
            alt="arrow"
          />
        </div>
        <p className={styles.text}>{description}</p>
      </div>
    </a>
  );
};

export default SubMenuItem;
