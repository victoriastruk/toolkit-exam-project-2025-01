import React from 'react';
import styles from './BackButton.module.sass';

const BackButton = ({ submit, disabled }) => (
  <div
    onClick={() => !disabled && submit()}
    className={`${styles.buttonContainer} ${disabled ? styles.disabled : ''}`}
  >
    <span>Back</span>
  </div>
);

export default BackButton;
