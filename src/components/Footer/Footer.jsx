import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <ul className={styles.list}>
          <li>
            <a href="#">8(800)234-12-36</a>
          </li>
          <li>
            <a href="#" target="_blank">
              Политика конфиденциальности
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
