import { useState, useEffect } from 'react';
import AuthForms from '../AuthForms/AuthForms';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import useInputValidation from '../../hooks/useInputValidation';
import { secretWordRegExp } from '../../constants/regExp';
import viewPassword from '../../assets/icons/view.svg';
import hidePassword from '../../assets/icons/hide.svg';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignUpForm.module.scss';

const SignUpForm = () => {
  const [secretWord, setSecretWord] = useState('');

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
    setSecretWord(e.target.value);
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
    checkInputIsEmpty: secretWord,
    custom: {
      regExp: regExp,
      value: secretWord,
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

  return (
    <AuthForms>
      <div onBlur={(e) => emailInput.onBlur(e)} className={style.inputs}>
        <input
          className={style.input}
          name="email"
          type="text"
          placeholder="E-mail"
          value={passwordInput.email}
          onChange={handleEmailValue}
        />
      </div>
      {emailInput.isDirty && emailInput.isEmpty ? (
        <span className={style.hintError}>{emailEmptyError}</span>
      ) : null}
      {emailInput.isDirty && !emailInput.isEmailValid && !emailInput.isEmpty ? (
        <>
          {emailValidError.map((error) => {
            return (
              <div
                className={cn(style.hintError, style.hintError__wrap)}
                key={nanoid()}
              >
                <span className={style.hintError__title}>
                  {error.error_title}
                </span>
                <ul className={style.hintError__list}>
                  {error.list_title}
                  <li className={style.hintError__item}>{error.item_1}</li>
                  <li className={style.hintError__item}>{error.item_2}</li>
                  <li className={style.hintError__item}>{error.item_3}</li>
                </ul>
              </div>
            );
          })}
        </>
      ) : null}

      <div
        onBlur={(e) => passwordInput.onBlur(e)}
        onFocus={(e) => passwordInput.onFocus(e)}
        className={cn(styleLocal.input__password, style.inputs)}
      >
        <input
          className={style.input}
          name="password"
          type={showPassword}
          placeholder="Пароль"
          value={passwordInput.password}
          onChange={handleFirstPasswordValue}
        />

        <button
          onBlur={(e) => passwordInput.onBlur(e)}
          onFocus={(e) => passwordInput.onFocus(e)}
          onClick={(e) => handleShowPassword(e)}
          className={
            !passwordInput.isFocus ? styleLocal.unfocused : styleLocal.focused
          }
        >
          {clickShowPassword ? (
            <img src={hidePassword} alt="" />
          ) : (
            <img src={viewPassword} alt="" />
          )}
        </button>
      </div>
      {passwordInput.isDirty && passwordInput.isEmpty ? (
        <span className={style.hintError}>{firstPasswordError}</span>
      ) : null}
      {passwordInput.isDirty &&
      !passwordInput.isPasswordInputValid &&
      !passwordInput.isEmpty ? (
        <div className={cn(style.hintError, style.hintError__wrap)}>
          {passwordValidError.map(function (error) {
            return (
              <ul key={nanoid()} className={style.hintError__list}>
                {error.list_title}
                <li className={style.hintError__item}>{error.item_1}</li>
                <li className={style.hintError__item}>{error.item_2}</li>
                <li className={style.hintError__item}>{error.item_3}</li>
                <li className={style.hintError__item}>{error.item_4}</li>
                <li className={style.hintError__item}>{error.item_5}</li>
              </ul>
            );
          })}
        </div>
      ) : null}

      <div
        onBlur={(e) => confirmPasswordInput.onBlur(e)}
        onFocus={(e) => confirmPasswordInput.onFocus(e)}
        className={cn(styleLocal.input__password, style.inputs)}
      >
        <input
          className={style.input}
          name="confirmPassword"
          type={showConfirmPassword}
          placeholder="Еще раз пароль"
          value={passwordInput.confirmPassword}
          onChange={handleSecondPasswordValue}
        />

        <button
          onBlur={(e) => confirmPasswordInput.onBlur(e)}
          onFocus={(e) => confirmPasswordInput.onFocus(e)}
          onClick={(e) => handleShowConfirmPassword(e)}
          className={
            !confirmPasswordInput.isFocus
              ? styleLocal.unfocused
              : styleLocal.focused
          }
        >
          {clickShowConfirmPassword ? (
            <img src={hidePassword} alt="" />
          ) : (
            <img src={viewPassword} alt="" />
          )}
        </button>
      </div>
      {confirmPasswordInput.isDirty && confirmPasswordInput.isEmpty ? (
        <span className={style.hintError}>{secondPasswordError}</span>
      ) : null}
      {!passwordInput.isMatch &&
      confirmPasswordInput.isDirty &&
      !confirmPasswordInput.isEmpty ? (
        <span className={style.hintError}>{passwordsIsMatchError}</span>
      ) : null}

      <div
        onBlur={(e) => secretWordInput.onBlur(e)}
        onFocus={(e) => secretWordInput.onFocus(e)}
        className={style.inputs}
      >
        <input
          placeholder="Секретное слово"
          value={secretWordInput.value}
          onChange={handleSecretWordValue}
        />
      </div>
      {secretWordInput.isDirty && secretWordInput.isEmpty ? (
        <span className={style.hintError}>{secretWordEmptyError}</span>
      ) : null}
      {!secretWordInput.isCustomValid && !secretWordInput.isEmpty ? (
        <span className={style.hintError}>{secretWordValidError}</span>
      ) : null}
      <span className={style.hintError}>
        Секретное слово нужно для дальнейшей смены пароля
      </span>
      <button
        onSubmit={(e) => e.preventDefault()}
        disabled={!isFormValid}
        className={
          !passwordInput.isMatch
            ? cn(style.button, style.button__wrap)
            : cn(style.button, style.button__wrap)
        }
        type="submit"
      >
        Зарегистрироваться
      </button>
    </AuthForms>
  );
};

export default SignUpForm;
