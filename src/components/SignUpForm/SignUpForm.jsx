/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import AuthForms from '../AuthForms/AuthForms';
import useInputValidation from '../../hooks/useInputValidation';
import AuthFormStore from '../../stores/auth-form-store';
import * as apiReg from '../../utils/Registration';
import * as apiAuth from '../../utils/Auth';
import { AuthFormGlobalStore as formStore } from '../../stores';
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  AnswerInput,
  SecretQuestionInput,
} from '../AuthFormsInputs/AuthFormsInputs';
import { anyCharRegExp } from '../../constants/regExp';
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
    checkInputIsEmpty: firstPassword.value,
    password: firstPassword.value,
    confirmPassword: secondPassword.value,
    length: { min: 8, max: 30 },
  });

  const confirmPasswordInput = useInputValidation({
    checkInputIsEmpty: secondPassword.value,
  });

  const emailInput = useInputValidation({
    checkInputIsEmpty: email.value,
    email: email.value,
  });

  const secretQuestionInput = useInputValidation({
    checkInputIsEmpty: question.value,
    custom: {
      regExp: anyCharRegExp,
      value: question.value,
    },
    length: { min: 1, max: 100 },
  });

  const answerInput = useInputValidation({
    checkInputIsEmpty: answer.value,
    custom: {
      regExp: anyCharRegExp,
      value: answer.value,
    },
    length: { min: 1, max: 30 },
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
    passwordInput.isPasswordInputValid &&
    emailInput.isEmailValid &&
    passwordInput.isMatch &&
    answerInput.isCustomValid &&
    secretQuestionInput.isCustomValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [
    emailInput.isEmailValid,
    passwordInput.isMatch,
    passwordInput.isPasswordInputValid,
    answerInput.isCustomValid,
    secretQuestionInput.isCustomValid,
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

    answerInput.isCustomValid
      ? answer.setError({ validMessage: '' })
      : answer.setError({ validMessage: answerErrorMessage });

    secretQuestionInput.isDirty && secretQuestionInput.isEmpty
      ? question.setError({
          emptyMessage: composeEmptyErrorMessage('Секретный вопрос'),
        })
      : question.setError({ emptyMessage: '' });

    secretQuestionInput.isCustomValid
      ? question.setError({ validMessage: '' })
      : question.setError({
          validMessage: secretQuestionErrorMessage,
        });

    passwordInput.isMatch
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
    answerInput.isCustomValid,
    passwordInput.isMatch,
    secretQuestionInput.isDirty,
    secretQuestionInput.isEmpty,
    secretQuestionInput.isCustomValid,
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
        const refresh = data.refresh;
        if (data.access) {
          document.cookie = `access=${data.access}; max-age=3600`;
          formStore.setLoggedIn(true);
          formStore.setOpenAuthForm(false);
        } else {
          apiAuth
            .postApiAuthorizeVerify(refresh)
            .then((data) => {
              if (data) {
                apiAuth
                  .postApiAuthorizeRefresh(refresh)
                  .then((data) => {
                    if (data.access) {
                      document.cookie = `access=${data.access}; max-age=3600`;
                      formStore.setLoggedIn(true);
                      formStore.setOpenAuthForm(false);
                    }
                  })
                  .catch((err) => {
                    console.error(err, '--authorizeRefresh,err');
                    formStore.setLoggedIn(false);
                    setLoginErrorMessage(err.message);
                  });
              }
            })
            .catch((err) => {
              console.error(err, '--token,err');
              formStore.setLoggedIn(false);
              setLoginErrorMessage(err.message);
            });
        }
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
        isCustomValid={secretQuestionInput.isCustomValid}
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
        isCustomValid={answerInput.isCustomValid}
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
