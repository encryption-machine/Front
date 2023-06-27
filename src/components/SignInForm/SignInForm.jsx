/* eslint-disable default-case */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import AuthForms from '../AuthForms/AuthForms';
import viewPassword from '../../assets/icons/view.svg';
import hidePassword from '../../assets/icons/hide.svg';
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

  const [showPassword, setShowPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  useEffect(() => {
    clickShowPassword ? setShowPassword('text') : setShowPassword('password');
  }, [clickShowPassword]);

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
      setEmailError(
        'Не допустимые символы. Допустимые символы: цифры, латинские буквы, «_», «-», «‎@» и «.»'
      );
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6 || e.target.value.length > 8) {
      setPasswordError(
        'Пароль должен содержать от 6 до 8 символов, включая, один цифровой и один не алфавитно цифровой символ'
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
    <AuthForms>
      <div
        className={
          emailDirty && emailError
            ? cn(style.inputs, style.inputs__hint)
            : style.inputs
        }
      >
        {' '}
        <input
          onBlur={(e) => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => emailHandler(e)}
        />
      </div>
      {emailDirty && emailError && (
        <span className={style.hintError}>{emailError}</span>
      )}

      <div
        className={
          passwordDirty && passwordError
            ? cn(styleLocal.input__password, style.inputs, style.inputs__hint)
            : cn(styleLocal.input__password, style.inputs)
        }
      >
        {' '}
        <input
          onBlur={(e) => blurHandler(e)}
          name="password"
          type={showPassword}
          placeholder="Пароль"
          value={password}
          onChange={(e) => passwordHandler(e)}
        />
        <button
          onBlur={(e) => blurHandler(e)}
          //onFocus={(e) => e.target.value}
          onClick={(e) => handleShowPassword(e)}
          //className={
          //  styleLocal.unfocused
          //}
        >
          {clickShowPassword ? (
            <img src={hidePassword} alt="" />
          ) : (
            <img src={viewPassword} alt="" />
          )}
        </button>
      </div>
      {passwordDirty && passwordError && (
        <span className={style.hintError}>{passwordError}</span>
      )}
      <button
        className={cn(style.button, style.button__wrap)}
        disabled={!formValid}
        type="submit"
      >
        Войти
      </button>
      <Link to="#" className={styleLocal.link}>
        Забыли пароль?
      </Link>
    </AuthForms>
  );
};

export default SignInForm;
