import styles from './Footer.module.scss';
import TelegramIcon from '../../img/telegram.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.contacts}>
          <span>Контакты</span>
          <ul className={styles.list}>
            <li>
              <a href="tel:8(800)234-12-36">8(800)234-12-36</a>
            </li>
            <li>
              <a
                href="https://web.telegram.org/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={TelegramIcon} alt="telegram" />
              </a>
            </li>
          </ul>
        </div>
        <p>2023</p>
      </div>
    </footer>
  );
};
