import { useState, useEffect } from 'react';
import AuthForms from '../AuthForms/AuthForms';
import useInputValidation from '../../hooks/useInputValidation';
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  AnswerInput,
  SecretQuestionInput,
} from '../AuthFormsInputs/AuthFormsInputs';
import { answerRegExp, secretQuestionRegExp } from '../../constants/regExp';
import FormButton from '../FormButton/FormButton';

const SignUpForm = () => {
  // Set values
  const [passwordsValue, setPasswordsValue] = useState({
    firstPassword: '',
    secondPassword: '',
  });
  const [emailValue, setEmailValue] = useState('');
  const [answerValue, setAnswerValue] = useState('');
  const [secretQuestionValue, setSecretQuestionValue] = useState('');

  // errors
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [answerEmptyError, setAnswerEmptyError] = useState('');
  const [answerValidError, setAnswerValidError] = useState('');
  const [secretQuestionEmptyError, setSecretQuestionEmptyError] = useState('');
  const [secretQuestionValidError, setSecretQuestionValidError] = useState('');
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

  const handleAnswerValue = (e) => {
    setAnswerValue(e.target.value);
  };

  const handleSecretQuestionValue = (e) => {
    setSecretQuestionValue(e.target.value);
  };

  const [isFormValid, setIsFormValid] = useState(false);

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

  const secretQuestionInput = useInputValidation({
    checkInputIsEmpty: secretQuestionValue,
    custom: {
      regExp: secretQuestionRegExp,
      value: secretQuestionValue,
    },
    length: { min: 6, max: 8 },
  });

  const answerInput = useInputValidation({
    checkInputIsEmpty: answerValue,
    custom: {
      regExp: answerRegExp,
      value: answerValue,
    },
    length: { min: 3, max: 4 },
  });

  useEffect(() => {
    passwordInput.isPasswordInputValid &&
    emailInput.isEmailValid &&
    passwordInput.isMatch &&
    answerInput.isCustomValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [
    emailInput.isEmailValid,
    passwordInput.isMatch,
    passwordInput.isPasswordInputValid,
    answerInput.isCustomValid,
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
    answerInput.isDirty && answerInput.isEmpty
      ? setAnswerEmptyError('Поле "Ответ" не может быть пустым')
      : setAnswerEmptyError('');
    answerInput.isCustomValid
      ? setAnswerValidError('')
      : setAnswerValidError(
          'Ответ должен содержать от 3 до 42 латинских или кирилических букв, состоять из одного слова, без пробелов, цифр и знаков'
        );
    secretQuestionInput.isDirty && secretQuestionInput.isEmpty
      ? setSecretQuestionEmptyError(
          'Поле "Секретный вопрос" не может быть пустым'
        )
      : setSecretQuestionEmptyError('');
    secretQuestionInput.isCustomValid
      ? setSecretQuestionValidError('')
      : setSecretQuestionValidError(
          'Секретный вопрос должен содержать от 3 до 42 латинских или кирилических букв, состоять из одного слова, без пробелов, цифр и знаков'
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
    answerInput.isDirty,
    answerInput.isEmpty,
    answerInput.isCustomValid,
    passwordInput.isPasswordInputValid,
    passwordInput.isMatch,
    secretQuestionInput.isDirty,
    secretQuestionInput.isEmpty,
    secretQuestionInput.isCustomValid,
  ]);

  const resetForm = () => {
    setEmailValue('');
    setPasswordsValue({
      firstPassword: '',
      secondPassword: '',
    });
    setAnswerValue('');
    setIsFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

      <SecretQuestionInput
        value={secretQuestionValue}
        onBlur={secretQuestionInput.onBlur}
        onFocus={secretQuestionInput.onFocus}
        onChange={handleSecretQuestionValue}
        isDirty={secretQuestionInput.isDirty}
        isEmpty={secretQuestionInput.isEmpty}
        isFocus={secretQuestionInput.isFocus}
        emptyError={secretQuestionEmptyError}
        validError={secretQuestionValidError}
        isCustomValid={secretQuestionInput.isCustomValid}
        placeholder="Секретный вопрос"
        label="Секретный вопрос"
        onClickClearButton={(e) =>
          handleClearButton(e, () => setSecretQuestionValue(''))
        }
      />

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

      <FormButton onSubmit={(e) => e.preventDefault()} disabled={!isFormValid}>
        Зарегистрироваться
      </FormButton>
    </AuthForms>
  );
};

export default SignUpForm;
