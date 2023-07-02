import cn from 'classnames';
import { nanoid } from 'nanoid';
import viewPassword from '../../assets/icons/view.svg';
import hidePassword from '../../assets/icons/hide.svg';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './AuthFormsInputs.module.scss';

export const EmailInput = ({
  value,
  onBlur,
  isDirty,
  isEmpty,
  onChange,
  emptyError,
  isEmailValid,
  emailValidError,
}) => {
  return (
    <>
      <div onBlur={onBlur} className={style.inputs}>
        <input
          className={style.input}
          name="email"
          type="text"
          placeholder="E-mail"
          value={value}
          onChange={onChange}
        />
      </div>

      {isDirty && isEmpty ? (
        <span className={style.hintError}>{emptyError}</span>
      ) : null}

      {isDirty && !isEmailValid && !isEmpty ? (
        <div>
          {emailValidError.map((error) => {
            return (
              <div
                className={cn(style.hintError, style.hintError__wrap)}
                key={nanoid()}
              >
                <span className={style.hintError__title}>
                  {error.error_title}
                </span>
                <ul className={style.hintError__list}>
                  {error.list_title}
                  <li className={style.hintError__item}>{error.item_1}</li>
                  <li className={style.hintError__item}>{error.item_2}</li>
                  <li className={style.hintError__item}>{error.item_3}</li>
                </ul>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export const PasswordInput = ({
  value,
  onBlur,
  onClick,
  onFocus,
  isFocus,
  isDirty,
  isEmpty,
  onChange,
  emptyError,
  showPassword,
  clickShowPassword,
  passwordValidError,
  isPasswordInputValid,
}) => {
  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={cn(styleLocal.input__password, style.inputs)}
      >
        <input
          className={style.input}
          name="password"
          type={showPassword}
          placeholder="Пароль"
          value={value}
          onChange={onChange}
        />

        <button
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          className={!isFocus ? styleLocal.unfocused : styleLocal.focused}
        >
          {clickShowPassword ? (
            <img src={hidePassword} alt="" />
          ) : (
            <img src={viewPassword} alt="" />
          )}
        </button>
      </div>
      {isDirty && isEmpty ? (
        <span className={style.hintError}>{emptyError}</span>
      ) : null}
      {isDirty && !isPasswordInputValid && !isEmpty ? (
        <div className={cn(style.hintError, style.hintError__wrap)}>
          {passwordValidError.map((error) => {
            return (
              <ul key={nanoid()} className={style.hintError__list}>
                {error.list_title}
                <li className={style.hintError__item}>{error.item_1}</li>
                <li className={style.hintError__item}>{error.item_2}</li>
                <li className={style.hintError__item}>{error.item_3}</li>
                <li className={style.hintError__item}>{error.item_4}</li>
                <li className={style.hintError__item}>{error.item_5}</li>
              </ul>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export const ConfirmPasswordInput = ({
  value,
  onBlur,
  onClick,
  onFocus,
  isFocus,
  isDirty,
  isEmpty,
  isMatch,
  onChange,
  emptyError,
  matchError,
  showPassword,
  clickShowPassword,
}) => {
  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={cn(styleLocal.input__password, style.inputs)}
      >
        <input
          className={style.input}
          name="confirmPassword"
          type={showPassword}
          placeholder="Еще раз пароль"
          value={value}
          onChange={onChange}
        />

        <button
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
          className={!isFocus ? styleLocal.unfocused : styleLocal.focused}
        >
          {clickShowPassword ? (
            <img src={hidePassword} alt="" />
          ) : (
            <img src={viewPassword} alt="" />
          )}
        </button>
      </div>
      {isDirty && isEmpty ? (
        <span className={style.hintError}>{emptyError}</span>
      ) : null}
      {!isMatch && isDirty && !isEmpty ? (
        <span className={style.hintError}>{matchError}</span>
      ) : null}
    </>
  );
};

export const SecretWordInput = ({
  value,
  onBlur,
  onFocus,
  isDirty,
  isEmpty,
  onChange,
  emptyError,
  validError,
  isCustomValid,
}) => {
  return (
    <>
      <div onBlur={onBlur} onFocus={onFocus} className={style.inputs}>
        <input
          placeholder="Секретное слово"
          value={value}
          onChange={onChange}
        />
      </div>
      {isDirty && isEmpty ? (
        <span className={style.hintError}>{emptyError}</span>
      ) : null}
      {!isCustomValid && !isEmpty ? (
        <span className={style.hintError}>{validError}</span>
      ) : null}
      <span className={style.hintError}>
        Секретное слово нужно для дальнейшей смены пароля
      </span>
    </>
  );
};
