import styles from './PromoCard.module.sass';

const PromoCard = ({ image, isImg, title, description, backgroundImage }) => {
  return (
    <a
      href="#"
      className={styles.getStarted}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.image} alt="promo" src={image} />
      </div>
      <h4 className={styles.title}>
        {isImg && <img alt="Search Icon" src="/staticImages/search.svg" />}
        {title}
        <img
          className={styles.arrow}
          alt="arrow"
          src="https://img.atom.com/public/images/payments/arrow_right_black.svg"
        />
      </h4>
      <p className={styles.description}>{description}</p>
    </a>
  );
};

export default PromoCard;
