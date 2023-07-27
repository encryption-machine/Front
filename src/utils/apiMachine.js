import { BASE_URL } from '../constants/url';
import { AuthFormGlobalStore as formStore } from '../stores';

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
    },
    body: JSON.stringify({
      text: text,
      algorithm: algorithm,
      key: key,
      is_encryption: is_encryption,
    }),
  }).then(handleResponce);
};
