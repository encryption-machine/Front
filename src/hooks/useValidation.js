/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { useEffect, useState } from 'react';

const useValidation = (value, validations, namePlaceholder) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState('');
  const [minLengthError, setMinLengthError] = useState(false);
  const [minLengthErrorMessage, setMinLengthErrorMessage] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [maxLengthErrorMessage, setMaxLengthErrorMessage] = useState('');
  const [emptyErrorMessage, setEmptyErrorMessage] = useState('');
  const [typePlaceholder, setTypePlaceholder] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          setMinLength(validations[validation]);
          if (value.length < validations[validation]) {
            setMinLengthError(true);
          } else {
            setMinLengthError(false);
          }
          break;

        case 'maxLength':
          setMaxLength(validations[validation]);
          if (value.length > validations[validation]) {
            setMaxLengthError(true);
          } else {
            setMaxLengthError(false);
          }
          break;

        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;

        case 'typePlaceholder':
          setTypePlaceholder(validations[validation]);
          break;

        case 'isEmail':
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          re.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
      }
    }

    const setErrorMessage = () => {
      setMaxLengthErrorMessage(
        `Поле "${namePlaceholder}" может содержать не более ${maxLength} символов`
      );

      setEmptyErrorMessage(`Поле "${namePlaceholder}" не может быть пустым`);

      if (typePlaceholder === 'email' && emailError) {
        setEmailErrorMessage(`Некорректный ${namePlaceholder}`);
      } else if (typePlaceholder === 'password') {
        setMinLengthErrorMessage(
          `${namePlaceholder} должен содержать от ${minLength} до ${maxLength} символов, включая, как минимум, один цифровой и один не алфавитно цифровой символ`
        );
      }
    };
    setErrorMessage();
  }, [value]);

  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError]);

  return {
    isEmpty,
    emailError,
    emailErrorMessage,
    minLengthError,
    maxLengthError,
    emptyErrorMessage,
    minLengthErrorMessage,
    maxLengthErrorMessage,
    typePlaceholder,
    inputValid,
  };
};

export default useValidation;
