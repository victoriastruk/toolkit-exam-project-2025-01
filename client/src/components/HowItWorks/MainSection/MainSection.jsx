import styles from './MainSection.module.sass';

const MainSection = () => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.left}>
        <h4 className={styles.badge}>World's #1 Naming Platform</h4>
        <h1 className={styles.title}>How Does Atom Work?</h1>
        <p className={styles.description}>
          Atom helps you come up with a great name for your business by
          combining the power of crowdsourcing with sophisticated technology and
          Agency-level validation services.
        </p>
      </div>
      <div className={styles.right}>
        <div className={styles.videoBox}>
          <iframe
            className={styles.video}
            src="https://iframe.mediadelivery.net/embed/239474/327efcdd-b1a2-4891-b274-974787ae8362?autoplay=false&amp;loop=false&amp;muted=false&amp;preload=true&amp;responsive=true"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowfullscreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
