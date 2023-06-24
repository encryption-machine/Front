/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import { useState, useEffect } from 'react';
import AuthForms from '../AuthForms/AuthForms';
//import cn from 'classnames';
import useInputValidation from '../../hooks/useInputValidation';
//import { usePasswordValidation } from '../../hooks/usePasswordValidation';
import { AppButton } from '../AppButton/AppButton';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignUpForm.module.scss';

const SignUpForm = () => {
  const [passwordsValue, setPasswordsValue] = useState({
    firstPassword: '',
    secondPassword: '',
  });
  //console.log(passwordsValue);

  //const email = useInputValidation(
  //  '',
  //  { isEmpty: true, minLength: 6, isEmail: true, typePlaceholder: 'email' },
  //  'Email'
  //);
  const password = useInputValidation({
    isEmptyInputCheck: true,
    password: passwordsValue.firstPassword,
    minLength: 6,
    maxLength: 8,
  });

  const confirmPassword = useInputValidation({
    isEmptyInputCheck: true,
    confirmPassword: passwordsValue.secondPassword,
    minLength: 6,
    maxLength: 8,
  });

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
    <AuthForms title={'Регистрация'}>
      {/*<input
        onBlur={(e) => email.onBlur(e)}
        className={style.input}
        name="email"
        type="text"
        placeholder="Email"
        value={email.value}
        onChange={(e) => email.onChange(e)}
      />
      {email.isDirty && email.isEmpty && (
        <span className={style.error}>{email.emptyErrorMessage}</span>
      )}
      {email.isDirty && email.isEmailError && !email.isEmpty && (
        <span className={style.error}>{email.emailErrorMessage}</span>
      )}*/}

      <input
        onBlur={(e) => password.onBlur(e)}
        onFocus={(e) => password.onFocus(e)}
        className={style.input}
        name="password"
        type="password"
        placeholder="Пароль"
        value={password.password}
        onChange={setFirst}
      />
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

      {password.isFocus && (
        <ul style={{ textAlign: 'start' }}>
          <span>Пароль должен содержать:</span>
          <li>
            От 6 до 8 символов:{' '}
            {password.isValidLength ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Цифры: {password.isNumber ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Заглавные буквы:{' '}
            {password.isUpperCase ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Строчные буквы:{' '}
            {password.isLowerCase ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Спец. символы:{' '}
            {password.isSpecialChar ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Match: {password.isMatch ? <span>True</span> : <span>False</span>}
          </li>
        </ul>
      )}

      <input
        onBlur={(e) => confirmPassword.onBlur(e)}
        className={style.input}
        name="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        value={confirmPassword.confirmPassword}
        onChange={setSecond}
      />
      {/*
      <input
        placeholder="test"
        //value={confirmPassword.test}
        onChange={(e) =>
          setPasswordsValue({
            ...passwordsValue,
            test: e.target.value,
          })
        }
      />*/}

      {confirmPassword.isDirty && confirmPassword.isEmpty && (
        <span className={style.error}>Поле не может быть пустым</span>
      )}
      {confirmPassword.isDirty && confirmPassword.minLengthError && (
        <span className={style.error}>Некорректная длина</span>
      )}
      {/*<AppButton
        isButtonDisabled={!formValid}
        action={undefined}
        //className={!formValid ? cn(style.disabled, style.button) : style.button}
        typeClass="secondary"
        type="submit"
      >
        Зарегистрироваться
      </AppButton>*/}
      <div className={styleLocal.confirm}>
        {' '}
        {/*<input
          type="checkbox"
          checked={checked}
          onChange={chengeCheckbox}
        />{' '}*/}
        {/*<span className={styleLocal.confirm__text}>
          {' '}
          Я даю согласие на обработку моих персональных данных{' '}
        </span>*/}
      </div>
    </AuthForms>
  );
};

export default SignUpForm;
