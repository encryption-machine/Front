import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FormGlobalStore as formStore } from '../../stores';
import { answerRegExp } from '../../constants/regExp';
import FormButton from '../FormButton/FormButton';
import useInputValidation from '../../hooks/useInputValidation';
import styles from './ChangePasswordForm.module.scss';
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
} from '../../constants/errorMessages';

const ChangePasswordForm = observer(() => {
  const [emailValue, setEmailValue] = useState('');
  const [answerValue, setAnswerValue] = useState('');
  const [passwordsValue, setPasswordsValue] = useState({
    firstPassword: '',
    secondPassword: '',
  });
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [firstPasswordError, setFirstPasswordError] = useState('');
  const [secondPasswordError, setSecondPasswordError] = useState('');
  const [passwordsIsMatchError, setPasswordsIsMatchError] = useState('');
  const [showPassword, setShowPassword] = useState('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);
  const [clickShowConfirmPassword, setClickShowConfirmPassword] =
    useState(false);
  const [answerEmptyError, setAnswerEmptyError] = useState('');
  const [answerValidError, setAnswerValidError] = useState('');
  const handleEmailValue = (e) => {
    setEmailValue(e.target.value);
  };
  const handleAnswerValue = (e) => {
    setAnswerValue(e.target.value);
  };
  const handleFirstPasswordValue = (e) => {
    setPasswordsValue({ ...passwordsValue, firstPassword: e.target.value });
  };
  const handleSecondPasswordValue = (e) => {
    setPasswordsValue({
      ...passwordsValue,
      secondPassword: e.target.value,
    });
  };
  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };
  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setClickShowConfirmPassword(!clickShowConfirmPassword);
  };
  const emailInput = useInputValidation({
    checkInputIsEmpty: emailValue,
    email: emailValue,
  });
  const answerInput = useInputValidation({
    checkInputIsEmpty: answerValue,
    custom: {
      regExp: answerRegExp,
      value: answerValue,
    },
    length: { min: 3, max: 4 },
  });
  const passwordInput = useInputValidation({
    checkInputIsEmpty: passwordsValue.firstPassword,
    password: passwordsValue.firstPassword,
    confirmPassword: passwordsValue.secondPassword,
    length: { min: 6, max: 8 },
  });

  const confirmPasswordInput = useInputValidation({
    checkInputIsEmpty: passwordsValue.secondPassword,
  });

  useEffect(() => {
    clickShowPassword ? setShowPassword('text') : setShowPassword('password');
    clickShowConfirmPassword
      ? setShowConfirmPassword('text')
      : setShowConfirmPassword('password');
  }, [clickShowPassword, clickShowConfirmPassword]);

  useEffect(() => {
    passwordInput.isDirty && passwordInput.isEmpty
      ? setFirstPasswordError(composeEmptyErrorMessage('Пароль'))
      : setFirstPasswordError('');
    confirmPasswordInput.isDirty && passwordInput.isEmpty
      ? setSecondPasswordError(composeEmptyErrorMessage('Повтор пароля'))
      : setSecondPasswordError('');
    passwordInput.isMatch
      ? setPasswordsIsMatchError('')
      : setPasswordsIsMatchError('Пароли не совпали');
    emailInput.isDirty && emailInput.isEmpty
      ? setEmailEmptyError(composeEmptyErrorMessage('E-mail'))
      : setEmailEmptyError('');
    answerInput.isDirty && answerInput.isEmpty
      ? setAnswerEmptyError(composeEmptyErrorMessage('Ответ'))
      : setAnswerEmptyError('');
    answerInput.isCustomValid
      ? setAnswerValidError('')
      : setAnswerValidError(answerErrorMessage);
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
  ]);

  const handleClearButton = (e, callback) => {
    e.preventDefault();
    callback();
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    console.log('submit email');
    console.log('click');
    formStore.setShowChangePasswordFormAnswer(true);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    console.log('submit answer');
    console.log('click');
    formStore.setShowChangePasswordFormNewPassword(true);
  };

  const handleSubmitNewPassword = (e) => {
    e.preventDefault();
    console.log('submit new passwords');
    console.log('click');
    formStore.setOpenAuthForm(false);
  };

  return (
    <>
      <h2 className={styles.title}>Восстановление пароля</h2>
      {formStore.showChangePasswordFormEmail && (
        <AuthForms onSubmit={(e) => handleSubmitEmail(e)}>
          <div className={styles.container}>
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

            <FormButton onClick={(e) => handleSubmitEmail(e)}>Далее</FormButton>
          </div>
        </AuthForms>
      )}

      {formStore.showChangePasswordFormAnswer && (
        <AuthForms onSubmit={(e) => handleSubmitAnswer(e)}>
          <AnswerInput
            value={answerValue}
            onBlur={answerInput.onBlur}
            onFocus={answerInput.onFocus}
            onChange={handleAnswerValue}
            isDirty={answerInput.isDirty}
            isEmpty={answerInput.isEmpty}
            isFocus={answerInput.isFocus}
            emptyError={answerEmptyError}
            validError={answerValidError}
            isCustomValid={answerInput.isCustomValid}
            placeholder="Ответ"
            label="Ответ"
            onClickClearButton={(e) =>
              handleClearButton(e, () => setAnswerValue(''))
            }
          />
          <FormButton onClick={(e) => handleSubmitAnswer(e)}>Далее</FormButton>
        </AuthForms>
      )}

      {formStore.showChangePasswordFormNewPassword && (
        <AuthForms onSubmit={(e) => handleSubmitNewPassword(e)}>
          <PasswordInput
            value={passwordsValue.firstPassword}
            onBlur={passwordInput.onBlur}
            onFocus={passwordInput.onFocus}
            onChange={handleFirstPasswordValue}
            isFocus={passwordInput.isFocus}
            isDirty={passwordInput.isDirty}
            isEmpty={passwordInput.isEmpty}
            passwordValidError={passwordValidErrorMessage}
            isPasswordInputValid={passwordInput.isPasswordInputValid}
            emptyError={firstPasswordError}
            showPassword={showPassword}
            placeholder="Пароль"
            label="Пароль"
            onClickShowButton={(e) => handleShowPassword(e)}
            onClickClearButton={(e) =>
              handleClearButton(e, () =>
                setPasswordsValue({ ...passwordsValue, firstPassword: '' })
              )
            }
            clickShowPassword={clickShowPassword}
          />

          <ConfirmPasswordInput
            value={passwordsValue.secondPassword}
            onBlur={confirmPasswordInput.onBlur}
            onFocus={confirmPasswordInput.onFocus}
            isFocus={confirmPasswordInput.isFocus}
            isDirty={confirmPasswordInput.isDirty}
            isEmpty={confirmPasswordInput.isEmpty}
            isMatch={passwordInput.isMatch}
            onChange={handleSecondPasswordValue}
            emptyError={secondPasswordError}
            matchError={passwordsIsMatchError}
            showPassword={showConfirmPassword}
            placeholder="Ещё раз пароль"
            label="Ещё раз пароль"
            onClickShowButton={(e) => handleShowConfirmPassword(e)}
            onClickClearButton={(e) =>
              handleClearButton(e, () =>
                setPasswordsValue({ ...passwordsValue, secondPassword: '' })
              )
            }
            clickShowPassword={clickShowConfirmPassword}
          />
          <FormButton onClick={(e) => handleSubmitNewPassword(e)}>Далее</FormButton>
        </AuthForms>
      )}
    </>
  );
});

export default ChangePasswordForm;
