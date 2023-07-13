import { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';
import styles from './Header.module.scss';
import logotype from '../../assets/icons/logotype.svg';

export const Header = () => {
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
                href="#aboutCiphers"
                onClick={() => scrollToSection('aboutCiphers')}
              >
                О&nbsp;шифрах
              </a>
            </li>
            <li>
              <a
                href="#aboutProject"
                onClick={() => scrollToSection('aboutProject')}
              >
                О&nbsp;проекте
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.entrance}>
          <button
            className={styles.button_header}
            type="button"
            onClick={setModalOpen}
          >
            Войти
          </button>
          <AuthModal isOpen={modalOpen} setIsOpen={setModalOpen} />
        </div>
      </div>
    </header>
  );
};
