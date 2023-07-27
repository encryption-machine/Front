import styles from './AboutCiphers.module.scss';
import Flipped from '../Flipped/Flipped';

const AboutCiphers = () => {
  return (
    <section className={styles.aboutCiphers} id="aboutCiphers">
      <div className={styles.aboutCiphers_content}>
        <h2 className={styles.aboutCiphers_title}>О шифрах</h2>
        <Flipped />
      </div>
    </section>
  );
};

export default AboutCiphers;
