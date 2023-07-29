import { AccordionHistoryItem } from '../AccordionHistoryItem/AccordionHistoryItem';
import styles from './AccordionHistory.module.scss';
import * as apiList from '../../utils/apiMachineList';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookie';

export const AccordionHistory = () => {
  const [encryptionList, setEncryptionList] = useState([]);
  const [serverError, setServerError] = useState('');
  useEffect(() => {
    getEncryptionList();
  }, []);

  const getEncryptionList = () => {
    const token = getCookie('access');

    apiList
      .getApiEncryptionList(token)
      .then((data) => {
        setEncryptionList(data);
      })
      .catch((err) => {
        setServerError(err.message);
      });
  };

  return (
    <>
      {encryptionList.length > 0 ? (
        <ul className={styles.accordionHistory}>
          {encryptionList.map((item, index) => {
            return (
              <AccordionHistoryItem key={index} item={item} index={index} />
            );
          })}
        </ul>
      ) : (
        <p className={styles.accordionHistory_text}>
          У вас пока нет запросов на шифрование
        </p>
      )}

      {serverError && (
        <span className={styles.loginErrorMessage}>{serverError}</span>
      )}
    </>
  );
};
