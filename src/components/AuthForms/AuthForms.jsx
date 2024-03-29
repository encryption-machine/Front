import style from './AuthForms.module.scss';

const AuthForms = ({ children, onSubmit }) => {
  return (
    <main className={style.root}>
      <form
        onSubmit={onSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit(e);
          }
        }}
        className={style.form}
      >
        {children}
      </form>
    </main>
  );
};

export default AuthForms;
