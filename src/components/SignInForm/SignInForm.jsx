import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from '../../store';
import AuthForms from '../AuthForms/AuthForms';
import FormButton from '../FormButton/FormButton';
import { EmailInput, PasswordInput } from '../AuthFormsInputs/AuthFormsInputs';
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
  const emailValidError = [
    {
      error_title: 'Недопустимые символы.',
      list_title: 'Допустимые символы:',
      item_1: 'цифры',
      item_2: 'латинские буквы',
      item_3: '«_», «-», «@» и «.»',
    },
  ];
  const passwordValidError = [
    {
      list_title: 'Пароль должен содержать:',
      item_1: 'от 6 до 8 символов',
      item_2: 'цифры',
      item_3: 'заглавные буквы',
      item_4: 'строчные буквы ',
      item_5: 'специальные символы',
    },
  ];
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
      ? setFirstPasswordError('Поле "Пароль" не может быть пустым')
      : setFirstPasswordError('');
    emailInput.isDirty && emailInput.isEmpty
      ? setEmailEmptyError('Поле "E-mail" не может быть пустым')
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
        emailValidError={emailValidError}
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
        passwordValidError={passwordValidError}
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
      <button
        onClick={formStore.setShowChangePasswordForm}
        className={style.link}
        type="button"
      >
        Забыли пароль?
      </button>
    </AuthForms>
  );
});

export default SignInForm;
