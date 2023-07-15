// авторизация
const BASE_URL = 'http://127.0.0.1:8000/api/v1';

const getResponseData = (res) => {
  return res
    .json()
    .then((response) => {
      if (res.ok) {
        return response;
      }
      return Promise.reject(new Error(response.detail));
    })

}
  //запрос авторизации
  // Принимает набор учетных данных пользователя и возвращает пару веб-токенов access и refresh JSON для подтверждения аутентификации этих учетных данных.
  export const postApiAutorisation  = (email, password) => {
      return fetch(`${BASE_URL}/auth/jwt/create/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: 'Bearer ' + document.cookie.slice(7),//используем из куки токен доступа access
        },
        body: JSON.stringify({ email: email, password: password })
      }).then(res=>getResponseData(res));
  }
  //запрос авторизации обновления
  //Принимает веб-токен JSON типа обновления и возвращает веб-токен JSON типа доступа, если токен обновления действителен.
  export const postApiAuthorizeRefresh = (refresh) => {
    return fetch(`${BASE_URL}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + document.cookie.slice(7),//используем из куки токен доступа access
      },
      body: JSON.stringify({ refresh })
    }).then(res=>getResponseData(res));
  }
   //запрос авторизации проверки
   //Принимает токен и указывает, действителен ли он. Это представление не предоставляет информации о пригодности токена для конкретного использования
  export const postApiAuthorizeVerify = (token) => {
    return fetch(`${BASE_URL}/auth/jwt/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + document.cookie.slice(7),//используем из куки токен доступа access
      },
      body: JSON.stringify({ token: token })
    }).then(res=>getResponseData(res));
  }