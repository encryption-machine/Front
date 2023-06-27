import style from './AuthForms.module.scss';

const AuthForms = ({ children, title }) => {
  return (
    <main className={style.root}>
      <form className={style.form}>
        <h1 className={style.title}>{title}</h1>
        {children}
      </form>
    </main>
  );
};

export default AuthForms;
