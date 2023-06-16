import { useState } from 'react';
import styles from './Header.module.scss';
import UserIcon from '../../assets/icons/user.svg';

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.logo}>Шифровальная машина</div>
        <nav>
          <ul>
            <li>
              <a href="#ciphers">Шифрование</a>
            </li>
            <li>
              <a href="#aboutProject">О проекте</a>
            </li>
            <li>
              <a href="#aboutCiphers">О шифрах</a>
            </li>
          </ul>
        </nav>
        <div className={styles.entrance}>
          {/* скорее всего заменить кнопки на Link, когда будут страницы регистрации и авторизации */}
          {!loggedIn ? (
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
          )}
          <div className="icon-user"></div>
        {/*   <img className={styles.img} src={UserIcon} alt={''} /> */}
        </div>
      </div>
    </header>
  );
};
