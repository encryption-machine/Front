import { BASE_URL } from '../constants/url';
import { getCookie } from './cookie';

function handleResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
}

export const getEncryption = (text, algorithm, key, is_encryption) => {
  return fetch(`${BASE_URL}encryption/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('access'),
    },
    body: JSON.stringify({
      text: text,
      algorithm: algorithm,
      key: key.length ? key : null,
      is_encryption: is_encryption,
    }),
  }).then(handleResponce);
};
