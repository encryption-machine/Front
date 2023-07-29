/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AuthForms from '../AuthForms/AuthForms';
import useInputValidation from '../../hooks/useInputValidation';
import AuthFormStore from '../../stores/auth-form-store';
import * as apiReg from '../../utils/Registration';
/* import * as apiAuth from '../../utils/Auth'; */
import { AuthFormGlobalStore as formStore } from '../../stores';
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  AnswerInput,
  SecretQuestionInput,
} from '../AuthFormsInputs/AuthFormsInputs';
import {
  anyCharRegExp,
  emailRegExp,
  passwordRegExp,
} from '../../constants/regExp';
import {
  answerErrorMessage,
  composeEmptyErrorMessage,
  passwordMismatchErrorMessage,
  secretQuestionErrorMessage,
  passwordValidErrorMessage,
  emailValidErrorMessage,
} from '../../constants/errorMessages';
import FormButton from '../FormButton/FormButton';
import styles from '../AuthForms/AuthForms.module.scss';
import { setCookie } from '../../utils/cookie';

/**
 * Создаёт незвисимые инстансы стора для инпутов
 */
const emailStore = new AuthFormStore();
const firstPasswordStore = new AuthFormStore();
const secondPasswordStore = new AuthFormStore();
const answerStore = new AuthFormStore();
const questionStore = new AuthFormStore();

