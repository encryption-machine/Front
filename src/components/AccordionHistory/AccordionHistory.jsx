import { AccordionHistoryItem } from '../AccordionHistoryItem/AccordionHistoryItem';
import styles from './AccordionHistory.module.scss';
import * as apiList from '../../utils/apiMachineList';
import { useEffect, useState } from 'react';

export const AccordionHistory = () => {
  const [encryptionList, setencryptionList] = useState([]);
  const [serverError, setServerError] = useState('');
  useEffect(() => {
    getEncryptionList();
  }, []);

  const getEncryptionList = () => {
    /*     const token = document.cookie.slice(7); */
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwNDcyMzQzLCJpYXQiOjE2OTAzODU5NDMsImp0aSI6IjBlYmQ2ZTgwZDE4NjQ0N2Y4NGY3MGMxMzk1YTg2YTg2IiwidXNlcl9pZCI6Mjl9.glQh_QyRGHxtfSRH-G-hKZzKEdKiifSJ6DoZrVqg_mo`;
    apiList
      .getApiEncryptionList(token)
      .then((data) => {
        setencryptionList(data);
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
        <p>У вас пока нет запросов на шифрование</p>
      )}

      {serverError && (
        <span className={styles.loginErrorMessage}>{serverError}</span>
      )}
    </>
  );
};
