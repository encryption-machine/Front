import { ciphersInfo } from './AboutCiphers.constants';
import styles from './AboutCiphers.module.scss';

const AboutCiphers = () => {
  return (
    <section className={styles.aboutCiphers}>
      <h2 className={styles.aboutCiphers_title}>О шифрах</h2>
      <div>
        {ciphersInfo.map(({ id, name, description }) => (
          <div className={styles.aboutCiphers_cipher} key={id}>
            <h3 className={styles.aboutCiphers_name}>{name}</h3>
            <p className={styles.aboutCiphers_description}>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutCiphers;
