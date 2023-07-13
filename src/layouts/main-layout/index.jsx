import { useState } from 'react';
import styles from './main-layout.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
/////////Авторизация//////
import { postApiAutorisation, postApiAuthorizeRefresh, postApiAuthorizeVerify } from '../../utils/Auth.js';
/////////////////////////

export default function MainLayout() {
   /////////Авторизация//////
   const [loggedIn, setLoggedIn] = useState(false);
   const [textError, setTextError] = useState('');
   /////TODO Стейт для закрытия попапа (попап закрыт)
   const [isModalClose, setIsModalClose] = useState(true);

     
   const handleLogin = (email, password) => {
     return postApiAutorisation(email, password)
     .then((data) =>{
       //в (data) должны прийти два токена access и refresh
      //  console.log(data, '--authorize,data'); 
       //токен обновления refresh
       const refresh = data.refresh;
     
       if(data.access) {
         //если получили токен доступа access
         //токен доступа access в куки, максимальное время хранения 1 час (max-age=3600)?
         document.cookie = `access=${data.access}; max-age=3600`;

         //делаем стейт залогиненного
         setLoggedIn(true);
         //и закрываем попап формы
         setIsModalClose(false); //TODO
        } else {
           //если не получили токен доступа access
           //отправляем токен обновления на сервер
           //проверяем действителен ли токен обновления
           postApiAuthorizeVerify(refresh)
           .then((data) =>{
             if(data) {
               //если токен обновления действителен, отправляем токен обновления на сервер
               /////Принимает веб-токен JSON типа обновления и возвращает веб-токен JSON типа доступа 
               postApiAuthorizeRefresh(refresh)
               .then((data) =>{
                 // получили токен доступа access
                 if(data.access) {
                   //если получили токен доступа access
                   //токен доступа access в куки, максимальное время хранения 1 час (max-age=3600)?
                   document.cookie = `access=${data.access}; max-age=3600`;
             
                    //делаем стейт залогиненного
                    setLoggedIn(true);
                    //и закрываем попап формы 
                    setIsModalClose(false); //TODO 
                 }
               }).catch(err => {
                 console.log(err, '--authorizeRefresh,err');
                 setLoggedIn(false);
                 setTextError('Получить доступ не удалось, попробуйте ещё');
               });
             }
                 
           }).catch(err => {
             console.log(err, '--token,err');
             setLoggedIn(false);
             setTextError('Получить доступ не удалось, попробуйте ещё');
           });
         
         }
       }).catch(err => {
         console.log(err, '--authorize,err');
         setLoggedIn(false);
         setTextError('Получить доступ не удалось, попробуйте ещё');
       });
     }
     const handleSignOut = () => {
      setLoggedIn(false);
     }
   /////////////////////////
   console.log(loggedIn, 'loggedIn');
   console.log(isModalClose, 'modalClose');
  return (
    <div className={styles.main_layout}>
      <Header  loggedIn={loggedIn} onLogin={handleLogin} textError={textError} isModalClose={isModalClose} signOut={handleSignOut}/>
      <section>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
