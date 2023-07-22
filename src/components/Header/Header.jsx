import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './Header.module.scss';
import AuthModal from '../AuthModal/AuthModal';
import AuthTabs from '../AuthTabs/AuthTabs';
import RecoveryPasswordForm from '../RecoveryPasswordForm/RecoveryPasswordForm';
import { AuthFormGlobalStore as formStore } from '../../stores/';
import { CustomLink } from '../CustomLink/CustomLink';
import logotype from '../../assets/icons/logotype.svg';

export const Header = observer(
  ({ onLogin, loginErrorMessage, loggedIn, signOut }) => {
    const location = useLocation();
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    return (
      <header className={styles.header}>
        <div className={styles.header_container}>
          <CustomLink href={'/'} target="_self">
            <img className={styles.logotype} src={logotype} alt="logo" />
          </CustomLink>
          <nav>
            {location.pathname === '/' && (
              <ul className={styles.list}>
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
                {loggedIn && (
                  <li>
                    <CustomLink href={'/profile'} target="_self">
                      Личный&nbsp;кабинет
                    </CustomLink>
                  </li>
                )}
              </ul>
            )}
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
                  loginErrorMessage={loginErrorMessage}
                />
              )}
              {formStore.showRecoveryPasswordForm && <RecoveryPasswordForm />}
            </AuthModal>
          </div>
        </div>
      </header>
    );
  }
);
