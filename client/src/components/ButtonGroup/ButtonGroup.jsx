import ButtonOption from './ButtonOption';

import styles from './ButtonGroup.module.sass';

const ButtonGroup = ({ name, question, options }) => {
  return (
    <>
      <p className={styles.question}>{question}</p>
      <div className={styles.groupValues}>
        {options.map(({ value, label, description, recommended }) => (
          <ButtonOption
            key={value}
            name={name}
            value={value}
            label={label}
            description={description}
            recommended={recommended}
          />
        ))}
      </div>
    </>
  );
};

export default ButtonGroup;
