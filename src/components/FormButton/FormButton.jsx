import React from 'react';
import cn from 'classnames';
import { Button } from '../Button/Button';
import styles from './FormButton.module.scss';

const FormButton = ({ onClick, children, disabled }) => {
  return (
    <Button
      type={'submit'}
      disabled={disabled}
      onClick={onClick}
      className={cn(styles.button, styles.button__wrap)}
    >
      {children}
    </Button>
  );
};

export default FormButton;
