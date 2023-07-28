import { useState } from 'react';
import styles from './AccordionHistoryItem.module.scss';
import QRCode from 'react-qr-code';

export const AccordionHistoryItem = ({ item, index }) => {
  const [showHistory, setShowHistory] = useState(false);

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  const updateDate = item.date
    .slice(0, 10)
    .replaceAll('-', '.')
    .split('.')
    .reverse()
    .join('.');

  const setAlgorithm = (algorithm) => {
    switch (algorithm) {
      case 'caesar':
        return 'Код Цезаря';
      case 'morse':
        return 'Азбука Морзе';
      case 'vigenere':
        return 'Шифр Виженера';
      case 'aes':
        return 'AES';
      case 'qr':
        return 'QR код';
      default:
        break;
    }
  };

  const nameAlgorithm = setAlgorithm(item.algorithm);

  return (
    <>
      <li className={styles.accordionHistoryItem} key={index}>
        <p className={styles.accordionHistoryItem_date}>{updateDate}</p>
        <p className={styles.accordionHistoryItem_is_encryption}>
          {item.is_encryption === true ? `Шифрование` : `Дешифрование`}
        </p>
        <p className={styles.accordionHistoryItem_algorithm}>{nameAlgorithm}</p>
        <p className={styles.accordionHistoryItem_key}>{item.key}</p>
        {index % 2 !== 0 ? (
          <button
            className={styles.accordionHistoryItem_btn_dark}
            onClick={handleShowHistory}
          ></button>
        ) : (
          <button
            className={styles.accordionHistoryItem_btn}
            onClick={handleShowHistory}
          ></button>
        )}
        {showHistory ? (
          <>
            <p className={styles.accordionHistoryItem_request}>{item.text}</p>
            <p className={styles.accordionHistoryItem_response}>
              {item.algorithm !== 'qr' ? (
                item.encrypted_text
              ) : (
                <QRCode value={item.encrypted_text} />
              )}
            </p>
          </>
        ) : null}
      </li>
    </>
  );
};
