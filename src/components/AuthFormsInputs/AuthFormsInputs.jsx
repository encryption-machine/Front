import cn from 'classnames';
import { nanoid } from 'nanoid';
import viewPassword from '../../assets/icons/view.svg';
import hidePassword from '../../assets/icons/hide.svg';
import clearPassword from '../../assets/icons/close.svg';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './AuthFormsInputs.module.scss';

const styles = Object.assign(style, styleLocal);

const setClasses = (dirty, empty, customMatch, focus) => {
  if ((dirty && empty) || (dirty && !customMatch)) {
    return cn(
      styles.input,
      styles.inputs,
      styles.label__error,
      styles.inputs__hint,
      styles.label__placeholder
    );
  } else if (focus && !empty) {
    return cn(
      styles.input,
      styles.inputs,
      styles.label__focus,
      styles.label__placeholder
    );
  } else if ((dirty && !focus && !empty) || (!dirty && focus && empty)) {
    return cn(
      styles.input,
      styles.inputs,
      styles.label__empty,
      styles.label__placeholder
    );
  } else {
    return cn(styles.input, styles.inputs, styles.label__placeholder);
  }
};

const ClearButton = ({
  onBlur,
  onFocus,
  onClickClearButton,
  isFocus,
  value,
}) => (
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

const ShowPasswordButton = ({
  onBlur,
  onFocus,
  onClickShowButton,
  isFocus,
  clickShowPassword,
}) => (
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
);

const Label = ({ children, htmlFor }) => (
  <label className={styles.label} htmlFor={htmlFor}>
    {children}
  </label>
);

export const EmailInput = ({
  value,
  label,
  onBlur,
  onFocus,
  onChange,
  isDirty,
  isEmpty,
  isFocus,
  emptyError,
  placeholder,
  isValid,
  validError,
  onClickClearButton,
}) => {
  const name = 'email';

  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(isDirty, isEmpty, isValid, isFocus)}
      >
        <input
          className={cn(styles.input, styles.textField)}
          name={name}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={name}
        />

        <Label htmlFor={name}>{label}</Label>

        <ClearButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickClearButton={onClickClearButton}
          isFocus={isFocus}
          value={value}
        />
      </div>

      {isDirty && isEmpty ? (
        <span className={styles.hintError}>{emptyError}</span>
      ) : null}

      {isDirty && !isValid && !isEmpty ? (
        <div>
          {validError.map((error) => (
            <div
              className={cn(styles.hintError, styles.hintError__wrap)}
              key={nanoid()}
            >
              <span className={styles.hintError__title}>
                {error.error_title}
              </span>
              <span>{error.format}</span>
              <ul className={styles.hintError__list}>
                {error.list_title}
                {error.items.map((item) => (
                  <li key={nanoid()} className={styles.hintError__item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export const PasswordInput = ({
  value,
  label,
  onBlur,
  onFocus,
  isFocus,
  isDirty,
  isEmpty,
  onChange,
  emptyError,
  placeholder,
  showPassword,
  clickShowPassword,
  onClickShowButton,
  onClickClearButton,
  validError,
  isValid,
}) => {
  const name = 'password';

  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(isDirty, isEmpty, isValid, isFocus)}
      >
        <input
          className={cn(styles.input, styles.textField)}
          name={name}
          type={showPassword}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={name}
        />

        <Label htmlFor={name}>{label}</Label>

        <ShowPasswordButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickShowButton={onClickShowButton}
          isFocus={isFocus}
          clickShowPassword={clickShowPassword}
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
        <span className={styles.hintError}>{emptyError}</span>
      ) : null}

      {isDirty && !isValid && !isEmpty ? (
        <div className={cn(styles.hintError, styles.hintError__wrap)}>
          {validError.map((error) => (
            <ul key={nanoid()} className={styles.hintError__list}>
              {error.list_title}
              {error.items.map((item) => (
                <li key={nanoid()} className={styles.hintError__item}>
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      ) : null}
    </>
  );
};

export const ConfirmPasswordInput = ({
  value,
  label,
  onBlur,
  onFocus,
  isFocus,
  isDirty,
  isEmpty,
  isValid,
  onChange,
  emptyError,
  validError,
  placeholder,
  showPassword,
  clickShowPassword,
  onClickShowButton,
  onClickClearButton,
}) => {
  const name = 'confirm-password';

  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(isDirty, isEmpty, isValid, isFocus)}
      >
        <input
          className={cn(styles.input, styles.textField)}
          id={name}
          name={name}
          type={showPassword}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <Label htmlFor={name}>{label}</Label>

        <ShowPasswordButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickShowButton={onClickShowButton}
          isFocus={isFocus}
          clickShowPassword={clickShowPassword}
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
        <span className={styles.hintError}>{emptyError}</span>
      ) : null}
      {!isValid && isDirty && !isEmpty ? (
        <span className={styles.hintError}>{validError}</span>
      ) : null}
    </>
  );
};

export const SecretQuestionInput = ({
  value,
  label,
  onBlur,
  onFocus,
  isDirty,
  isEmpty,
  isFocus,
  onChange,
  emptyError,
  validError,
  placeholder,
  isValid,
  onClickClearButton,
}) => {
  const name = 'secret-question';

  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(isDirty, isEmpty, isValid, isFocus)}
      >
        <input
          id={name}
          name={name}
          className={cn(styles.input, styles.textField)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <Label htmlFor={name}>{label}</Label>

        <ClearButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickClearButton={onClickClearButton}
          isFocus={isFocus}
          value={value}
        />
      </div>

      {isDirty && isEmpty ? (
        <span className={styles.hintError}>{emptyError}</span>
      ) : null}
      {!isValid && !isEmpty ? (
        <span className={styles.hintError}>{validError}</span>
      ) : null}
    </>
  );
};

export const AnswerInput = ({
  value,
  label,
  onBlur,
  onFocus,
  isDirty,
  isEmpty,
  isFocus,
  onChange,
  emptyError,
  validError,
  isValid,
  placeholder,
  onClickClearButton,
}) => {
  const name = 'answer';

  return (
    <>
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className={setClasses(isDirty, isEmpty, isValid, isFocus)}
      >
        <input
          id={name}
          name={name}
          className={cn(styles.input, styles.textField)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <Label htmlFor={name}>{label}</Label>

        <ClearButton
          onBlur={onBlur}
          onFocus={onFocus}
          onClickClearButton={onClickClearButton}
          isFocus={isFocus}
          value={value}
        />
      </div>

      {isDirty && isEmpty ? (
        <span className={styles.hintError}>{emptyError}</span>
      ) : null}
      {!isValid && !isEmpty ? (
        <span className={styles.hintError}>{validError}</span>
      ) : null}
    </>
  );
};
