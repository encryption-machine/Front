import AuthForms from '../AuthForms/AuthForms';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignUpForm.module.scss';

const SignUpForm = () => {
  return (
    <AuthForms title={'Регистрация'}>
      <input
        className={style.input}
        name="email"
        type="text"
        placeholder="Email"
      />
      <input
        className={style.input}
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <span>
        Пароль должен содержать от 6 до 8 символов, включая, как минимум, один
        цифровой и один не алфавитно цифровой символ
      </span>
      <input
        className={style.input}
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <button className={style.button} type="submit">
        Зарегистрироваться
      </button>
      <input type="checkbox" name="" id="" />{' '}
      <span> Я даю согласие на обработку моих персональных данных </span>
    </AuthForms>
  );
};

export default SignUpForm;
