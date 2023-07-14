import { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal';
import styles from './Header.module.scss';
import logotype from '../../assets/icons/logotype.svg';
import { Link } from '../Link/Link';

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
              <Link
                href={'#ciphers'}
                target="_self"
                onClick={() => scrollToSection('ciphers')}
              >
                Шифрование
              </Link>
            </li>
            <li>
              <Link
                href={'#aboutCiphers'}
                target="_self"
                onClick={() => scrollToSection('aboutCiphers')}
              >
                О&nbsp;шифрах
              </Link>
            </li>
            <li>
              <Link
                href={'#aboutProject'}
                target="_self"
                onClick={() => scrollToSection('aboutProject')}
              >
                О&nbsp;проекте
              </Link>
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
