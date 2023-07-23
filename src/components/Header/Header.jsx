import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FormGlobalStore as formStore } from '../../stores/';
import styles from './Header.module.scss';
import AuthModal from '../AuthModal/AuthModal';
import AuthTabs from '../AuthTabs/AuthTabs';
import RecoveryPasswordForm from '../RecoveryPasswordForm/RecoveryPasswordForm';
import { CustomLink } from '../CustomLink/CustomLink';
import logotype from '../../assets/icons/logotype.svg';

export const Header = observer(({ onLogin, textError, loggedIn, signOut }) => {


  const location = useLocation();
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <img className={styles.logotype} src={logotype} alt="logo" />
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
                <Link
                  to={'/profile'}
                  className={styles.link}
                >
                  Личный&nbsp;кабинет
                </Link>
              </li>

            }
          </ul>}
        </nav>
        <div className={styles.entrance}>
          {!loggedIn && (
            <button
              className={styles.button_header}
              type="button"
              onClick={() => formStore.setOpenAuthForm(true)}
            >
              Войти
            </button>
          )}
          {loggedIn && (
            <button
              className={styles.button_header}
              type="button"
              onClick={signOut}
            >
              Выйти
            </button>
          )}
          <AuthModal
            isOpen={formStore.openAuthForm}
            setIsOpen={formStore.setOpenAuthForm}
          >
            {formStore.showAuthForm && (
              <AuthTabs
                onLogin={onLogin}
                loggedIn={loggedIn}
                textError={textError}
              />
            )}
            {formStore.showRecoveryPasswordForm && <RecoveryPasswordForm />}
          </AuthModal>
        </div>
      </div>
    </header>
  );
});
