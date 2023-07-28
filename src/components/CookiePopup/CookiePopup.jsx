/* eslint-disable react/jsx-pascal-case */
import { Modal } from '../Modal/Modal';
import styles from './CookiePopup.module.scss';
import { getCookie, setCookie } from '../../utils/cookie';

const CookiePopup = () => {
  const cookieModal = getCookie('cookieModal');
  console.log(cookieModal);
  const setCookieModal = () => {
    setCookie('cookieModal', true);
    window.location.reload();
  };

  return (
    <>
      {!cookieModal && (
        <Modal.window className={styles.container}>
          <p className={styles.text__primary}>
            Мы используем
            <span className={styles.text__secondary}>&nbsp;сookies-файлы</span>
          </p>
          <Modal.close className={styles.close} onClose={setCookieModal}>
            ok
          </Modal.close>
        </Modal.window>
      )}
    </>
  );
};

export default CookiePopup;
