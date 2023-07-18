import { ciphersInfo } from './AboutCiphers.constants';
import styles from './AboutCiphers.module.scss';
import Flipped from '../Flipped/Flipped';

const AboutCiphers = () => {
  return (
    <section className={styles.aboutCiphers} id="aboutCiphers">
      <h2 className={styles.aboutCiphers_title}>О шифрах</h2>
       <Flipped ciphersInfo={ciphersInfo}/>
    </section>
  );
};

export default AboutCiphers;
