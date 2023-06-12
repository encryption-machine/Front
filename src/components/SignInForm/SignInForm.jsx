import AuthForms from '../AuthForms/AuthForms';
import style from '../AuthForms/AuthForms.module.scss';
import styleLocal from './SignInForm.module.scss';

const SignInForm = () => {
  return (
      <AuthForms title={'Вход'}>
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
        <button className={style.button} type="submit">
          Войти
        </button>
        <button className={style.button} type="submit">
          Зарегистрироваться
        </button>
      </AuthForms>
  );
};

export default SignInForm;
