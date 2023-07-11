import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import AuthForms from '../AuthForms/AuthForms';
import { EmailInput, PasswordInput } from '../AuthFormsInputs/AuthFormsInputs';
import useInputValidation from '../../hooks/useInputValidation';
import style from '../AuthForms/AuthForms.module.scss';
/////////Авторизация//////
import { postApiAutorisation, postApiAuthorizeRefresh, postApiAuthorizeVerify, getCookie } from '../../utils/Auth.js';
import { useNavigate } from 'react-router-dom';
/////////////////////////

const SignInForm = () => {
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // errors
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
  const [firstPasswordError, setFirstPasswordError] = useState('');
  const [passwordValidError, setPasswordValidError] = useState([]);

  // Set show
  const [showPassword, setShowPassword] = useState('password');
  const [clickShowPassword, setClickShowPassword] = useState(false);

  // handlers
  const handleFirstPasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleEmailValue = (e) => {
    setEmailValue(e.target.value);
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setClickShowPassword(!clickShowPassword);
  };

  const passwordInput = useInputValidation({
    checkInputIsEmpty: passwordValue,
    password: passwordValue,
    length: { min: 6, max: 8 },
  });

  const emailInput = useInputValidation({
    checkInputIsEmpty: emailValue,
    email: emailValue,
  });

  useEffect(() => {
    passwordInput.isPasswordInputValid && emailInput.isEmailValid
      ? setIsFormValid(true)
      : setIsFormValid(false);
  }, [emailInput.isEmailValid, passwordInput.isPasswordInputValid]);

  // Change show passwords
  useEffect(() => {
    clickShowPassword ? setShowPassword('text') : setShowPassword('password');
  }, [clickShowPassword]);

  // Set errors
  useEffect(() => {
    passwordInput.isDirty && passwordInput.isEmpty
      ? setFirstPasswordError('Поле "Пароль" не может быть пустым')
      : setFirstPasswordError('');
    emailInput.isDirty && emailInput.isEmpty
      ? setEmailEmptyError('Поле "E-mail" не может быть пустым')
      : setEmailEmptyError('');
    //emailInput.isEmailValid
    //  ? setEmailValidError('')
    //  : setEmailValidError([
    //      {
    //        error_title: 'Недопустимые символы.',
    //        list_title: 'Допустимые символы:',
    //        item_1: 'цифры',
    //        item_2: 'латинские буквы',
    //        item_3: '«_», «-», «@» и «.»',
    //      },
    //    ]);
    passwordInput.isPasswordInputValid
      ? setPasswordValidError('')
      : setPasswordValidError([
          {
            list_title: 'Пароль должен содержать:',
            item_1: 'от 6 до 8 символов',
            item_2: 'цифры',
            item_3: 'заглавные буквы',
            item_4: 'строчные буквы ',
            item_5: 'специальные символы',
          },
        ]);
  }, [
    emailInput.isDirty,
    emailInput.isEmailValid,
    passwordInput.isDirty,
    passwordInput.isEmpty,
    emailInput.isEmpty,
    passwordInput.isPasswordInputValid,
    passwordInput.isMatch,
  ]);
   /////////Авторизация//////
  const navigate = useNavigate();
  const handleLogin = (email, password) => {
    console.log(email, password, '--authorize,email, password');
    return postApiAutorisation(email, password)
    .then((data) =>{
      //в (data) должны прийти два токена access и refresh
      console.log(data, '--authorize,data'); 
      //токен обновления refresh
      const refresh = data.refresh;
    
      if(data.access) {
        //если получили токен доступа access
        //токен доступа access в куки, максимальное время хранения 1 час (max-age=3600)?
        document.cookie = `access=${data.access}; max-age=3600`;

        // и отправляем на главную страницу?
        navigate('/');

       } if(!data.access) {
          //если не получили токен доступа access
          //отправляем токен обновления на сервер
          //проверяем действителен ли токен обновления
          postApiAuthorizeVerify(refresh)
          .then((data) =>{
            if(data) {
              //если токен обновления действителен, отправляем токен обновления на сервер
              /////Принимает веб-токен JSON типа обновления и возвращает веб-токен JSON типа доступа 
              postApiAuthorizeRefresh(refresh)
              .then((data) =>{
                // получили токен доступа access
                if(data.access) {
                  //если получили токен доступа access
                  //токен доступа access в куки, максимальное время хранения 1 час (max-age=3600)?
                  document.cookie = `access=${data.access}; max-age=3600`;
            
                  // и отправляем на главную страницу?
                  navigate('/');
                }
              }).catch(err => {
                console.log(err, '--authorizeRefresh,err');
              });
            }
                
          }).catch(err => {
            console.log(err, '--token,err');
          });
        
        }
      }).catch(err => {
        console.log(err, '--authorize,err');
      });
    }
  /////////////////////////
  
  const resetForm = () => {
    setEmailValue('');
    setPasswordValue('');
    setIsFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    /////////Авторизация//////
    if(!emailValue || !passwordValue) return;
    handleLogin(emailValue, passwordValue);
    /////////////////////////

    resetForm();
  };

  return (
    <AuthForms onSubmit={handleSubmit}>
      <EmailInput
        value={emailValue}
        onBlur={(e) => emailInput.onBlur(e)}
        isDirty={emailInput.isDirty}
        isEmpty={emailInput.isEmpty}
        isEmailValid={emailInput.isEmailValid}
        emptyError={emailEmptyError}
        onChange={handleEmailValue}
        emailValidError={emailValidError}
      />

      <PasswordInput
        value={passwordValue}
        onBlur={passwordInput.onBlur}
        onClick={(e) => handleShowPassword(e)}
        onFocus={passwordInput.onFocus}
        isFocus={passwordInput.isFocus}
        isDirty={passwordInput.isDirty}
        isEmpty={passwordInput.isEmpty}
        onChange={handleFirstPasswordValue}
        passwordValidError={passwordValidError}
        isPasswordInputValid={passwordInput.isPasswordInputValid}
        emptyError={firstPasswordError}
        showPassword={showPassword}
        clickShowPassword={clickShowPassword}
      />

      <button
        className={cn(style.button, style.button__wrap)}
        disabled={!isFormValid}
        type="submit"
      >
        Войти
      </button>
      <Link to="#" className={style.link}>
        Забыли пароль?
      </Link>
    </AuthForms>
  );
};

export default SignInForm;