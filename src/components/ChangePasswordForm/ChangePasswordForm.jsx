import React from 'react';
import AuthForms from '../AuthForms/AuthForms';
import styles from './ChangePasswordForm.module.scss';

const Container = ({ children }) => {
  return (
    <AuthForms>
      <h2 className={styles.title}>Восстановление пароля</h2>
      {children}
    </AuthForms>
  );
};

const Email = ({ children }) => {
  return <>{children}</>;
};

const Answer = ({ children }) => {
  return <>{children}</>;
};

const NewPassword = ({ children }) => {
  return <>{children}</>;
};

let container = Container;
let answer = Answer;
let email = Email;
let newPassword = NewPassword;

export let ChangePasswordForm = Object.assign({
  answer,
  email,
  newPassword,
  container,
});
