import { useState } from 'react';
import useValidator from './useValidator';

const useInputValidation = (validations) => {
  const [isDirty, setDirty] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const valid = useValidator(validations);

  const onBlur = () => {
    setDirty(true);
    setFocus(false);
  };

  const onFocus = (value) => {
    setFocus(value);
  };

  return {
    onBlur,
    onFocus,
    isFocus,
    isDirty,
    ...valid,
    setDirty,
    setFocus,
  };
};

export default useInputValidation;