const SignUpForm = observer(() => {
  /**
   * Присваивает переменные инстансам для корректной
   * работы с зависимостями useEffect
   */
  const email = emailStore;
  const firstPassword = firstPasswordStore;
  const secondPassword = secondPasswordStore;
  const answer = answerStore;
  const question = questionStore;

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Set show
  const [showPassword, setShowPassword] = useState('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);
  const [clickShowConfirmPassword, setClickShowConfirmPassword] =
    useState(false);
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

  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setClickShowConfirmPassword(!clickShowConfirmPassword);
  };

  const passwordInput = useInputValidation({
    value: firstPassword.value,
    regExp: passwordRegExp,
    length: { from: 8, to: 30 },
  });

  const confirmPasswordInput = useInputValidation({
    value: secondPassword.value,
    compare: firstPassword.value,
  });

  const emailInput = useInputValidation({
    value: email.value,
    regExp: emailRegExp,
  });

  const secretQuestionInput = useInputValidation({
    value: question.value,
    regExp: anyCharRegExp,
    length: { from: 1, to: 100 },
  });

  const answerInput = useInputValidation({
    value: answer.value,
    regExp: anyCharRegExp,
    length: { from: 1, to: 30 },
  });

  const resetForm = () => {
    email.setValue('');
    firstPassword.setValue('');
    secondPassword.setValue('');
    answer.setValue('');
    question.setValue('');

    /**
     * Отменяют стандартное поведение
     * появления ошибок при потере фокуса
     * пустого инпута после сброса значения инпутов
     */
    confirmPasswordInput.setDirty(false);
    confirmPasswordInput.setFocus(false);
    secretQuestionInput.setDirty(false);
    secretQuestionInput.setFocus(false);
    passwordInput.setDirty(false);
    passwordInput.setFocus(false);
    emailInput.setDirty(false);
    emailInput.setFocus(false);
    answerInput.setDirty(false);
    answerInput.setFocus(false);

    setIsFormValid(false);
  };

  useEffect(() => {
    isOpenModal && resetForm();
  }, [isOpenModal]);

  useEffect(() => {
    passwordInput.isValid &&
    emailInput.isValid &&
    confirmPasswordInput.isMatch &&
    answerInput.isValid &&
    secretQuestionInput.isValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [
    emailInput.isValid,
    confirmPasswordInput.isMatch,
    passwordInput.isValid,
    answerInput.isValid,
    secretQuestionInput.isValid,
  ]);

  // Change show passwords
  useEffect(() => {
    clickShowPassword ? setShowPassword('text') : setShowPassword('password');
    clickShowConfirmPassword
      ? setShowConfirmPassword('text')
      : setShowConfirmPassword('password');
  }, [clickShowPassword, clickShowConfirmPassword]);

  // Set errors
  useEffect(() => {
    passwordInput.isDirty && passwordInput.isEmpty
      ? firstPassword.setError({
          emptyMessage: composeEmptyErrorMessage('Пароль'),
        })
      : firstPassword.setError({ emptyMessage: '' });

    confirmPasswordInput.isDirty && confirmPasswordInput.isEmpty
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

    answerInput.isValid
      ? answer.setError({ validMessage: '' })
      : answer.setError({ validMessage: answerErrorMessage });

    secretQuestionInput.isDirty && secretQuestionInput.isEmpty
      ? question.setError({
          emptyMessage: composeEmptyErrorMessage('Секретный вопрос'),
        })
      : question.setError({ emptyMessage: '' });

    secretQuestionInput.isValid
      ? question.setError({ validMessage: '' })
      : question.setError({
          validMessage: secretQuestionErrorMessage,
        });

    confirmPasswordInput.isMatch
      ? secondPassword.setError({ validMessage: '' })
      : secondPassword.setError({
          validMessage: passwordMismatchErrorMessage,
        });

    email.value ? setServerError('') : setServerError(loginErrorMessage);
  }, [
    confirmPasswordInput.isDirty,
    emailInput.isDirty,
    passwordInput.isDirty,
    passwordInput.isEmpty,
    emailInput.isEmpty,
    answerInput.isDirty,
    answerInput.isEmpty,
    answerInput.isValid,
    confirmPasswordInput.isMatch,
    secretQuestionInput.isDirty,
    secretQuestionInput.isEmpty,
    secretQuestionInput.isValid,
    loginErrorMessage,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    apiReg
      .postApiRegistration(
        email.value,
        firstPassword.value,
        secondPassword.value,
        question.value,
        answer.value
      )
      .then((data) => {
        localStorage.setItem('refresh', data.refresh);
        setCookie('access', data.access);
        formStore.setLoggedIn(true);
        formStore.setOpenAuthForm(false);
      })
      .catch((err) => {
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
        value={firstPassword.value}
        onBlur={passwordInput.onBlur}
        onFocus={passwordInput.onFocus}
        onChange={(e) => firstPassword.setValue(e.target.value)}
        isFocus={passwordInput.isFocus}
        isDirty={passwordInput.isDirty}
        isEmpty={passwordInput.isEmpty}
        validError={passwordValidErrorMessage}
        isValid={passwordInput.isValid}
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
        isValid={confirmPasswordInput.isMatch}
        onChange={(e) => secondPassword.setValue(e.target.value)}
        emptyError={secondPassword.emptyMessage}
        validError={secondPassword.validMessage}
        showPassword={showConfirmPassword}
        placeholder="Ещё раз пароль"
        label="Ещё раз пароль"
        onClickShowButton={(e) => handleShowConfirmPassword(e)}
        onClickClearButton={(e) =>
          handleClearButton(e, () => secondPassword.setValue(''))
        }
        clickShowPassword={clickShowConfirmPassword}
      />

      <SecretQuestionInput
        value={question.value}
        onBlur={secretQuestionInput.onBlur}
        onFocus={secretQuestionInput.onFocus}
        onChange={(e) => question.setValue(e.target.value)}
        isDirty={secretQuestionInput.isDirty}
        isEmpty={secretQuestionInput.isEmpty}
        isFocus={secretQuestionInput.isFocus}
        emptyError={question.emptyMessage}
        validError={question.validMessage}
        isValid={secretQuestionInput.isValid}
        placeholder="Секретный вопрос"
        label="Секретный вопрос"
        onClickClearButton={(e) =>
          handleClearButton(e, () => question.setValue(''))
        }
      />

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
        isValid={answerInput.isValid}
        placeholder="Ответ"
        label="Ответ"
        onClickClearButton={(e) =>
          handleClearButton(e, () => answer.setValue(''))
        }
      />

      <span className={styles.hintError}>
        Секретный вопрос и ответ на него нужны для дальнейшей смены пароля
      </span>

      {serverError && (
        <span className={styles.loginErrorMessage}>{serverError}</span>
      )}

      <FormButton
        /* onSubmit={(e) => e.preventDefault()} */ disabled={!isFormValid}
      >
        Зарегистрироваться
      </FormButton>
    </AuthForms>
  );
});

export default SignUpForm;
