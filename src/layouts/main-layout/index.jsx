import { useState } from 'react';
import styles from './main-layout.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FormGlobalStore as formStore } from '../../stores';
/////////Авторизация//////
import {
  postApiAutorisation,
  postApiAuthorizeRefresh,
  postApiAuthorizeVerify,
} from '../../utils/Auth.js';
/////////////////////////
import CookiePopup from '../../components/CookiePopup/CookiePopup';

const MainLayout = observer(() => {
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
    <div className={styles.main_layout}>
      <Header
        loggedIn={loggedIn}
        onLogin={handleLogin}
        textError={textError}
        signOut={handleSignOut}
      />
      <section>
        <Outlet />
      </section>
      <Footer />
      <CookiePopup />
    </div>
  );
});

export default MainLayout;
