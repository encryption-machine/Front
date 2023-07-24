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

/////////Авторизация//////
import {
  postApiAutorisation,
  postApiAuthorizeRefresh,
  postApiAuthorizeVerify,
} from '../../utils/Auth.js';
/////////////////////////

export const Header = observer(() => {
  // временное решение, пока не реализовано апи авторизации
  // const [loggedIn, setLoggedIn] = useState(true);
  const location = useLocation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

    /////////Авторизация//////
    const [loggedIn, setLoggedIn] = useState(false);
    const [textError, setTextError] = useState('');
    console.log(loggedIn);
  
    const handleLogin = (email, password) => {
      return postApiAutorisation(email, password)
        .then((data) => {
          //в (data) должны прийти два токена access и refresh
          //токен обновления refresh
          const refresh = data.refresh;
  
          if (data.access) {
            //если получили токен доступа access
            //токен доступа access в куки, максимальное время хранения 1 час (max-age=3600)?
            document.cookie = `access=${data.access}; max-age=3600`;
  
            //делаем стейт залогиненного
            setLoggedIn(true);
            //и закрываем попап формы
            formStore.setOpenAuthForm(false);
          } else {
            //если не получили токен доступа access
            //отправляем токен обновления на сервер
            //проверяем действителен ли токен обновления
            postApiAuthorizeVerify(refresh)
              .then((data) => {
                if (data) {
                  //если токен обновления действителен, отправляем токен обновления на сервер
                  /////Принимает веб-токен JSON типа обновления и возвращает веб-токен JSON типа доступа
                  postApiAuthorizeRefresh(refresh)
                    .then((data) => {
                      // получили токен доступа access
                      if (data.access) {
                        //если получили токен доступа access
                        //токен доступа access в куки, максимальное время хранения 1 час (max-age=3600)?
                        document.cookie = `access=${data.access}; max-age=3600`;
  
                        //делаем стейт залогиненного
                        setLoggedIn(true);
                        //и закрываем попап формы
                        formStore.setOpenAuthForm(false);
                      }
                    })
                    .catch((err) => {
                      console.log(err, '--authorizeRefresh,err');
                      setLoggedIn(false);
                      setTextError(err.message);
                    });
                }
              })
              .catch((err) => {
                console.log(err, '--token,err');
                setLoggedIn(false);
                setTextError(err.message);
              });
          }
        })
        .catch((err) => {
          console.log(err, '--authorize,err');
          setLoggedIn(false);
          setTextError(err.message);
        });
    };

    const handleSignOut = () => {
      setLoggedIn(false);
    };
    /////////////////////////

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
          {location.pathname === '/profile' && (
            <span className={styles.email}>user@email.ru</span>
          )}
          {!loggedIn ? (
            <button
              className={styles.button_header}
              type="button"
              onClick={() => formStore.setOpenAuthForm(true)}
            >
              Войти
            </button>
          ) : (
            <button
              className={styles.button_header}
              type="button"
              onClick={handleSignOut}
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
                onLogin={handleLogin}
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
