import styles from './WayCard.module.sass';

const WayCard = ({ imgSrc, imgAlt, title, description, buttonText }) => {
  return (
    <div className={styles.cardItem}>
      <div className={styles.info}>
        <img src={imgSrc} alt={imgAlt} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <button className={styles.btn}>
        {buttonText}
        <span className={styles.arrow}></span>
      </button>
    </div>
  );
};

export default WayCard;
