/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { useEffect, useState } from 'react';

const useSignupValidator = ({
  password = '',
  confirmPassword = '',
  email = '',
  emptyInputCheck = true,
  minLength = 6,
  maxLength = 8,
  numberCheck = true,
  lengthCheck = true,
  uppercaseCheck = true,
  lowercaseCheck = true,
  specialCharCheck = true,
  setErrMsg = '',
}) => {
  const [isEmptyInput, setEmptyInput] = useState(emptyInputCheck);
  const [isPasswordInputValid, setPasswordInputValid] = useState(false);
  const [isMinLengthError, setMinLengthError] = useState(false);
  const [isMaxLengthError, setMaxLengthError] = useState(false);
  const [isSpecialChar, setSpecialChar] = useState(false);
  const [isValidLength, setValidLength] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isUpperCase, setUpperCase] = useState(false);
  const [isLowerCase, setLowerCase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isMatch, setMatch] = useState(false);
  const [minLengthValid, setMinLengthValid] = useState(false);
  const [maxLengthValid, setMaxLengthValid] = useState(false);
  const [minLengthErrorMessage, setMinLengthErrorMessage] = useState('');
  const [maxLengthErrorMessage, setMaxLengthErrorMessage] = useState('');
  const [emptyErrorMessage, setEmptyErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [err, setErr] = useState(setErrMsg);

  //const inputs = [password, confirmPassword, email];

  //useEffect(() => {
  //  for (const validation in validations) {
  //    switch (validation) {
  //      case 'minLength':
  //        setMinLength(validations[validation]);
  //        if (value.length <= validations[validation]) {
  //          setMinLengthError(true);
  //        } else {
  //          setMinLengthError(false);
  //        }
  //        break;

  //      case 'maxLength':
  //        setMaxLength(validations[validation]);
  //        if (value.length >= validations[validation]) {
  //          setMaxLengthError(true);
  //        } else {
  //          setMaxLengthError(false);
  //        }
  //        break;

  //      case 'isEmpty':
  //        value ? setEmptyInput(false) : setEmptyInput(true);
  //        break;

  //      case 'isEmail':
  //        const re =
  //          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //        re.test(String(value).toLowerCase())
  //          ? setEmailError(false)
  //          : setEmailError(true);
  //        break;
  //    }
  //  }

  //  const setErrorMessage = () => {
  //    // оператор ...spred
  //    // errorMsg присваивать в конструкции try/catch из вне
  //    // избавиться от namePlaceholder
  //    setMaxLengthErrorMessage(
  //      `Поле "${namePlaceholder}" может содержать не более ${maxLength} символов`
  //    );

  //    setEmptyErrorMessage(`Поле "${namePlaceholder}" не может быть пустым`);
  //    //избавиться от typePlaceholder и передавать isEmail, isPassword, isConfirmPassword
  //    if (typePlaceholder === 'email' && isEmailError) {
  //      setEmailErrorMessage(`Некорректный ${namePlaceholder}`);
  //    } else if (typePlaceholder === 'password') {
  //      setMinLengthErrorMessage(
  //        `${namePlaceholder} должен содержать от ${minLength} до ${maxLength} символов, включая, как минимум, один цифровой и один не алфавитно цифровой символ`
  //      );
  //    }
  //  };
  //  setErrorMessage();
  //}, [value]);

  //useEffect(() => {
  //  if (isEmptyInput || isMaxLengthError || isMinLengthError || isEmailError) {
  //    setInputValid(false);
  //  } else {
  //    setInputValid(true);
  //  }
  //}, [isEmptyInput, isMaxLengthError, isMinLengthError, isEmailError]);

  useEffect(() => {
    setErrMsg && setErr(setErrMsg);

    //inputs ? setEmptyInput(false) : setEmptyInput(true);

    //console.log(minLength);

    if (lengthCheck) {
      if (password.length >= minLength) {
        setMinLengthValid(true);
        setMinLengthError(false);
      } else {
        setMinLengthValid(false);
        setMinLengthError(true);
      }

      if (password.length < maxLength) {
        setMaxLengthValid(true);
        setMaxLengthError(false);
      } else {
        setMaxLengthValid(false);
        setMaxLengthError(true);
      }

      maxLengthValid && minLengthValid
        ? setValidLength(true)
        : setValidLength(false);

      //console.log(`isMinLengthError ${isMinLengthError}`);
      //console.log(`isMaxLengthError ${isMaxLengthError}`);
    }

    uppercaseCheck && setUpperCase(password.toLowerCase() !== password);

    lowercaseCheck && setLowerCase(password.toUpperCase() !== password);

    numberCheck && setIsNumber(/\d/.test(password));

    specialCharCheck &&
      setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));

    setMatch(password && password === confirmPassword);
  }, [
    password,
    confirmPassword,
    minLength,
    lengthCheck,
    uppercaseCheck,
    lowercaseCheck,
    numberCheck,
    specialCharCheck,
    maxLength,
    setErrMsg,
    maxLengthValid,
    minLengthValid,
  ]);

  useEffect(() => {
    isValidLength && isUpperCase && isNumber && isLowerCase && isSpecialChar
      ? setPasswordInputValid(true)
      : setPasswordInputValid(false);

    //console.log(`isValidLength ${isValidLength}`);
    //console.log(`isUpperCase ${isUpperCase}`);
    //console.log(`isNumber ${isNumber}`);
    //console.log(`isLowerCase ${isLowerCase}`);
    //console.log(`isSpecialChar ${isSpecialChar}`);
    //console.log(`isPasswordInputValid ${isPasswordInputValid}`);
  }, [
    isValidLength,
    isUpperCase,
    isNumber,
    isLowerCase,
    isSpecialChar,
    isPasswordInputValid,
  ]);

  return {
    isEmptyInput,
    isEmailError,
    emailErrorMessage,
    isMinLengthError,
    isMaxLengthError,
    emptyErrorMessage,
    minLengthErrorMessage,
    maxLengthErrorMessage,
    isPasswordInputValid,

    isSpecialChar,
    isValidLength,
    isUpperCase,
    isLowerCase,
    isNumber,
    isMatch,
    err,
  };
};

export default useSignupValidator;
