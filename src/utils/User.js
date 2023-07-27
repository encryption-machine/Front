import { BASE_URL } from '../constants/url';

const getResponseData = (res) =>
  res.json().then((response) => {
    if (res.ok) {
      return response;
    }
    return Promise.reject(new Error(response.detail));
  });

//регистрация
export const getApiUser = (token) => {
  return fetch(`${BASE_URL}users/me/`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
    body: JSON.stringify(),
  }).then((res) => getResponseData(res));
};
