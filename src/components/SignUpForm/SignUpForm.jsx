/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import { useState, useEffect } from 'react';
import AuthForms from '../AuthForms/AuthForms';
import cn from 'classnames';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignUpForm.module.scss';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(
    'Поле "Email" не может быть пустым'
  );
  const [passwordError, setPasswordError] = useState(
    'Поле "Пароль" не может быть пустым'
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    'Поле "Повторите пароль" не может быть пустым'
  );
  const [formValid, setFormValid] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!emailError && !passwordError && isConfirmPassword && checked) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailError, passwordError, isConfirmPassword, checked]);
  
  const chengeCheckbox = () => {
    setChecked(!checked);
 }

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

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (confirmPassword === password) {
      setConfirmPasswordError('Пароли не совпадают');
      setIsConfirmPassword(false)
      if (!e.target.value) {
        setConfirmPasswordError('Поле "Повторите пароль" не может быть пустым');
      }
    } else {
      setIsConfirmPassword(true)
      setConfirmPasswordError('');
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
    <AuthForms title={'Регистрация'}>
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
      <input
        onBlur={(e) => blurHandler(e)}
        className={style.input}
        name="confirm password"
        type="password"
        placeholder="Повторите пароль"
        value={confirmPassword}
        onChange={(e) => confirmPasswordHandler(e)}
      />

      {confirmPasswordDirty && confirmPasswordError && (
        <span className={style.error}>{confirmPasswordError}</span>
      )}
      <button disabled={!formValid} className={(!formValid ? cn(styleLocal.disabled, style.button) : style.button)} type="submit">
        Зарегистрироваться
      </button>
      <div className={styleLocal.confirm}>
        {' '}
        <input type="checkbox" checked={checked} onChange={chengeCheckbox} />{' '}
        <span className={styleLocal.confirm__text}>
          {' '}
          Я даю согласие на обработку моих персональных данных{' '}
        </span>
      </div>
    </AuthForms>
  );
};

export default SignUpForm;
