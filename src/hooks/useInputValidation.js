import { useState } from 'react';
import useValidator from './useValidator';

const useInputValidation = (validations) => {
  const [isDirty, setDirty] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const valid = useValidator(validations);

  const onBlur = (e) => {
    setDirty(true);
    setFocus(false);
  };

  const onFocus = (e) => {
    setFocus(true);
  };

  return {
    onBlur,
    onFocus,
    isFocus,
    isDirty,
    ...valid,
  };
};

export default useInputValidation;
