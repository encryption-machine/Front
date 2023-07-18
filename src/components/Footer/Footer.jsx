import styles from './Footer.module.scss';
import { telephone } from '../../constants/contacts';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <p className={styles.telephone}>{telephone}</p>
      </div>
    </footer>
  );
};
