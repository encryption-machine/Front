import { BASE_URL } from '../constants/url';
import { AuthFormGlobalStore as formStore } from '../stores';
import { getCookie } from './cookie';

function handleResponce(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
}

export const postEncryption = (text, algorithm, key, is_encryption) => {
  const headers = () => {
    if (formStore.loggedIn) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('access')}`,
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
