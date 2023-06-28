import styles from './Footer.module.scss';

import { TEST } from '../TEST/TEST';

export const Footer = () => {
  return (
    <>
      <TEST.test1>
        <TEST.test2></TEST.test2>
      </TEST.test1>
      <footer className={styles.footer}>
        <div className={styles.footer_container}>
          <ul className={styles.list}>
            <li>
              <a href="tel:8(800)234-12-36">8(800)234-12-36</a>
            </li>
            <li>
              <a href="#" target="_blank">
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
