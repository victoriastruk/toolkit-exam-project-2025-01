import styles from './Steps.module.sass';

const Steps = () => {
  return (
    <>
      <img src="/staticImages/icon-27.svg" alt="SVG" className={styles.icon} />
      <h3 className={styles.title}>How Do Naming Contests Work?</h3>

      <ul className={styles.stepsList}>
        <li className={styles.stepItem}>
          <span className={styles.stepNumber}>Step 1</span>
          <p className={styles.textStart}>
            Fill out your Naming Brief and begin receiving name ideas in minutes
          </p>
        </li>

        <li className={styles.stepItem}>
          <span className={styles.stepNumber}>Step 2</span>
          <p className={styles.textStart}>
            Rate the submissions and provide feedback to creatives. Creatives
            submit even more names based on your feedback.
          </p>
        </li>

        <li className={styles.stepItem}>
          <span className={styles.stepNumber}>Step 3</span>
          <p className={styles.textStart}>
            Our team helps you test your favorite names with your target
            audience. We also assist with Trademark screening.
          </p>
        </li>

        <li className={styles.stepItem}>
          <span className={styles.stepNumber}>Step 4</span>
          <p className={styles.textStart}>
            Pick a Winner. The winner gets paid for their submission.
          </p>
        </li>
      </ul>
    </>
  );
};

export default Steps;
