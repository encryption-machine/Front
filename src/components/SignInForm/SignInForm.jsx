/* eslint-disable default-case */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthForms from '../AuthForms/AuthForms';
import { AppButton } from '../AppButton/AppButton';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignInForm.module.scss';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(
    'Поле "Email" не может быть пустым'
  );
  const [passwordError, setPasswordError] = useState(
    'Поле "Пароль" не может быть пустым'
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (!emailError && !passwordError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный Email');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6 || e.target.value.length > 8) {
      setPasswordError(
        'Пароль должен содержать от 6 до 8 символов, включая, как минимум, один цифровой и один не алфавитно цифровой символ'
      );
      if (!e.target.value) {
        setPasswordError('Поле "Пароль" не может быть пустым');
      }
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      case 'confirm password':
        setConfirmPasswordDirty(true);
        break;
    }
  };

  return (
    <AuthForms title={'Вход'}>
      <input
        onBlur={(e) => blurHandler(e)}
        className={style.input}
        name="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => emailHandler(e)}
      />
      {emailDirty && emailError && (
        <span className={style.error}>{emailError}</span>
      )}
      <input
        onBlur={(e) => blurHandler(e)}
        className={style.input}
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => passwordHandler(e)}
      />
      {passwordDirty && passwordError && (
        <span className={style.error}>{passwordError}</span>
      )}
      <AppButton disabled={!formValid} type="submit" typeClass="secondary">
        Вход
      </AppButton>
      <AppButton typeClass="secondary" type="link">
        <Link to="/signup" className={styleLocal.link}>
          Зарегистрироваться
        </Link>
      </AppButton>
    </AuthForms>
  );
};

export default SignInForm;
