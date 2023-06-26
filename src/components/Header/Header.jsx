import { useState } from 'react';
import Modal from '../Modal/Modal';
import AuthTabs from '../AuthTabs/AuthTabs';
import styles from './Header.module.scss';

export const Header = () => {
  //const [loggedIn, setLoggedIn] = useState(false);

  //const handleLogin = () => {
  //  setLoggedIn(true);
  //};

  //const handleLogout = () => {
  //  setLoggedIn(false);
  //};
  
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.logo}>Шифровальная машина</div>
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
          {/*{!loggedIn ? (
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
          )}*/}
          <button type="button" onClick={setModalOpen}>
            Войти
          </button>
          <Modal isOpen={modalOpen} setIsOpen={setModalOpen}><AuthTabs/></Modal>
          <div className="icon-user"></div>
        </div>
      </div>
    </header>
  );
};
