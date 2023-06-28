import { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';
import styles from './Header.module.scss';
import logotype from '../../assets/icons/logotype.svg';

export const Header = () => {
  // const [loggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {
  //  setLoggedIn(true);
  // };

  // const handleLogout = () => {
  //  setLoggedIn(false);
  // };

  const [modalOpen, setModalOpen] = useState(false);

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
          {/* скорее всего заменить кнопки на Link, когда будут страницы регистрации и авторизации */}
          {/* {!loggedIn ? (
            <button type="button" onClick={handleLogin}>
              Войти
            </button>
          ) : (
            <div className={styles.userInfo}>
              <span>mail@mail.ru</span>
              <hr />
              <button type="button" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          )} */}
          <button
            className={styles.button_header}
            type="button"
            onClick={setModalOpen}
          >
            Войти
          </button>
          <AuthModal isOpen={modalOpen} setIsOpen={setModalOpen} />
          {/* <div className="icon-user"></div> */}
        </div>
      </div>
    </header>
  );
};
