import styles from './SaleBanner.module.sass';

const SaleBanner = () => {
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.leftDetails}>
        <h2 className={styles.title}>Black Friday in July Sale! </h2>
        <p className={`${styles.description} ${styles.desktop}`}>
          25% Off The Best Domains on The Web
        </p>
        <p className={`${styles.description} ${styles.mobile}`}>
          Get 25% Off Top Domains.
        </p>
        <a className={`${styles.showNow} ${styles.mobile}`} href="#">
          Shop Now
        </a>
      </div>

      <div className={styles.rightDetails}>
        <p className={styles.desktop}>Hurry! Sale Ends In:</p>
        <p className={styles.mobile}>Hurry, Ends In:</p>
        <div className={styles.timer}>
          <div className={styles.day}>
            <h4>3</h4>
            <span>Days</span>
          </div>
          <div className={styles.day}>
            <h4>18</h4>
            <span>Hours</span>
          </div>
          <div className={styles.day}>
            <h4>16</h4>
            <span>Minutes</span>
          </div>
        </div>
      </div>
      <a className={styles.showNow} href="#">
        Shop Now
      </a>
    </div>
  );
};

export default SaleBanner;
