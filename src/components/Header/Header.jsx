import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './Header.module.scss';
import AuthModal from '../AuthModal/AuthModal';
import AuthTabs from '../AuthTabs/AuthTabs';
import RecoveryPasswordForm from '../RecoveryPasswordForm/RecoveryPasswordForm';
import { AuthFormGlobalStore as formStore } from '../../stores/';
import { CustomLink } from '../CustomLink/CustomLink';
import logotype from '../../assets/icons/logotype.svg';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import * as apiAuth from '../../utils/Auth';
import * as apiUser from '../../utils/User';
import { useEffect } from 'react';

export const Header = observer(() => {
  const { emailUser } = formStore;
  const accessToken = getCookie('access');
  const refreshToken = localStorage.getItem('refresh');
  const location = useLocation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const logOut = () => {
    formStore.setLoggedIn(false);
    deleteCookie('access');
    localStorage.removeItem('refresh');
  };

  const updateToken = (refreshToken) => {
    apiAuth
      .postApiAuthorizeRefresh(refreshToken)
      .then((data) => {
        setCookie('access', data.access);
        formStore.setLoggedIn(true);
      })
      .catch((err) => {
        formStore.setLoggedIn(false);
        console.error(err, '--updateRefresh,err');
      });
  };

  useEffect(() => {
    const verifyToken = (refreshToken) => {
      apiAuth
        .postApiAuthorizeVerify(refreshToken)
        .then((data) => {
          console.log(data);
          formStore.setLoggedIn(true);
        })
        .catch((err) => {
          updateToken();
          console.error(err, '--verifyRefresh,err');
        });
    };

    const getUser = () => {
      apiUser
        .getApiUser(accessToken)
        .then((data) => {
          formStore.setEmailUser(data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (!emailUser && refreshToken && accessToken) {
      getUser();
    }
    if (!accessToken && refreshToken) {
      updateToken(refreshToken);
    }
    if (accessToken && refreshToken && emailUser) {
      verifyToken(refreshToken);
      formStore.setLoggedIn(true);
    }
  }, [emailUser, accessToken, refreshToken]);

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

          {location.pathname === '/profile' &&
            formStore.loggedIn &&
            emailUser && <span className={styles.email}>{emailUser}</span>}

          {formStore.loggedIn && (
            <button
              className={styles.button_header}
              type="button"
              onClick={logOut}
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
