/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AuthFormStore from '../../stores/auth-form-store';
import { AuthFormGlobalStore as formStore } from '../../stores';
import { anyCharRegExp } from '../../constants/regExp';
import FormButton from '../FormButton/FormButton';
import useInputValidation from '../../hooks/useInputValidation';
import styles from './RecoveryPasswordForm.module.scss';
import AuthForms from '../AuthForms/AuthForms';
import {
  EmailInput,
  AnswerInput,
  PasswordInput,
  ConfirmPasswordInput,
} from '../AuthFormsInputs/AuthFormsInputs';
import {
  answerErrorMessage,
  composeEmptyErrorMessage,
  passwordValidErrorMessage,
  emailValidErrorMessage,
  passwordMismatchErrorMessage,
} from '../../constants/errorMessages';

import * as api from '../../utils/apiPasswordRecovery';

/**
 * Создаёт незвисимые инстансы стора для инпутов
 */
const emailStore = new AuthFormStore();
const firstPasswordStore = new AuthFormStore();
const secondPasswordStore = new AuthFormStore();
const answerStore = new AuthFormStore();

const RecoveryPasswordForm = observer(() => {
  /**
   * Присваивает переменные инстансам для корректной
   * работы с зависимостями useEffect
   */
  const email = emailStore;
  const firstPassword = firstPasswordStore;
  const secondPassword = secondPasswordStore;
  const answer = answerStore;

  //const [email.value, setEmailValue] = useState('');
  //const [answer.value, setAnswerValue] = useState('');
  //const [passwordsValue, setPasswordsValue] = useState({
  //  firstPassword: '',
  //  secondPassword: '',
  //});
  //const [emailEmptyError, setEmailEmptyError] = useState('');
  //const [firstPasswordError, setFirstPasswordError] = useState('');
  //const [secondPasswordError, setSecondPasswordError] = useState('');
  //const [passwordsIsMatchError, setPasswordsIsMatchError] = useState('');
  const [showPassword, setShowPassword] = useState('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);
  const [clickShowConfirmPassword, setClickShowConfirmPassword] =
    useState(false);

  /**
   * Присваивает переменную глобальному состоянию
   * открытия/закрытия формы для корректной
   * работы с зависимостями useEffect
   */
  const isOpenModal = formStore.openAuthForm;
  //const [answerEmptyError, setAnswerEmptyError] = useState('');
  //const [answerValidError, setAnswerValidError] = useState('');

  //  переменные для апи запроса по восстановлению пароля
  const [idUser, setIdUser] = useState('');
  const [token, setToken] = useState('');
  const [secretQuestion, setSecretQuestion] = useState('');
  const [serverError, setServerError] = useState('');

  //const handleEmailValue = (e) => {
  //  setEmailValue(e.target.value);
  //};
  //const handleAnswerValue = (e) => {
  //  setAnswerValue(e.target.value);
  //};
  //const handleFirstPasswordValue = (e) => {
  //  setPasswordsValue({ ...passwordsValue, firstPassword: e.target.value });
  //};
  //const handleSecondPasswordValue = (e) => {
  //  setPasswordsValue({
  //    ...passwordsValue,
  //    secondPassword: e.target.value,
  //  });
  //};
  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setClickShowConfirmPassword(!clickShowConfirmPassword);
  };

  const emailInput = useInputValidation({
    checkInputIsEmpty: email.value,
    email: email.value,
  });

  const answerInput = useInputValidation({
    checkInputIsEmpty: answer.value,
    custom: {
      regExp: anyCharRegExp,
      value: answer.value,
    },
    length: { min: 1, max: 30 },
  });

  const passwordInput = useInputValidation({
    checkInputIsEmpty: firstPassword.value,
    password: firstPassword.value,
    confirmPassword: secondPassword.value,
    length: { min: 8, max: 30 },
  });

  const confirmPasswordInput = useInputValidation({
    checkInputIsEmpty: secondPassword.value,
  });

  const resetForm = () => {
    email.setValue('');
    firstPassword.setValue('');
    secondPassword.setValue('');
    answer.setValue('');

    /**
     * Отменяют стандартное поведение
     * появления ошибок при потере фокуса
     * пустого инпута после сброса значения инпутов
     */
    confirmPasswordInput.setDirty(false);
    confirmPasswordInput.setFocus(false);
    passwordInput.setDirty(false);
    passwordInput.setFocus(false);
    emailInput.setDirty(false);
    emailInput.setFocus(false);
    answerInput.setDirty(false);
    answerInput.setFocus(false);
  };

  useEffect(() => {
    isOpenModal && resetForm();
  }, [isOpenModal]);

  useEffect(() => {
    clickShowPassword ? setShowPassword('text') : setShowPassword('password');
    clickShowConfirmPassword
      ? setShowConfirmPassword('text')
      : setShowConfirmPassword('password');
  }, [clickShowPassword, clickShowConfirmPassword]);

  useEffect(() => {
    passwordInput.isDirty && passwordInput.isEmpty
      ? firstPassword.setError({
          emptyMessage: composeEmptyErrorMessage('Пароль'),
        })
      : firstPassword.setError({ emptyMessage: '' });

    confirmPasswordInput.isDirty && passwordInput.isEmpty
      ? secondPassword.setError({
          emptyMessage: composeEmptyErrorMessage('Повтор пароля'),
        })
      : secondPassword.setError({ emptyMessage: '' });

    emailInput.isDirty && emailInput.isEmpty
      ? email.setError({ emptyMessage: composeEmptyErrorMessage('E-mail') })
      : email.setError({ emptyMessage: '' });

    answerInput.isDirty && answerInput.isEmpty
      ? answer.setError({ emptyMessage: composeEmptyErrorMessage('Ответ') })
      : answer.setError({ emptyMessage: '' });

    passwordInput.isMatch
      ? secondPassword.setError({ validMessage: '' })
      : secondPassword.setError({
          validMessage: passwordMismatchErrorMessage,
        });

    answerInput.isCustomValid
      ? answer.setError({ validMessage: '' })
      : answer.setError({ validMessage: answerErrorMessage });

    email.value || answer.value
      ? setServerError('')
      : setServerError(serverError);
  }, [
    answerInput.isCustomValid,
    answerInput.isDirty,
    answerInput.isEmpty,
    confirmPasswordInput.isDirty,
    emailInput.isDirty,
    emailInput.isEmailValid,
    emailInput.isEmpty,
    passwordInput.isDirty,
    passwordInput.isEmpty,
    passwordInput.isMatch,
    email.value,
    answer.value,
  ]);

  const handleClearButton = (e, callback) => {
    e.preventDefault();
    callback();
    serverError && setServerError('');
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    /**
     * Проверяет существует ли email в базе данных
     */
    api
      .sendEmail(email.value)
      .then((res) => {
        if (res) {
          const question = res.question;
          const idUser = res.id;
          setIdUser(idUser);
          setSecretQuestion(question);
          formStore.setShowRecoveryPasswordFormAnswer(true);
        } else {
          console.error('ошибка при отправке почты');
        }
      })
      .catch((err) => {
        setServerError('Пользователь с таким Email не найден');
        console.error('ошибка при отправке почты', err);
      });
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();

    /**
     * Проверяет совпадает ли ответ с секретным вопросом
     */
    api
      .sendSecretQuestion(idUser, answer.value)
      .then((result) => {
        if (result) {
          const token = result.token;
          setToken(token);
          formStore.setShowRecoveryPasswordFormNewPassword(true);
        } else {
          console.error('Ошибка при ответе на секретный вопрос');
        }
      })
      .catch((err) => {
        setServerError('Неверный ответ');
        console.error('Ошибка при ответе на секретный вопрос', err);
      });
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();

    /**
     * Отправляет данные для смены пароля на сервер
     */
    api
      .sendNewPassword(idUser, firstPassword.value, secondPassword.value, token)
      .then((result) => {
        if (result) {
          formStore.setOpenAuthForm(false);
        } else {
          console.error('Ошибка при изменении пароля');
        }
      })
      .catch((err) => {
        console.error('Ошибка при изменении пароля', err);
      });
  };

  return (
    <>
      <h2 className={styles.title}>Восстановление пароля</h2>
      {formStore.showRecoveryPasswordFormEmail && (
        <AuthForms onSubmit={(e) => handleSubmitEmail(e)}>
          <div className={styles.container}>
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
            {serverError && (
              <span className={styles.serverError}> {serverError} </span>
            )}

            <FormButton
              disabled={
                emailInput.isEmpty || !emailInput.isEmailValid || serverError
              }
              onClick={(e) => handleSubmitEmail(e)}
            >
              Далее
            </FormButton>
          </div>
        </AuthForms>
      )}

      {formStore.showRecoveryPasswordFormAnswer && (
        <AuthForms onSubmit={(e) => handleSubmitAnswer(e)}>
          <AnswerInput
            value={answer.value}
            onBlur={answerInput.onBlur}
            onFocus={answerInput.onFocus}
            onChange={(e) => answer.setValue(e.target.value)}
            isDirty={answerInput.isDirty}
            isEmpty={answerInput.isEmpty}
            isFocus={answerInput.isFocus}
            emptyError={answer.emptyMessage}
            validError={answer.validMessage}
            isCustomValid={answerInput.isCustomValid}
            placeholder="Ответ"
            label={secretQuestion}
            onClickClearButton={(e) =>
              handleClearButton(e, () => answer.setValue(''))
            }
          />
          {serverError && (
            <span className={styles.serverError}> {serverError}</span>
          )}
          <FormButton
            disabled={
              answerInput.isEmpty || !answerInput.isCustomValid || serverError
            }
            onClick={(e) => handleSubmitAnswer(e)}
          >
            Далее
          </FormButton>
        </AuthForms>
      )}

      {formStore.showRecoveryPasswordFormNewPassword && (
        <AuthForms onSubmit={(e) => handleSubmitNewPassword(e)}>
          <PasswordInput
            value={firstPassword.value}
            onBlur={passwordInput.onBlur}
            onFocus={passwordInput.onFocus}
            onChange={(e) => firstPassword.setValue(e.target.value)}
            isFocus={passwordInput.isFocus}
            isDirty={passwordInput.isDirty}
            isEmpty={passwordInput.isEmpty}
            passwordValidError={passwordValidErrorMessage}
            isPasswordInputValid={passwordInput.isPasswordInputValid}
            emptyError={firstPassword.emptyMessage}
            showPassword={showPassword}
            placeholder="Пароль"
            label="Пароль"
            onClickShowButton={(e) => handleShowPassword(e)}
            onClickClearButton={(e) =>
              handleClearButton(e, () => firstPassword.setValue(''))
            }
            clickShowPassword={clickShowPassword}
          />

          <ConfirmPasswordInput
            value={secondPassword.value}
            onBlur={confirmPasswordInput.onBlur}
            onFocus={confirmPasswordInput.onFocus}
            isFocus={confirmPasswordInput.isFocus}
            isDirty={confirmPasswordInput.isDirty}
            isEmpty={confirmPasswordInput.isEmpty}
            isMatch={passwordInput.isMatch}
            onChange={(e) => secondPassword.setValue(e.target.value)}
            emptyError={secondPassword.emptyMessage}
            matchError={secondPassword.validMessage}
            showPassword={showConfirmPassword}
            placeholder="Ещё раз пароль"
            label="Ещё раз пароль"
            onClickShowButton={(e) => handleShowConfirmPassword(e)}
            onClickClearButton={(e) =>
              handleClearButton(e, () => secondPassword.setValue(''))
            }
            clickShowPassword={clickShowConfirmPassword}
          />
          <FormButton
            disabled={
              passwordInput.isEmpty ||
              confirmPasswordInput.isEmpty ||
              !passwordInput.isPasswordInputValid ||
              !passwordInput.isMatch ||
              serverError
            }
            onClick={(e) => handleSubmitNewPassword(e)}
          >
            Далее
          </FormButton>
        </AuthForms>
      )}
    </>
  );
});

export default RecoveryPasswordForm;
