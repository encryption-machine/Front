import { BASE_URL } from '../constants/url';
import { AuthFormGlobalStore as formStore } from '../stores';

function handleResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? matches[1] : undefined;
}

export const getEncryption = (text, algorithm, key, is_encryption) => {
  const headers = () => {
    if (formStore.loggedIn) {
      return {
        'Content-Type': 'application/json',
        Authorization: getCookie('auth._token.local'),
      };
    }
    return { 'Content-Type': 'application/json' };
  };
  return fetch(`${BASE_URL}encryption/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      text: text,
      algorithm: algorithm,
      key: key,
      is_encryption: is_encryption,
    }),
  }).then(handleResponce);
};
