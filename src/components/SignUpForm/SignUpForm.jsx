/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import { useState, useEffect } from 'react';
import AuthForms from '../AuthForms/AuthForms';
import cn from 'classnames';
import useInputValidation from '../../hooks/useInputValidation';
//import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { AppButton } from '../AppButton/AppButton';
import viewPassword from '../../assets/icons/view.svg';
import hidePassword from '../../assets/icons/hide.svg';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignUpForm.module.scss';

const SignUpForm = () => {
  const [passwordsValue, setPasswordsValue] = useState({
    firstPassword: '',
    secondPassword: '',
  });

  //const sumb = '!@#$%^&*()_+-=]{};\':"\\|,.<>?~';

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

  //const email = useInputValidation(
  //  '',
  //  { isEmpty: true, minLength: 6, isEmail: true, typePlaceholder: 'email' },
  //  'Email'
  //);
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

  //console.log(password.password);
  //console.log(password.confirmPassword);
  //console.log(confirmPassword.password);
  //console.log(confirmPassword.confirmPassword);

  //const [formValid, setFormValid] = useState(false);
  //const [checked, setChecked] = useState(false);

  //const chengeCheckbox = () => {
  //  setChecked(!checked);
  //};

  //useEffect(() => {
  //  if (
  //    !email.isInputValid ||
  //    !password.isInputValid ||
  //    password.value !== confirmPassword.value ||
  //    !checked
  //  ) {
  //    setFormValid(false);
  //  } else {
  //    setFormValid(true);
  //  }
  //}, [
  //  checked,
  //  confirmPassword.value,
  //  email.isInputValid,
  //  password.inputValid,
  //  password.isInputValid,
  //  password.value,
  //]);

  //console.log(passwordsValue);
  //console.log(`f ${password.firstPassword}`);
  //console.log(`s ${confirmPassword.secondPassword}`);

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
          //onBlur={(e) => email.onBlur(e)}
          className={style.input}
          name="email"
          type="text"
          placeholder="E-mail"
          //value={email.value}
          //onChange={(e) => email.onChange(e)}
        />
      </div>
      {/*{email.isDirty && email.isEmpty && (
        <span className={style.error}>{email.emptyErrorMessage}</span>
      )}
      {email.isDirty && email.isEmailError && !email.isEmpty && (
        <span className={style.error}>{email.emailErrorMessage}</span>
      )}*/}

      <div
        onBlur={(e) => signup.onBlur(e)}
        onFocus={(e) => signup.onFocus(e)}
        className={cn(styleLocal.input__password, style.inputs)}
      >
        <input
          //onBlur={(e) => signup.onBlur(e)}
          //onFocus={(e) => signup.onFocus(e)}
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
      {/*<span>{password.password}</span>
      {password.isDirty && password.isEmpty && (
        <span className={style.error}>{password.emptyErrorMessage}</span>
      )}
      {password.isDirty && password.minLengthError && !password.isEmpty && (
        <span className={style.error}>{password.minLengthErrorMessage}</span>
      )}
      {password.isDirty && password.isMaxLengthError && (
        <span className={style.error}>{password.maxLengthErrorMessage}</span>
      )}*/}

      {/*{signup.isFocus && (*/}
      {/*<div
        className={signup.isFocus ? styleLocal.slideUp : styleLocal.slideDown}
      >
        <span style={{ textAlign: 'start' }}>Пароль должен содержать:</span>
        <ul style={{ textAlign: 'start', margin: '0' }}>
          <li
            className={signup.isValidLength ? styleLocal.green : styleLocal.red}
          >
            <span>От 6 до 8 символов</span>
          </li>
          <li className={signup.isNumber ? styleLocal.green : styleLocal.red}>
            <span>Цифры</span>
          </li>
          <li
            className={signup.isUpperCase ? styleLocal.green : styleLocal.red}
          >
            <span>Заглавные буквы</span>
          </li>
          <li
            className={signup.isLowerCase ? styleLocal.green : styleLocal.red}
          >
            <span>Строчные буквы</span>
          </li>
          <li
            className={signup.isSpecialChar ? styleLocal.green : styleLocal.red}
          >
            <span>Символы: {sumb}</span>
          </li>

        </ul>
      </div>*/}
      {/*)}*/}

      <div
        onBlur={(e) => confirmPassword.onBlur(e)}
        onFocus={(e) => confirmPassword.onFocus(e)}
        className={cn(styleLocal.input__password, style.inputs)}
      >
        <input
          //disabled={!signup.isPasswordInputValid}
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

      {/*{confirmPassword.isDirty && confirmPassword.isEmpty && (
        <span className={style.error}>Поле не может быть пустым</span>
      )}
      {confirmPassword.isDirty && confirmPassword.minLengthError && (
        <span className={style.error}>Некорректная длина</span>
      )}*/}
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
      {/*<div className={styleLocal.confirm}>
        {' '}
        <input
          type="checkbox"
          checked={checked}
          onChange={chengeCheckbox}
        />{' '}
        <span className={styleLocal.confirm__text}>
          {' '}
          Я даю согласие на обработку моих персональных данных{' '}
        </span>
      </div>*/}
    </AuthForms>
  );
};

export default SignUpForm;
