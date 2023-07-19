import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FormGlobalStore as formStore } from '../../stores/';
import styles from './Header.module.scss';
import AuthModal from '../AuthModal/AuthModal';
import AuthTabs from '../AuthTabs/AuthTabs';
import RecoveryPasswordForm from '../RecoveryPasswordForm/RecoveryPasswordForm';
import { CustomLink } from '../CustomLink/CustomLink';
import logotype from '../../assets/icons/logotype.svg';

export const Header = observer(() => {
  // временное решение, пока не реализовано апи авторизации
  const [loggedIn, setLoggedIn] = useState(true);

  const location = useLocation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <CustomLink
          href={"/"}
          target="_self"
        >
          <img className={styles.logotype} src={logotype} alt="logo" />
        </CustomLink>
        <nav>
          {(location.pathname === '/') && <ul className={styles.list}>
            <li className={styles.chapter}>
              <CustomLink
                href={'#ciphers'}
                target="_self"
                onClick={() => scrollToSection('ciphers')}
              >
                Шифрование
              </CustomLink>
            </li>
            <li className={styles.chapter}>
              <CustomLink
                href={'#aboutCiphers'}
                target="_self"
                onClick={() => scrollToSection('aboutCiphers')}
              >
                О&nbsp;шифрах
              </CustomLink>
            </li>
            <li className={styles.chapter}>
              <CustomLink
                href={'#aboutProject'}
                target="_self"
                onClick={() => scrollToSection('aboutProject')}
              >
                О&nbsp;проекте
              </CustomLink>
            </li>
            {loggedIn &&
              <li>
                <CustomLink
                  href={'/profile'}
                  target="_self"
                >
                  Личный&nbsp;кабинет
                </CustomLink>
              </li>

            }
          </ul>}
        </nav>
        <div className={styles.entrance}>
          {(location.pathname === '/profile') && <span className={styles.email}>user@email.ru</span>}
          <button
            className={styles.button_header}
            type="button"
            onClick={() => formStore.setOpenAuthForm(true)}
          >
            {/* временное решение пока нет авторизации */}
            {loggedIn ? 'Выйти' : 'Войти'}
          </button>
          <AuthModal
            isOpen={formStore.openAuthForm}
            setIsOpen={formStore.setOpenAuthForm}
          >
            {formStore.showAuthForm && <AuthTabs />}
            {formStore.showRecoveryPasswordForm && <RecoveryPasswordForm />}
          </AuthModal>

        </div>
      </div>
    </header>
  );
});
