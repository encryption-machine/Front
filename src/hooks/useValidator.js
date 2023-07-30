import { useEffect, useState } from 'react';

const useValidator = ({
  length = { from: null, to: null },
  regExp = /./,
  value = '',
  compare = '',
}) => {
  const [isValid, setValid] = useState(false);
  const [isEmpty, setEmpty] = useState(null);
  const [isMatch, setMatch] = useState(false);

  useEffect(() => {
    if (value && regExp.test(String(value))) {
      if (length.to && length.from && regExp.test(String(value))) {
        if (value.length >= length.from && value.length <= length.to) {
          setValid(true);
        } else {
          setValid(false);
        }
      } else if (!length.to && !length.from && regExp.test(String(value))) {
        setValid(true);
      }
    } else {
      setValid(false);
    }
  }, [isValid, value, length.to, length.from, regExp]);

  useEffect(() => {
    if (length.to === undefined || length.from === undefined) {
      console.error(
        'length.to or length.from undefined! Try `length: { from: Number, to: Number }`'
      );
    }
  }, [length.to, length.from]);

  useEffect(() => {
    if (value.length === 0) {
      setEmpty(true);
    } else if (value.length !== 0) {
      setEmpty(false);
    } else if (!!value) {
      setEmpty(null);
    }
  }, [value]);

  useEffect(() => {
    setMatch(value && value === compare);
  }, [value, compare]);

  return {
    isEmpty,
    isValid,
    isMatch,
  };
};

export default useValidator;
