import WayCard from './WayCard/WayCard';
import { cardData } from './WayCard/cardData';
import styles from './Ways.module.sass';

const Ways = () => {
  return (
    <div>
      <h4 className={styles.badge}>Our Services</h4>
      <h2 className={styles.title}>3 Ways To Use Atom</h2>
      <p className={styles.description}>
        Atom offers 3 ways to get you a perfect name for your business.
      </p>

      <div className={styles.card}>
        {cardData.map((card, index) => (
          <WayCard
            key={index}
            imgSrc={card.imgSrc}
            imgAlt={card.imgAlt}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default Ways;
