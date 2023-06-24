/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import { useState, useEffect } from 'react';
import AuthForms from '../AuthForms/AuthForms';
//import cn from 'classnames';
import useInput from '../../hooks/useInput';
import { AppButton } from '../AppButton/AppButton';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignUpForm.module.scss';

const SignUpForm = () => {
  const email = useInput(
    '',
    { isEmpty: true, minLength: 6, isEmail: true, typePlaceholder: 'email' },
    'Email'
  );
  const password = useInput(
    '',
    { isEmpty: true, minLength: 6, maxLength: 8, typePlaceholder: 'password' },
    'Пароль'
  );
  const confirmPassword = useInput(
    '',
    { isEmpty: true, typePlaceholder: 'confirmPassword' },
    'Подтвердите пароль'
  );

  const [formValid, setFormValid] = useState(false);
  const [checked, setChecked] = useState(false);

  const chengeCheckbox = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (
      !email.inputValid ||
      !password.inputValid ||
      password.value !== confirmPassword.value ||
      !checked
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    checked,
    confirmPassword.value,
    email.inputValid,
    password.inputValid,
    password.value,
  ]);

  return (
    <AuthForms title={'Регистрация'}>
      <input
        onBlur={(e) => email.onBlur(e)}
        className={style.input}
        name="email"
        type="text"
        placeholder="Email"
        value={email.value}
        onChange={(e) => email.onChange(e)}
      />
      {email.isDirty && email.isEmpty && (
        <span className={style.error}>{email.emptyErrorMessage}</span>
      )}
      {email.isDirty && email.emailError && !email.isEmpty && (
        <span className={style.error}>{email.emailErrorMessage}</span>
      )}

      <input
        onBlur={(e) => password.onBlur(e)}
        className={style.input}
        name="password"
        type="password"
        placeholder="Пароль"
        value={password.value}
        onChange={(e) => password.onChange(e)}
      />
      {password.isDirty && password.isEmpty && (
        <span className={style.error}>{password.emptyErrorMessage}</span>
      )}
      {password.isDirty && password.minLengthError && !password.isEmpty && (
        <span className={style.error}>{password.minLengthErrorMessage}</span>
      )}
      {password.isDirty && password.maxLengthError && (
        <span className={style.error}>{password.maxLengthErrorMessage}</span>
      )}

      <input
        onBlur={(e) => confirmPassword.onBlur(e)}
        className={style.input}
        name="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        value={confirmPassword.value}
        onChange={(e) => confirmPassword.onChange(e)}
      />

      {confirmPassword.isDirty && confirmPassword.isEmpty && (
        <span className={style.error}>Поле не может быть пустым</span>
      )}
      {confirmPassword.isDirty && confirmPassword.minLengthError && (
        <span className={style.error}>Некорректная длина</span>
      )}
      <AppButton
        isButtonDisabled={!formValid}
        action={undefined}
        //className={!formValid ? cn(style.disabled, style.button) : style.button}
        typeClass="secondary"
        type="submit"
      >
        Зарегистрироваться
      </AppButton>
      <div className={styleLocal.confirm}>
        {' '}
        <input
          type="checkbox"
          checked={checked}
          onChange={chengeCheckbox}
        />{' '}
        <span className={styleLocal.confirm__text}>
          {' '}
          Я даю согласие на обработку моих персональных данных{' '}
        </span>
      </div>
    </AuthForms>
  );
};

export default SignUpForm;
