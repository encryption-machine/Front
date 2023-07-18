/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import styles from './CookiePopup.module.scss';

const CookiePopup = () => {
  const [isShow, setIsShow] = useState(true);

  return (
    <>
      {isShow && (
        <Modal.window className={styles.container}>
          <p className={styles.text__primary}>
            Мы используем
            <span className={styles.text__secondary}>&nbsp;сookies-файлы</span>
          </p>
          <Modal.close className={styles.close} onClose={setIsShow}>
            ok
          </Modal.close>
        </Modal.window>
      )}
    </>
  );
};

export default CookiePopup;
