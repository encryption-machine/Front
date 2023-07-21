import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FormGlobalStore as formStore } from '../../stores';
import AuthForms from '../AuthForms/AuthForms';
import FormButton from '../FormButton/FormButton';
import { EmailInput, PasswordInput } from '../AuthFormsInputs/AuthFormsInputs';
import FormValuesStore from '../../stores/forms/values';
import {
  composeEmptyErrorMessage,
  passwordValidErrorMessage,
  emailValidErrorMessage,
} from '../../constants/errorMessages';
import useInputValidation from '../../hooks/useInputValidation';
import style from '../AuthForms/AuthForms.module.scss';

const SignInForm = observer(({ onLogin, textError }) => {
  const [passwordValue, setPasswordValue] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // errors
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [firstPasswordError, setFirstPasswordError] = useState('');
  

  // Set show
  const [showPassword, setShowPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);
  const [errorText, setErrorText] = useState(textError);

  // handlers
  const handleFirstPasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  const passwordInput = useInputValidation({
    checkInputIsEmpty: passwordValue,
    password: passwordValue,
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
      ? setFirstPasswordError(composeEmptyErrorMessage('Пароль'))
      : setFirstPasswordError('');
    emailInput.isDirty && emailInput.isEmpty
      ? setEmailEmptyError(composeEmptyErrorMessage('E-mail'))
      : setEmailEmptyError('');
    emailValue || passwordValue
      ? setErrorText('')
      : setErrorText(textError);
  }, [
    emailInput.isDirty,
    emailInput.isEmailValid,
    passwordInput.isDirty,
    passwordInput.isEmpty,
    emailInput.isEmpty,
    passwordInput.isPasswordInputValid,
    passwordInput.isMatch,
    emailValue,
    passwordValue,
    textError,
  ]);
  
  const resetForm = () => {
    email.setValue('');
    setPasswordValue('');
    setIsFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    /////////Авторизация//////
    if(!emailValue || !passwordValue) return;
    onLogin(emailValue, passwordValue);
    /////////////////////////

    resetForm();
    console.log('submit auth form');
  };

  const handleClearButton = (e, callback) => {
    e.preventDefault();
    callback();
  };

  return (
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
        emptyError={emailEmptyError}
        emailValidError={emailValidErrorMessage}
        onClickClearButton={(e) =>
          handleClearButton(e, () => email.setValue(''))
        }
        placeholder="E-mail"
        label="E-mail"
      />

      <PasswordInput
        value={passwordValue}
        onBlur={passwordInput.onBlur}
        onFocus={passwordInput.onFocus}
        isFocus={passwordInput.isFocus}
        isDirty={passwordInput.isDirty}
        isEmpty={passwordInput.isEmpty}
        onChange={handleFirstPasswordValue}
        passwordValidError={passwordValidErrorMessage}
        isPasswordInputValid={passwordInput.isPasswordInputValid}
        emptyError={firstPasswordError}
        showPassword={showPassword}
        onClickShowButton={(e) => handleShowPassword(e)}
        onClickClearButton={(e) =>
          handleClearButton(e, () => setPasswordValue(''))
        }
        clickShowPassword={clickShowPassword}
        placeholder="Пароль"
        label="Пароль"
      />
      
      {errorText && <span className={style.textError}>
      {errorText}
      </span>}

      <FormButton disabled={!isFormValid}>Войти</FormButton>
      <span
        onClick={() => formStore.setShowRecoveryPasswordForm(true)}
        className={style.link}
        type="button"
      >
        Забыли пароль?
      </span>
    </AuthForms>
  );
});

export default SignInForm;