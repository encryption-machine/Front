import { BASE_URL } from '../constants/url';

export const getResponseData = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(
        res.text()
      );
};

// export const getResponseData = (res) => {
//   return res
//     .json()
//     .then((res) => {
//       if (res.ok) {
//         return res;
//       }
//       return Promise.reject(`Ошибка: ${res}`);
//     })

// }

//регистрация
export const postApiRegistration = (
  emailValue,
  firstPassword,
  secondPassword,
  secretQuestionValue,
  answerValue
) => {
  return fetch(`${BASE_URL}users/`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: 'POST',
    body: JSON.stringify({
      question: secretQuestionValue,
      answer: answerValue,
      email: emailValue,
      password: firstPassword,
      re_password: secondPassword,
    }),
  }).then((res) => getResponseData(res));
};
