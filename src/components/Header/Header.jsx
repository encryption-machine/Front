import { observer } from 'mobx-react-lite';
import AuthModal from '../AuthModal/AuthModal';
import AuthTabs from '../AuthTabs/AuthTabs';
import RecoveryPasswordForm from '../RecoveryPasswordForm/RecoveryPasswordForm';
import { AuthFormGlobalStore as formStore } from '../../stores/';
import styles from './Header.module.scss';
import logotype from '../../assets/icons/logotype.svg';
import { CustomLink } from '../CustomLink/CustomLink';

export const Header = observer(
  ({ onLogin, loginErrorMessage, loggedIn, signOut }) => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    return (
      <header className={styles.header}>
        <div className={styles.header_container}>
          <img className={styles.logotype} src={logotype} alt="logo" />
          <nav>
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
            </ul>
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
