/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthFormGlobalStore as formStore } from '../../stores';
import AuthForms from '../AuthForms/AuthForms';
import FormButton from '../FormButton/FormButton';
import { EmailInput, PasswordInput } from '../AuthFormsInputs/AuthFormsInputs';
import AuthFormStore from '../../stores/auth-form-store';
import * as api from '../../utils/Auth';
import {
  composeEmptyErrorMessage,
  passwordValidErrorMessage,
  emailValidErrorMessage,
} from '../../constants/errorMessages';
import { emailRegExp, passwordRegExp } from '../../constants/regExp';
import useInputValidation from '../../hooks/useInputValidation';
import styles from '../AuthForms/AuthForms.module.scss';
import { setCookie } from '../../utils/cookie';

/**
 * Создаёт незвисимые инстансы стора для инпутов
 */
const emailStore = new AuthFormStore();
const passwordStore = new AuthFormStore();

const SignInForm = observer(() => {
  /**
   * Присваивает переменные инстансам для корректной
   * работы с зависимостями useEffect
   */
  const email = emailStore;
  const password = passwordStore;

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Set show
  const [showPassword, setShowPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);
  const [serverError, setServerError] = useState(loginErrorMessage);

  /**
   * Присваивает переменную глобальному состоянию
   * открытия/закрытия формы для корректной
   * работы с зависимостями useEffect
   */
  const isOpenModal = formStore.openAuthForm;

  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  const passwordInput = useInputValidation({
    value: password.value,
    regExp: passwordRegExp,
    length: { from: 8, to: 30 },
  });

  const emailInput = useInputValidation({
    value: email.value,
    regExp: emailRegExp,
  });

  useEffect(() => {
    passwordInput.isValid && emailInput.isValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [emailInput.isValid, passwordInput.isValid]);

  // Change show passwords
  useEffect(() => {
    clickShowPassword ? setShowPassword('text') : setShowPassword('password');
  }, [clickShowPassword]);

  // Set errors
  useEffect(() => {
    passwordInput.isDirty && passwordInput.isEmpty
      ? password.setError({ emptyMessage: composeEmptyErrorMessage('Пароль') })
      : password.setError({ emptyMessage: '' });

    emailInput.isDirty && emailInput.isEmpty
      ? email.setError({ emptyMessage: composeEmptyErrorMessage('E-mail') })
      : email.setError({ emptyMessage: '' });

    email.value || password.value
      ? setServerError('')
      : setServerError(loginErrorMessage);
  }, [
    emailInput.isDirty,
    passwordInput.isDirty,
    passwordInput.isEmpty,
    emailInput.isEmpty,
    loginErrorMessage,
    password,
    email,
  ]);

  const resetForm = () => {
    email.setValue('');
    password.setValue('');

    /**
     * Отменяют стандартное поведение
     * появления ошибок при потере фокуса
     * пустого инпута после сброса значения инпутов
     */
    passwordInput.setDirty(false);
    passwordInput.setFocus(false);
    emailInput.setDirty(false);
    emailInput.setFocus(false);

    setIsFormValid(false);
  };

  useEffect(() => {
    isOpenModal && resetForm();
  }, [isOpenModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .postApiAutorisation(email.value, password.value)
      .then((data) => {
        /* const refresh = data.refresh; */
        localStorage.setItem('refresh', data.refresh);
        setCookie('access', data.access);
        formStore.setLoggedIn(true);
        formStore.setOpenAuthForm(false);
      })
      .catch((err) => {
        console.error(err, '--authorize,err');
        formStore.setLoggedIn(false);
        setLoginErrorMessage(err.message);
      });
    setIsFormValid(false);
    resetForm();
  };

  const handleClearButton = (e, callback) => {
    e.preventDefault();
    callback();
    serverError && setServerError('');
  };

  return (
    <>
      <AuthForms onSubmit={handleSubmit}>
        <EmailInput
          value={email.value}
          onBlur={emailInput.onBlur}
          onFocus={emailInput.onFocus}
          onChange={(e) => email.setValue(e.target.value)}
          isDirty={emailInput.isDirty}
          isEmpty={emailInput.isEmpty}
          isFocus={emailInput.isFocus}
          isValid={emailInput.isValid}
          emptyError={email.emptyMessage}
          validError={emailValidErrorMessage}
          onClickClearButton={(e) =>
            handleClearButton(e, () => email.setValue(''))
          }
          placeholder="E-mail"
          label="E-mail"
        />

        <PasswordInput
          value={password.value}
          onBlur={passwordInput.onBlur}
          onFocus={passwordInput.onFocus}
          isFocus={passwordInput.isFocus}
          isDirty={passwordInput.isDirty}
          isEmpty={passwordInput.isEmpty}
          onChange={(e) => password.setValue(e.target.value)}
          validError={passwordValidErrorMessage}
          isValid={passwordInput.isValid}
          emptyError={password.emptyMessage}
          showPassword={showPassword}
          onClickShowButton={(e) => handleShowPassword(e)}
          onClickClearButton={(e) =>
            handleClearButton(e, () => password.setValue(''))
          }
          clickShowPassword={clickShowPassword}
          placeholder="Пароль"
          label="Пароль"
        />

        {serverError && (
          <span className={styles.loginErrorMessage}>{serverError}</span>
        )}

        <FormButton disabled={!isFormValid}>Войти</FormButton>
        <span
          onClick={() => formStore.setShowRecoveryPasswordForm(true)}
          className={styles.link}
          type="button"
        >
          Забыли пароль?
        </span>
      </AuthForms>
    </>
  );
});

export default SignInForm;
