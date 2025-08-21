import CONSTANTS from '../../../../../constants';
import styles from './PromoCard.module.sass';

const PromoCard = ({
  image,
  isImg,
  title,
  description,
  backgroundImage,
  mobile,
}) => {
  return (
    <a
      href="#"
      className={styles.getStarted}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {!mobile && (
        <div className={styles.imageWrapper}>
          <img className={styles.image} alt="promo" src={image} />
        </div>
      )}

      <h4 className={styles.title}>
        {isImg && (
          <img
            alt="Search Icon"
            src={`${CONSTANTS.STATIC_IMAGES_PATH}search.svg`}
          />
        )}
        {title}
        <img
          className={styles.arrow}
          alt="arrow"
          src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow_right_black.svg`}
        />
      </h4>
      <p className={styles.description}>{description}</p>
    </a>
  );
};

export default PromoCard;
