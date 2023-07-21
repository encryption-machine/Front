/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { useEffect, useState } from 'react';
import {
  emailRegExp,
  symbolsRegExp,
  numbersRegExp,
} from '../constants/regExp';

const useSignupValidator = ({
  password = '',
  confirmPassword = '',
  email = '',
  checkInputIsEmpty = '',
  length = { min: null, max: null },
  numberCheck = true,
  lengthCheck = true,
  uppercaseCheck = true,
  lowercaseCheck = true,
  specialCharCheck = true,
  custom = { regExp: '', value: '' },
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
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCustomValid, setIsCustomValid] = useState(false);
  const [minLengthValid, setMinLengthValid] = useState(false);
  const [maxLengthValid, setMaxLengthValid] = useState(false);
  const [isEmpty, setIsEmpty] = useState(null);

  useEffect(() => {
    if (lengthCheck) {
      if (password.length >= length.min) {
        setMinLengthValid(true);
        setMinLengthError(false);
      } else {
        setMinLengthValid(false);
        setMinLengthError(true);
      }

      if (password.length <= length.max) {
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
    numberCheck && setIsNumber(numbersRegExp.test(password));
    specialCharCheck && setSpecialChar(symbolsRegExp.test(password));
    setMatch(password && password === confirmPassword);
  }, [
    password,
    confirmPassword,
    length.min,
    length.max,
    lengthCheck,
    uppercaseCheck,
    lowercaseCheck,
    numberCheck,
    specialCharCheck,
    maxLengthValid,
    minLengthValid,
  ]);

  useEffect(() => {
    email && setIsEmailValid(emailRegExp.test(String(email).toLowerCase()));
  }, [isEmailValid, email]);

  useEffect(() => {
    if (custom.value && custom.regExp.test(String(custom.value))) {
      if (
        length.max &&
        length.min &&
        custom.regExp.test(String(custom.value))
      ) {
        // console.log('length');
        if (
          custom.value.length >= length.min &&
          custom.value.length <= length.max
        ) {
          setIsCustomValid(true);
        } else {
          setIsCustomValid(false);
        }
      } else if (
        !length.max &&
        !length.min &&
        custom.regExp.test(String(custom.value))
      ) {
        setIsCustomValid(true);
      }
    } else {
      setIsCustomValid(false);
    }
  }, [isCustomValid, custom.value, length.max, length.min, custom.regExp]);

  useEffect(() => {
    if (length.max === undefined || length.min === undefined) {
      console.error(
        'length.max or length.min undefined! Try `length: { min: Number, max: Number }`'
      );
    }
  }, [length.max, length.min]);

  useEffect(() => {
    if (checkInputIsEmpty.length === 0) {
      setIsEmpty(true);
    } else if (checkInputIsEmpty.length !== 0) {
      setIsEmpty(false);
    } else if (!!checkInputIsEmpty) {
      setIsEmpty(null);
    }

    // console.log(isEmpty);
    // console.log(checkInputIsEmpty);
  }, [checkInputIsEmpty, isEmpty]);

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
    isEmailValid,
    isSpecialChar,
    isValidLength,
    isUpperCase,
    isLowerCase,
    isNumber,
    isMatch,
    isEmpty,
    isCustomValid,
  };
};

export default useSignupValidator;
