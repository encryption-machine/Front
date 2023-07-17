import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { formStore } from '../../store';
import { ChangePasswordForm as form } from './ChangePasswordForm';
import { EmailInput } from '../AuthFormsInputs/AuthFormsInputs';
import FormButton from '../FormButton/FormButton';
import useInputValidation from '../../hooks/useInputValidation';
import styles from './ChangePasswordForm.module.scss';

// тест по отправке апи запроса для восстановления пароля
import * as apiPasswordRecovery from '../../utils/apiPasswordRecovery';


const ChangePasswordForm = observer(() => {
  const [emailValue, setEmailValue] = useState('');

  // тест по отправке апи запроса для восстановления пароля
  const [idUser, setIdUser] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('!One0987');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('!One0987');
  const [serverErrorMessage, setServerErrorMessage] = useState('')


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
    setServerErrorMessage('');
    callback();
  };


  const handleSubmit = (e, bool) => {
    e.preventDefault()
    console.log("Я ТУТУТУТУ")

    // тест по отправке запросов на сервера по восстановлению пароля
    apiPasswordRecovery.sendEmail(emailValue)
      .then((res) => {
        if (res) {
          // ответ с сервера, который надо вставить в placeholder формы
          const question = res.question;
          const idUser = res.id;
          console.log('res', res);
          console.log('question', question);
          console.log('idUser', idUser);
          setIdUser(idUser);
          setQuestion(question);
          // return question
          formStore.setShowChangePasswordFormAnswer(!bool);
        } else {
          console.log('ERR 1')
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log('Пользователь с таким Email не найден')
          setServerErrorMessage('Пользователь с таким Email не найден')
        } else {
          console.log('ERR 2', err)
        }
      })


  }

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
            {serverErrorMessage && <div>{serverErrorMessage}</div>}
            <FormButton onClick={handleSubmit}>
              Далее
            </FormButton>
          </div>
        </form.email>
      )}
      {formStore.showChangePasswordFormAnswer && (
        <form.answer>
          <div>{question}</div>
          <FormButton onClick={formStore.setShowChangePasswordFormEmail}>
            Далее
          </FormButton>
        </form.answer>
      )}
    </form.container>
  );
});

export default ChangePasswordForm;
