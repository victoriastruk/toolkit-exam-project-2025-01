import React from 'react';
import styles from './NextButton.module.sass';

const NextButton = ({ submit, disabled }) => (
  <div
    onClick={() => !disabled && submit()}
    className={`${styles.buttonContainer} ${disabled ? styles.disabled : ''}`}
  >
    <span>Next</span>
  </div>
);

export default NextButton;
