import { Field } from 'formik';
import styles from './ButtonGroup.module.sass';

const ButtonGroup = ({ name, question, options }) => {
  return (
    <div className={styles.groupWrapper}>
      <p className={styles.question}>{question}</p>
      <div className={styles.groupValues}>
        {options.map((opt, idx) => (
          <label key={idx}>
            <Field
              type="radio"
              name={name}
              value={opt.value}
              className={styles.hiddenInput}
            />
            <div className={styles.briefBox}>
              <strong>{opt.label}</strong>
              <p>{opt.description}</p>
              {opt.recommended && (
                <div className={styles.recommended}>Recommended</div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
