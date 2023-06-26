/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import { useState, useEffect } from 'react';
import AuthForms from '../AuthForms/AuthForms';
import cn from 'classnames';
import useInputValidation from '../../hooks/useInputValidation';
import viewPassword from '../../assets/icons/view.svg';
import hidePassword from '../../assets/icons/hide.svg';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignUpForm.module.scss';

const SignUpForm = () => {
  const [passwordsValue, setPasswordsValue] = useState({
    firstPassword: '',
    secondPassword: '',
  });

  const [showPassword, setShowPassword] = useState('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);
  const [clickShowConfirmPassword, setClickShowConfirmPassword] =
    useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setClickShowConfirmPassword(!clickShowConfirmPassword);
  };

  useEffect(() => {
    clickShowPassword ? setShowPassword('text') : setShowPassword('password');
    clickShowConfirmPassword
      ? setShowConfirmPassword('text')
      : setShowConfirmPassword('password');
  }, [clickShowPassword, clickShowConfirmPassword]);
  const signup = useInputValidation({
    isEmptyInputCheck: true,
    password: passwordsValue.firstPassword,
    confirmPassword: passwordsValue.secondPassword,
    minLength: 6,
    maxLength: 8,
  });

  const confirmPassword = useInputValidation({
    isEmptyInputCheck: true,
  });

  const setFirst = (event) => {
    setPasswordsValue({ ...passwordsValue, firstPassword: event.target.value });
  };
  const setSecond = (event) => {
    setPasswordsValue({
      ...passwordsValue,
      secondPassword: event.target.value,
    });
  };

  return (
    <AuthForms>
      <div className={style.inputs}>
        {' '}
        <input
          className={style.input}
          name="email"
          type="text"
          placeholder="E-mail"
        />
      </div>

      <div
        onBlur={(e) => signup.onBlur(e)}
        onFocus={(e) => signup.onFocus(e)}
        className={cn(styleLocal.input__password, style.inputs)}
      >
        <input
          className={style.input}
          name="password"
          type={showPassword}
          placeholder="Пароль"
          value={signup.password}
          onChange={setFirst}
        />

        <button
          onBlur={(e) => signup.onBlur(e)}
          onFocus={(e) => signup.onFocus(e)}
          onClick={(e) => handleShowPassword(e)}
          className={
            !signup.isFocus ? styleLocal.unfocused : styleLocal.focused
          }
        >
          {clickShowPassword ? (
            <img src={hidePassword} alt="" />
          ) : (
            <img src={viewPassword} alt="" />
          )}
        </button>
      </div>

      <div
        onBlur={(e) => confirmPassword.onBlur(e)}
        onFocus={(e) => confirmPassword.onFocus(e)}
        className={cn(styleLocal.input__password, style.inputs)}
      >
        <input
          className={style.input}
          name="confirmPassword"
          type={showConfirmPassword}
          placeholder="Еще раз пароль"
          value={signup.confirmPassword}
          onChange={setSecond}
        />

        <button
          onBlur={(e) => confirmPassword.onBlur(e)}
          onFocus={(e) => confirmPassword.onFocus(e)}
          onClick={(e) => handleShowConfirmPassword(e)}
          className={
            !confirmPassword.isFocus ? styleLocal.unfocused : styleLocal.focused
          }
        >
          {clickShowConfirmPassword ? (
            <img src={hidePassword} alt="" />
          ) : (
            <img src={viewPassword} alt="" />
          )}
        </button>
      </div>

      <div className={style.inputs}>
        {' '}
        <input placeholder="Кодовое слово" />
      </div>
      <button
        disabled={!signup.isMatch}
        action={undefined}
        className={
          !signup.isMatch ? cn(style.button) : style.button
        }
        type="submit"
      >
        Зарегистрироваться
      </button>
    </AuthForms>
  );
};

export default SignUpForm;
