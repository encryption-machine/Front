import { BASE_URL } from '../constants/url';

const getResponseData = (res) => {
  return res
    .json()
    .then((response) => {
      if (res.ok) {
        return response;
      }
      return Promise.reject(new Error(response.email));
    })
}

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
