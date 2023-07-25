import { BASE_URL } from '../constants/url';

const getResponseData = (res) =>
  res.json().then((response) => {
    if (res.ok) {
      return response;
    }
    return Promise.reject(new Error(response.email));
  });

//регистрация
export const postApiRegistration = (
  email,
  firstPassword,
  secondPassword,
  question,
  answer
) => {
  return fetch(`${BASE_URL}users/`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',

      Authorization: 'Bearer ' + document.cookie.slice(7),
    },
    method: 'POST',
    body: JSON.stringify({
      question: question,
      answer: answer,
      email: email,
      password: firstPassword,
      re_password: secondPassword,
    }),
  }).then((res) => getResponseData(res));
};
