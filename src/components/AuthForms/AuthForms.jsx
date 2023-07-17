import style from './AuthForms.module.scss';

const AuthForms = ({ children, title, onSubmit }) => {
  return (
    <main className={style.root}>
      <form
        onSubmit={onSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            console.log('Enter press');
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
