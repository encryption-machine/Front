import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './Header.module.scss';
import AuthModal from '../AuthModal/AuthModal';
import AuthTabs from '../AuthTabs/AuthTabs';
import RecoveryPasswordForm from '../RecoveryPasswordForm/RecoveryPasswordForm';
import { AuthFormGlobalStore as formStore } from '../../stores/';
import { CustomLink } from '../CustomLink/CustomLink';
import logotype from '../../assets/icons/logotype.svg';

export const Header = observer(() => {
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
              <li className={styles.chapter}>
                <CustomLink
                  href={'#outTeam'}
                  target="_self"
                  onClick={() => scrollToSection('ourTeam')}
                >
                  Наша&nbsp;команда
                </CustomLink>
              </li>
              {formStore.loggedIn && (
                <li>
                  <Link to={'/profile'} className={styles.link}>
                    Личный&nbsp;кабинет
                  </Link>
                </li>
              )}
            </ul>
          )}
        </nav>
        <div className={styles.entrance}>
          {!formStore.loggedIn && (
            <button
              className={styles.button_header}
              type="button"
              onClick={() => formStore.setOpenAuthForm(true)}
            >
              Войти
            </button>
          )}

          {location.pathname === '/profile' && formStore.loggedIn && (
            <span className={styles.email}>email@mail.ru</span>
          )}

          {formStore.loggedIn && (
            <button
              className={styles.button_header}
              type="button"
              onClick={() => formStore.setLoggedIn(false)}
            >
              Выйти
            </button>
          )}
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
