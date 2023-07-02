import { useState, useEffect } from 'react';
import AuthForms from '../AuthForms/AuthForms';
import cn from 'classnames';
import useInputValidation from '../../hooks/useInputValidation';
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  SecretWordInput,
} from '../AuthFormsInputs/AuthFormsInputs';
import { secretWordRegExp } from '../../constants/regExp';
import style from '../AuthForms/AuthForms.module.scss';

const SignUpForm = () => {
  const [secretWordValue, setSecretWordValue] = useState('');

  // Set values
  const [passwordsValue, setPasswordsValue] = useState({
    firstPassword: '',
    secondPassword: '',
  });
  const [emailValue, setEmailValue] = useState('');

  // errors
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [secretWordEmptyError, setSecretWordEmptyError] = useState('');
  const [secretWordValidError, setSecretWordValidError] = useState('');
  const [emailValidError, setEmailValidError] = useState([]);
  const [firstPasswordError, setFirstPasswordError] = useState('');
  const [secondPasswordError, setSecondPasswordError] = useState('');
  const [passwordValidError, setPasswordValidError] = useState([]);
  const [passwordsIsMatchError, setPasswordsIsMatchError] = useState('');

  // Set show
  const [showPassword, setShowPassword] = useState('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);
  const [clickShowConfirmPassword, setClickShowConfirmPassword] =
    useState(false);

  // handlers
  const handleFirstPasswordValue = (e) => {
    setPasswordsValue({ ...passwordsValue, firstPassword: e.target.value });
  };
  const handleSecondPasswordValue = (e) => {
    setPasswordsValue({
      ...passwordsValue,
      secondPassword: e.target.value,
    });
  };
  const handleEmailValue = (e) => {
    setEmailValue(e.target.value);
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setClickShowConfirmPassword(!clickShowConfirmPassword);
  };

  const handleSecretWordValue = (e) => {
    setSecretWordValue(e.target.value);
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const regExp = secretWordRegExp;

  const passwordInput = useInputValidation({
    checkInputIsEmpty: passwordsValue.firstPassword,
    password: passwordsValue.firstPassword,
    confirmPassword: passwordsValue.secondPassword,
    length: { min: 6, max: 8 },
  });

  const confirmPasswordInput = useInputValidation({
    checkInputIsEmpty: passwordsValue.secondPassword,
  });

  const emailInput = useInputValidation({
    checkInputIsEmpty: emailValue,
    email: emailValue,
  });

  const secretWordInput = useInputValidation({
    checkInputIsEmpty: secretWordValue,
    custom: {
      regExp: regExp,
      value: secretWordValue,
    },
    length: { min: 3, max: 4 },
  });

  useEffect(() => {
    passwordInput.isPasswordInputValid &&
    emailInput.isEmailValid &&
    passwordInput.isMatch &&
    secretWordInput.isCustomValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [
    emailInput.isEmailValid,
    passwordInput.isMatch,
    passwordInput.isPasswordInputValid,
    secretWordInput.isCustomValid,
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
      ? setFirstPasswordError('Поле "Пароль" не может быть пустым')
      : setFirstPasswordError('');
    confirmPasswordInput.isDirty && passwordInput.isEmpty
      ? setSecondPasswordError('Поле "Повтор пароля" не может быть пустым')
      : setSecondPasswordError('');
    emailInput.isDirty && emailInput.isEmpty
      ? setEmailEmptyError('Поле "E-mail" не может быть пустым')
      : setEmailEmptyError('');
    secretWordInput.isDirty && secretWordInput.isEmpty
      ? setSecretWordEmptyError('Поле "Секретное слово" не может быть пустым')
      : setSecretWordEmptyError('');
    emailInput.isEmailValid
      ? setEmailValidError('')
      : setEmailValidError([
          {
            error_title: 'Недопустимые символы.',
            list_title: 'Допустимые символы:',
            item_1: 'цифры',
            item_2: 'латинские буквы',
            item_3: '«_», «-», «@» и «.»',
          },
        ]);
    secretWordInput.isCustomValid
      ? setSecretWordValidError('')
      : setSecretWordValidError(
          'Секретное слово должно содержать от 3 до 42 латинских или кирилических букв, состоять из одного слова, без пробелов, цифр и знаков'
        );
    passwordInput.isPasswordInputValid
      ? setPasswordValidError('')
      : setPasswordValidError([
          {
            list_title: 'Пароль должен содержать:',
            item_1: 'от 6 до 8 символов',
            item_2: 'цифры',
            item_3: 'заглавные буквы',
            item_4: 'строчные буквы ',
            item_5: 'специальные символы',
          },
        ]);
    passwordInput.isMatch
      ? setPasswordsIsMatchError('')
      : setPasswordsIsMatchError('Пароли не совпали');
  }, [
    confirmPasswordInput.isDirty,
    emailInput.isDirty,
    emailInput.isEmailValid,
    passwordInput.isDirty,
    passwordInput.isEmpty,
    emailInput.isEmpty,
    secretWordInput.isDirty,
    secretWordInput.isEmpty,
    secretWordInput.isCustomValid,
    passwordInput.isPasswordInputValid,
    passwordInput.isMatch,
  ]);

  const resetForm = () => {
    setEmailValue('');
    setPasswordsValue({
      firstPassword: '',
      secondPassword: '',
    });
    setSecretWordValue('');
    setIsFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <AuthForms onSubmit={handleSubmit}>
      <EmailInput
        value={emailValue}
        onBlur={(e) => emailInput.onBlur(e)}
        isDirty={emailInput.isDirty}
        isEmpty={emailInput.isEmpty}
        isEmailValid={emailInput.isEmailValid}
        emptyError={emailEmptyError}
        onChange={handleEmailValue}
        emailValidError={emailValidError}
      />

      <PasswordInput
        value={passwordsValue.firstPassword}
        onBlur={passwordInput.onBlur}
        onClick={(e) => handleShowPassword(e)}
        onFocus={passwordInput.onFocus}
        isFocus={passwordInput.isFocus}
        isDirty={passwordInput.isDirty}
        isEmpty={passwordInput.isEmpty}
        onChange={handleFirstPasswordValue}
        passwordValidError={passwordValidError}
        isPasswordInputValid={passwordInput.isPasswordInputValid}
        emptyError={firstPasswordError}
        showPassword={showPassword}
        clickShowPassword={clickShowPassword}
      />

      <ConfirmPasswordInput
        value={passwordsValue.secondPassword}
        onBlur={confirmPasswordInput.onBlur}
        onClick={(e) => handleShowConfirmPassword(e)}
        onFocus={confirmPasswordInput.onFocus}
        isFocus={confirmPasswordInput.isFocus}
        isDirty={confirmPasswordInput.isDirty}
        isEmpty={confirmPasswordInput.isEmpty}
        isMatch={passwordInput.isMatch}
        onChange={handleSecondPasswordValue}
        emptyError={secondPasswordError}
        matchError={passwordsIsMatchError}
        showPassword={showConfirmPassword}
        clickShowPassword={clickShowConfirmPassword}
      />

      <SecretWordInput
        value={secretWordValue}
        onBlur={secretWordInput.onBlur}
        onFocus={secretWordInput.onFocus}
        isDirty={secretWordInput.isDirty}
        isEmpty={secretWordInput.isEmpty}
        onChange={handleSecretWordValue}
        emptyError={secretWordEmptyError}
        validError={secretWordValidError}
        isCustomValid={secretWordInput.isCustomValid}
      />

      <button
        onSubmit={(e) => e.preventDefault()}
        disabled={!isFormValid}
        className={cn(style.button, style.button__wrap)}
        type="submit"
      >
        Зарегистрироваться
      </button>
    </AuthForms>
  );
};

export default SignUpForm;
