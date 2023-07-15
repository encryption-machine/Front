import AuthModal from '../AuthModal/AuthModal';
import styles from './Header.module.scss';
import logotype from '../../assets/icons/logotype.svg';

export const Header = ({ loggedIn, onLogin, textError, signOut, onClickOpen }) => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <img className={styles.logotype} src={logotype} alt="logo" />
        <nav>
          <ul>
            <li>
              <a href="#ciphers" onClick={() => scrollToSection('ciphers')}>
                Шифрование
              </a>
            </li>
            <li>
              <a
                href="#aboutProject"
                onClick={() => scrollToSection('aboutProject')}
              >
                О проекте
              </a>
            </li>
            <li>
              <a
                href="#aboutCiphers"
                onClick={() => scrollToSection('aboutCiphers')}
              >
                О шифрах
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.entrance}>
          {!loggedIn && <button
            className={styles.button_header}
            type="button"
            // onClick={setModalOpen}
            onClick={onClickOpen} // новый код
          >
            Войти
          </button>}
          {/* /////////Авторизация////// */}
          {loggedIn && <button
            className={styles.button_header}
            type="button"
            onClick={signOut}
          >
            Выйти
          </button>}
          {/* <AuthModal isOpen={modalOpen} setIsOpen={setModalOpen} loggedIn={loggedIn} onLogin={onLogin} textError={textError}/> */}
          <AuthModal onClickOpen={onClickOpen} loggedIn={loggedIn} onLogin={onLogin} textError={textError}/>
        </div>
      </div>
    </header>
  );
};
