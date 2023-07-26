import { useState } from 'react';
import styles from './AccordionHistoryItem.module.scss';

export const AccordionHistoryItem = ({ item, index }) => {
  const [showHistory, setShowHistory] = useState(false);

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <>
      <li className={styles.accordionHistoryItem} key={index}>
        <div className={styles.dataRequest}>
          <p className={styles.text}>{item.date}</p>
          <p className={styles.text}>
            {item.is_encryption === true ? `Шифрование` : `Дешифрование`}
          </p>
          <p className={styles.text}>{item.algorithm}</p>
          <p className={styles.text}></p>
          <button className={styles.btn} onClick={handleShowHistory}></button>
        </div>
        {showHistory ? (
          <div className={styles.dataRequest_description}>
            <p className={styles.dataRequest_request}>{item.text}</p>
            <p className={styles.dataRequest_response}>{item.encrypted_text}</p>
          </div>
        ) : null}
      </li>
    </>
  );
};
