import cn from 'classnames';
import { nanoid } from 'nanoid';
import viewPassword from '../../assets/icons/view.svg';
import hidePassword from '../../assets/icons/hide.svg';
import clearPassword from '../../assets/icons/close.svg';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './AuthFormsInputs.module.scss';

const setClasses = (
  dirty,
  empty,
  customMatch,
  focus,
  classesOnError = [],
  classesOnFocus = [],
  defaultClasses = []
) => {
  if ((dirty && empty) || (dirty && !customMatch)) {
    return cn(classesOnError);
  } else if (focus && !empty) {
    return cn(classesOnFocus);
  } else {
    return cn(defaultClasses);
  }
};

const ClearButton = ({
  onBlur,
  onFocus,
  onClickClearButton,
  isFocus,
  value,
}) => {
  return (
    <button
      onBlur={() => onBlur}
      onFocus={() => onFocus}
      onClick={onClickClearButton}
      className={
        !isFocus
          ? styleLocal.unfocused
          : cn(styleLocal.focused, styleLocal.clearButton)
      }
    >
      {value ? <img src={clearPassword} alt="Отчистить" /> : null}
    </button>
  );
};

export const EmailInput = ({
  value,
  onBlur,
  onFocus,
  onChange,
  isDirty,
  isEmpty,
  isFocus,
  emptyError,
  isEmailValid,
  emailValidError,
  classesOnError = [
    style.inputs,
    style.input,
    style.inputs__hint,
    style.inputs__hint_email,
  ],
  classesOnFocus = [
    style.inputs,
    style.input,
    style.inputs__label_email,
  ],
  defaultClasses = [style.input, style.inputs],
  onClickClearButton,
}) => {
  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(
          isDirty,
          isEmpty,
          isEmailValid,
          isFocus,
          classesOnError,
          classesOnFocus,
          defaultClasses
        )}
      >
        <input
          className={style.input}
          name="email"
          type="text"
          placeholder="E-mail"
          value={value}
          onChange={onChange}
        />

        <ClearButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickClearButton={onClickClearButton}
          isFocus={isFocus}
          value={value}
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
  onFocus,
  isFocus,
  isDirty,
  isEmpty,
  onChange,
  emptyError,
  showPassword,
  clickShowPassword,
  onClickShowButton,
  onClickClearButton,
  passwordValidError,
  isPasswordInputValid,
  classesOnError = [
    style.inputs,
    style.inputs__hint,
    style.inputs__hint_password,
    style.input,
  ],
  classesOnFocus = [
    style.input,
    style.inputs,
    style.inputs__label_password,
  ],
  defaultClasses = [style.input, style.inputs],
}) => {
  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(
          isDirty,
          isEmpty,
          isPasswordInputValid,
          isFocus,
          classesOnError,
          classesOnFocus,
          defaultClasses
        )}
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
          onClick={onClickShowButton}
          className={!isFocus ? styleLocal.unfocused : styleLocal.focused}
        >
          {!clickShowPassword ? (
            <img src={hidePassword} alt="Показать" />
          ) : (
            <img src={viewPassword} alt="Скрыть" />
          )}
        </button>

        <ClearButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickClearButton={onClickClearButton}
          isFocus={isFocus}
          value={value}
        />
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
  onClickShowButton,
  onClickClearButton,
  classesOnError = [
    style.inputs,
    style.inputs__hint,
    style.inputs__hint_password,
    style.input,
  ],
  classesOnFocus = [
    style.input,
    style.inputs,
    style.inputs__label_password,
  ],
  defaultClasses = [style.input, style.inputs],
}) => {
  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(
          isDirty,
          isEmpty,
          isMatch,
          isFocus,
          classesOnError,
          classesOnFocus,
          defaultClasses
        )}
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
          onClick={onClickShowButton}
          className={!isFocus ? styleLocal.unfocused : styleLocal.focused}
        >
          {!clickShowPassword ? (
            <img src={hidePassword} alt="Показать" />
          ) : (
            <img src={viewPassword} alt="Скрыть" />
          )}
        </button>
        <button
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClickClearButton}
          className={
            !isFocus
              ? styleLocal.unfocused
              : cn(styleLocal.focused, styleLocal.clearButton)
          }
        >
          {value ? <img src={clearPassword} alt="Отчистить" /> : null}
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

export const SecretQuestionInput = ({
  value,
  onBlur,
  onFocus,
  isDirty,
  isEmpty,
  isFocus,
  onChange,
  emptyError,
  validError,
  isCustomValid,
  classesOnError = [
    style.inputs,
    style.input, 
    style.inputs__hint,
    style.inputs__hint_secretQuestion,
  ],
  classesOnFocus = [style.inputs, style.input,  style.inputs__label_secretQuestion],
  defaultClasses = [style.inputs, style.input],
  onClickClearButton,
}) => {
  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(
          isDirty,
          isEmpty,
          isCustomValid,
          isFocus,
          classesOnError,
          classesOnFocus,
          defaultClasses
        )}
      >
        <input
          placeholder="Секретный вопрос"
          value={value}
          onChange={onChange}
        />

        <ClearButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickClearButton={onClickClearButton}
          isFocus={isFocus}
          value={value}
        />
      </div>

      {isDirty && isEmpty ? (
        <span className={style.hintError}>{emptyError}</span>
      ) : null}
      {!isCustomValid && !isEmpty ? (
        <span className={style.hintError}>{validError}</span>
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
  isFocus,
  onChange,
  emptyError,
  validError,
  isCustomValid,
  classesOnError = [
    style.inputs,
    style.input, 
    style.inputs__hint,
    style.inputs__hint_answer,
  ],
  classesOnFocus = [style.inputs, style.input,  style.inputs__label_answer],
  defaultClasses = [style.inputs, style.input],
  onClickClearButton,
}) => {
  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(
          isDirty,
          isEmpty,
          isCustomValid,
          isFocus,
          classesOnError,
          classesOnFocus,
          defaultClasses
        )}
      >
        <input
          placeholder="Секретное слово"
          value={value}
          onChange={onChange}
        />

        <ClearButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickClearButton={onClickClearButton}
          isFocus={isFocus}
          value={value}
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
