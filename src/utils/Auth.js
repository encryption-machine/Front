// авторизация
const BASE_URL = 'http://127.0.0.1:8000/api/v1';

function getResponseData(res) { 
    if(res.ok) { 
      return res.json(); 
    } else { 
      Promise.reject(`Ошибка ${res.status}`); 
    } 
  }
  //запрос авторизации
  // Принимает набор учетных данных пользователя и возвращает пару веб-токенов access и refresh JSON для подтверждения аутентификации этих учетных данных.
  export const authorize  = (email, password) => {
      return fetch(`${BASE_URL}/auth/jwt/create/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      }).then(getResponseData);
  }
  //запрос авторизации обновления
  //Принимает веб-токен JSON типа обновления и возвращает веб-токен JSON типа доступа, если токен обновления действителен.
  export const authorizeRefresh = (refresh) => {
    return fetch(`${BASE_URL}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ refresh })
    }).then(getResponseData);
  }
   //запрос авторизации проверки
   //Принимает токен и указывает, действителен ли он. Это представление не предоставляет информации о пригодности токена для конкретного использования
  export const authorizeVerify = (token) => {
    return fetch(`${BASE_URL}/auth/jwt/verify/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(token)
    }).then(getResponseData);
  }
