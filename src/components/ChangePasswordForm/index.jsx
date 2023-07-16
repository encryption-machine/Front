import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FormGlobalStore as formStore } from '../../stores/';
import { answerRegExp } from '../../constants/regExp';
import { ChangePasswordForm as form } from './ChangePasswordForm';
import {
  EmailInput,
  AnswerInput,
  PasswordInput,
  ConfirmPasswordInput,
} from '../AuthFormsInputs/AuthFormsInputs';
import FormButton from '../FormButton/FormButton';
import useInputValidation from '../../hooks/useInputValidation';
import styles from './ChangePasswordForm.module.scss';

const ChangePasswordForm = observer(() => {
  const [emailValue, setEmailValue] = useState('');
  const [answerValue, setAnswerValue] = useState('');
  const [passwordsValue, setPasswordsValue] = useState({
    firstPassword: '',
    secondPassword: '',
  });
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
  const [firstPasswordError, setFirstPasswordError] = useState('');
  const [secondPasswordError, setSecondPasswordError] = useState('');
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
      ? setFirstPasswordError('Поле "Пароль" не может быть пустым')
      : setFirstPasswordError('');
    confirmPasswordInput.isDirty && passwordInput.isEmpty
      ? setSecondPasswordError('Поле "Повтор пароля" не может быть пустым')
      : setSecondPasswordError('');
    passwordInput.isMatch
      ? setPasswordsIsMatchError('')
      : setPasswordsIsMatchError('Пароли не совпали');
    emailInput.isDirty && emailInput.isEmpty
      ? setEmailEmptyError('Поле "E-mail" не может быть пустым')
      : setEmailEmptyError('');
    answerInput.isDirty && answerInput.isEmpty
      ? setAnswerEmptyError('Поле "Ответ" не может быть пустым')
      : setAnswerEmptyError('');
    answerInput.isCustomValid
      ? setAnswerValidError('')
      : setAnswerValidError(
          'Ответ должен содержать от 3 до 42 латинских или кирилических букв, состоять из одного слова, без пробелов, цифр и знаков'
        );
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

  return (
    <form.container>
      {formStore.showChangePasswordFormEmail && (
        <form.email>
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
              emailValidError={emailValidError}
              onClickClearButton={(e) =>
                handleClearButton(e, () => setEmailValue(''))
              }
              placeholder="E-mail"
              label="E-mail"
            />

            <FormButton onClick={formStore.setShowChangePasswordFormAnswer}>
              Далее
            </FormButton>
          </div>
        </form.email>
      )}
      {formStore.showChangePasswordFormAnswer && (
        <form.answer>
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
          <FormButton onClick={formStore.setShowChangePasswordFormNewPassword}>
            Далее
          </FormButton>
        </form.answer>
      )}
      {formStore.showChangePasswordFormNewPassword && (
        <form.newPassword>
          <PasswordInput
            value={passwordsValue.firstPassword}
            onBlur={passwordInput.onBlur}
            onFocus={passwordInput.onFocus}
            onChange={handleFirstPasswordValue}
            isFocus={passwordInput.isFocus}
            isDirty={passwordInput.isDirty}
            isEmpty={passwordInput.isEmpty}
            passwordValidError={passwordValidError}
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
          <FormButton onClick={formStore.setOpenAuthForm}>Далее</FormButton>
        </form.newPassword>
      )}
    </form.container>
  );
});

export default ChangePasswordForm;
