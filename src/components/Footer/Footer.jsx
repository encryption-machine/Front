import styles from './Footer.module.scss';
import { telephone } from '../../constants/contacts';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <ul className={styles.list}>
          <li>
            <p className={styles.telephone}>{telephone}</p>
          </li>
          <li>
            <a href="#chipers" target="_blank">
              Политика конфиденциальности
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
