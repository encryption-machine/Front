import { useState } from 'react';
import useSignupValidator from './useSignupValidator';

const useInputValidation = (validations) => {
  const [isDirty, setDirty] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const valid = useSignupValidator(validations);

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
