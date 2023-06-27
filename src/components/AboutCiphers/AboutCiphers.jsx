import { useEffect, useRef, useState } from 'react';
import { ciphersInfo } from './AboutCiphers.constants';
import styles from './AboutCiphers.module.scss';
import SvgSelector from '../SvgSelector/SvgSelector';
import CheckMark from '../CheckMark/CheckMark';

const AboutCiphers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cipherRef = useRef(null);

  const handleOpen = (event, id) => {
    event.preventDefault();
    // console.log(cipherRef.current);
    console.log(id);
    console.log(event.currentTarget.id);
    console.log(cipherRef.current);
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.aboutCiphers} id="aboutCiphers">
      <h2 className={styles.aboutCiphers_title}>О шифрах</h2>
      <ul>
        {ciphersInfo.map(({ id, name, description }) => (
          <li 
            ref={cipherRef} className={styles.aboutCiphers_ciphers}
            key={id} onClick={e=>handleOpen(e, id)}
          >
            <div  className={styles.aboutCiphers_cipher} >
              <div className={styles.aboutCiphers_svg}>
                <SvgSelector name={name} />
              </div>
              <h3 className={styles.aboutCiphers_name}>{name}</h3>
              <div className={styles.aboutCiphers_svg} >
                <CheckMark />
              </div>
            </div>
            {isOpen &&  (
              <p className={styles.aboutCiphers_description}>{description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AboutCiphers;
