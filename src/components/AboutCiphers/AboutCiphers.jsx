import { useState } from 'react';
import { ciphersInfo } from './AboutCiphers.constants';
import styles from './AboutCiphers.module.scss';
import SvgSelector from '../SvgSelector/SvgSelector';
import CheckMark from '../CheckMark/CheckMark';

const AboutCiphers = () => {
  const [isOpen, setIsOpen] = useState(null);

  const handleOpen = (id) => {
    if (isOpen === id) {
      return setIsOpen(null);
    }
    setIsOpen(id);
  };

  return (
    <section className={styles.aboutCiphers} id="aboutCiphers">
      <h2 className={styles.aboutCiphers_title}>О шифрах</h2>
      <ul>
        {ciphersInfo.map(({ id, name, description }) => (
          <li
            className={styles.aboutCiphers_ciphers}
            key={id}
            onClick={() => handleOpen(id)}
          >
            <div className={styles.aboutCiphers_cipher}>
              <div className={styles.aboutCiphers_svg}>
                <SvgSelector name={name} />
              </div>
              <h3 className={styles.aboutCiphers_name}>{name}</h3>
              <div className={styles.aboutCiphers_svg}>
                <CheckMark />
              </div>
            </div>

            <p
              className={
                isOpen === id
                  ? styles.aboutCiphers_description_show
                  : styles.aboutCiphers_description
              }
            >
              {description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutCiphers;
