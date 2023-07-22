/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AuthFormGlobalStore as formStore } from '../../stores';
import AuthForms from '../AuthForms/AuthForms';
import FormButton from '../FormButton/FormButton';
import { EmailInput, PasswordInput } from '../AuthFormsInputs/AuthFormsInputs';
import AuthFormStore from '../../stores/auth-form-store';
import {
  composeEmptyErrorMessage,
  passwordValidErrorMessage,
  emailValidErrorMessage,
} from '../../constants/errorMessages';
import useInputValidation from '../../hooks/useInputValidation';
import style from '../AuthForms/AuthForms.module.scss';

const emailStore = new AuthFormStore();
const passwordStore = new AuthFormStore();

const SignInForm = observer(({ onLogin, loginErrorMessage }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const email = emailStore;
  const password = passwordStore;

  // Set show
  const [showPassword, setShowPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(loginErrorMessage);
  const isOpenModal = formStore.openAuthForm;

  // handlers
  const handleFirstPasswordValue = (e) => {
    password.setValue(e.target.value);
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  const passwordInput = useInputValidation({
    checkInputIsEmpty: password.value,
    password: password.value,
    length: { min: 8, max: 30 },
  });

  const emailInput = useInputValidation({
    checkInputIsEmpty: email.value,
    email: email.value,
  });

  useEffect(() => {
    passwordInput.isPasswordInputValid && emailInput.isEmailValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [emailInput.isEmailValid, passwordInput.isPasswordInputValid]);

  // Change show passwords
  useEffect(() => {
    clickShowPassword ? setShowPassword('text') : setShowPassword('password');
  }, [clickShowPassword]);

  // Set errors
  useEffect(() => {
    passwordInput.isDirty && passwordInput.isEmpty
      ? password.setError({ emptyMessage: composeEmptyErrorMessage('Пароль') })
      : password.setError({ emptyMessage: ' ' });
    emailInput.isDirty && emailInput.isEmpty
      ? email.setError({ emptyMessage: composeEmptyErrorMessage('E-mail') })
      : email.setError({ emptyMessage: ' ' });
    email.value || password.value
      ? setLoginError('')
      : setLoginError(loginErrorMessage);
  }, [
    emailInput.isDirty,
    emailInput.isEmailValid,
    passwordInput.isDirty,
    passwordInput.isEmpty,
    emailInput.isEmpty,
    loginErrorMessage,
    password,
    email,
  ]);

  //console.log(password.emptyMessage);

  const resetForm = () => {
    email.setValue('');
    password.setValue('');
    setIsFormValid(false);
  };

  useEffect(() => {
    isOpenModal && resetForm();
  }, [isOpenModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email.value, password.value);
    setIsFormValid(false);
    resetForm();
    console.log('submit auth form');
  };

  const handleClearButton = (e, callback) => {
    e.preventDefault();
    callback();
  };

  console.log(`loginErrorMessage: ${loginErrorMessage}`);

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
          isEmailValid={emailInput.isEmailValid}
          emptyError={email.emptyMessage}
          emailValidError={emailValidErrorMessage}
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
          onChange={handleFirstPasswordValue}
          passwordValidError={passwordValidErrorMessage}
          isPasswordInputValid={passwordInput.isPasswordInputValid}
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

        {loginError && (
          <span className={style.loginErrorMessage}>{loginError}</span>
        )}

        <FormButton disabled={!isFormValid}>Войти</FormButton>
        <span
          onClick={() => formStore.setShowRecoveryPasswordForm(true)}
          className={style.link}
          type="button"
        >
          Забыли пароль?
        </span>
      </AuthForms>
    </>
  );
});

export default SignInForm;
