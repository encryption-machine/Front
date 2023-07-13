import React from 'react';
import styles from './AppButton.module.scss';

export const AppButton = ({ type, action, children, isButtonDisabled }) => {
  const buttonClass =
    type === 'secondary'
      ? `${styles.appButton__secondary} ${styles.appButton}`
      : type === 'outlined'
      ? `${styles.appButton__outlined} ${styles.appButton}`
      : styles.appButton;

  return (
    <button
      disabled={isButtonDisabled}
      onClick={action}
      className={buttonClass}
    >
      {children}
    </button>
  );
};
