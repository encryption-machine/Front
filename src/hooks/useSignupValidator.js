/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { useEffect, useState } from 'react';

const useSignupValidator = ({
  password = '',
  confirmPassword = '',
  emptyInputCheck = true,
  minLength = 6,
  maxLength = 8,
  numberCheck = true,
  lengthCheck = true,
  uppercaseCheck = true,
  lowercaseCheck = true,
  specialCharCheck = true,
}) => {
  const [isPasswordInputValid, setPasswordInputValid] = useState(false);
  const [isMinLengthError, setMinLengthError] = useState(false);
  const [isMaxLengthError, setMaxLengthError] = useState(false);
  const [isSpecialChar, setSpecialChar] = useState(false);
  const [isValidLength, setValidLength] = useState(false);
  const [isUpperCase, setUpperCase] = useState(false);
  const [isLowerCase, setLowerCase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isMatch, setMatch] = useState(false);
  const [minLengthValid, setMinLengthValid] = useState(false);
  const [maxLengthValid, setMaxLengthValid] = useState(false);

  useEffect(() => {
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
    maxLengthValid,
    minLengthValid,
  ]);

  useEffect(() => {
    isValidLength && isUpperCase && isNumber && isLowerCase && isSpecialChar
      ? setPasswordInputValid(true)
      : setPasswordInputValid(false);
  }, [
    isValidLength,
    isUpperCase,
    isNumber,
    isLowerCase,
    isSpecialChar,
    isPasswordInputValid,
  ]);

  return {
    isMinLengthError,
    isMaxLengthError,
    isPasswordInputValid,

    isSpecialChar,
    isValidLength,
    isUpperCase,
    isLowerCase,
    isNumber,
    isMatch,
  };
};

export default useSignupValidator;
