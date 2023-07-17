import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FormGlobalStore as formStore } from '../../stores';
import AuthForms from '../AuthForms/AuthForms';
import FormButton from '../FormButton/FormButton';
import { EmailInput, PasswordInput } from '../AuthFormsInputs/AuthFormsInputs';
import { composeEmptyErrorMessage, passwordValidErrorMessage, emailValidErrorMessage } from '../../constants/errorMessages';
import useInputValidation from '../../hooks/useInputValidation';
import style from '../AuthForms/AuthForms.module.scss';

// тест по отправке апи запроса для восстановления пароля
import * as apiPasswordRecovery from '../../utils/apiPasswordRecovery';



const SignInForm = observer(() => {
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);


  // тест по отправке апи запроса для восстановления пароля
  const [idUser, setIdUser] = useState('')
  const [answer, setAnswer] = useState('one')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('!One0987');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('!One0987');

  // errors
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [firstPasswordError, setFirstPasswordError] = useState('');

  // Set show
  const [showPassword, setShowPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);

  // handlers
  const handleFirstPasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleEmailValue = (e) => {
    setEmailValue(e.target.value);
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  const passwordInput = useInputValidation({
    checkInputIsEmpty: passwordValue,
    password: passwordValue,
    length: { min: 6, max: 8 },
  });

  const emailInput = useInputValidation({
    checkInputIsEmpty: emailValue,
    email: emailValue,
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
  }, [
    emailInput.isDirty,
    emailInput.isEmailValid,
    passwordInput.isDirty,
    passwordInput.isEmpty,
    emailInput.isEmpty,
    passwordInput.isPasswordInputValid,
    passwordInput.isMatch,
  ]);

  const resetForm = () => {
    setEmailValue('');
    setPasswordValue('');
    setIsFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // тест по отправке запросов на сервера по восстановлению пароля
    apiPasswordRecovery.sendEmail(emailValue)
      .then((res) => {
        if (res) {
          // ответ с сервера, который надо вставить в placeholder формы
          const question = res.question;
          const idUser = res.id;
          console.log('res', res)
          console.log('question', question)
          console.log('idUser', idUser)
          setIdUser(idUser)
          // return question
        } else {
          console.log('ERR 1')
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log('Пользователь с таким Email не найден')
        } else {
          console.log('ERR 2', err)
        }
      })

    apiPasswordRecovery.sendSecretQuestion(idUser, answer)
      .then((result) => {
        if (result) {
          // ответ с сервера, который надо вставить в placeholder формы
          console.log('result', result)
          const token = result.token
          setToken(token)
          console.log('token', token)
        } else {
          console.log('ERR 3')
        }
      })
      .catch((err) => {
        console.log('ERR 4', err)

      })

    apiPasswordRecovery.sendNewPassword(idUser, token, newPassword, newPasswordConfirm)
      .then((result) => {
        if (result) {
          // ответ с сервера, который надо вставить в placeholder формы
          console.log('!!!result', result)
        } else {
          console.log('!!!ERR 5')
        }
      })
      .catch((err) => {
        console.log('!!!ERR 6', err)

      })


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
        value={emailValue}
        onBlur={emailInput.onBlur}
        onFocus={emailInput.onFocus}
        onChange={handleEmailValue}
        isDirty={emailInput.isDirty}
        isEmpty={emailInput.isEmpty}
        isFocus={emailInput.isFocus}
        isEmailValid={emailInput.isEmailValid}
        emptyError={emailEmptyError}
        emailValidError={emailValidErrorMessage}
        onClickClearButton={(e) =>
          handleClearButton(e, () => setEmailValue(''))
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

      <FormButton disabled={!isFormValid}>Войти</FormButton>
      <span
        onClick={() => formStore.setShowChangePasswordForm(true)}
        className={style.link}
        type="button"
      >
        Забыли пароль?
      </span>
    </AuthForms>
  );
});

export default SignInForm;
