import { BASE_URL } from '../constants/url';

function handleResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
}

export const sendEmail = (data) =>
  fetch(`${BASE_URL}users/reset_password/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data,
    }),
  }).then(handleResponce);

export const sendSecretQuestion = (id, answer) =>
  fetch(`${BASE_URL}users/reset_password_question/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      answer: answer,
    }),
  }).then(handleResponce);

export const sendNewPassword = (id, password, confirmPassword, token) =>
  fetch(`${BASE_URL}users/reset_password_confirm/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      new_password: password,
      re_new_password: confirmPassword,
      token: token,
    }),
  }).then(handleResponce);
