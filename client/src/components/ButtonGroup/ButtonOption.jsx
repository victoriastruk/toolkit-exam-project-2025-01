import { Field } from 'formik';
import styles from './ButtonGroup.module.sass';

const ButtonOption = ({ name, value, label, description, recommended }) => {
  return (
    <label>
      <Field
        type="radio"
        name={name}
        value={value}
        className={styles.hiddenInput}
      />
      <div className={styles.briefBox}>
        <strong>{label}</strong>
        <p>{description}</p>
        {recommended && <div className={styles.recommended}>Recommended</div>}
      </div>
    </label>
  );
};

export default ButtonOption;
