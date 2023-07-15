import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from '../../store';
import { ChangePasswordForm as form } from './ChangePasswordForm';
import { EmailInput } from '../AuthFormsInputs/AuthFormsInputs';
import FormButton from '../FormButton/FormButton';
import useInputValidation from '../../hooks/useInputValidation';
import styles from './ChangePasswordForm.module.scss';

const ChangePasswordForm = observer(() => {
  const [emailValue, setEmailValue] = useState('');
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const emailValidError = [
    {
      error_title: 'Недопустимые символы.',
      list_title: 'Допустимые символы:',
      item_1: 'цифры',
      item_2: 'латинские буквы',
      item_3: '«_», «-», «@» и «.»',
    },
  ];
  const handleEmailValue = (e) => {
    setEmailValue(e.target.value);
  };
  const emailInput = useInputValidation({
    checkInputIsEmpty: emailValue,
    email: emailValue,
  });

  useEffect(() => {
    emailInput.isDirty && emailInput.isEmpty
      ? setEmailEmptyError('Поле "E-mail" не может быть пустым')
      : setEmailEmptyError('');
  }, [emailInput.isDirty, emailInput.isEmailValid, emailInput.isEmpty]);

  const handleClearButton = (e, callback) => {
    e.preventDefault();
    callback();
  };

  return (
    <form.container>
      {formStore.showChangePasswordFormEmail && (
        <form.email>
          <div className={styles.container}>
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
            />
            <FormButton onClick={formStore.setShowChangePasswordFormAnswer}>
              Далее
            </FormButton>
          </div>
        </form.email>
      )}
      {formStore.showChangePasswordFormAnswer && (
        <form.answer>
          <div>answer</div>
          <FormButton onClick={formStore.setShowChangePasswordFormEmail}>
            Далее
          </FormButton>
        </form.answer>
      )}
    </form.container>
  );
});

export default ChangePasswordForm;
