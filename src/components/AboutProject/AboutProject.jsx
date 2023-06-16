import { aboutProjectInfo } from './AboutProject.constants';
import styles from './AboutProject.module.scss';

const AboutProject = () => {
  return (
    <section className={styles.aboutProject}>
      <h1 className={styles.aboutProject_title}>О проекте</h1>
      <p className={styles.aboutProject_subtitle}>
        Шифровальная машина — это бесплатный сервис по шифрованию текста. С его
        помощью вы можете преобразовать своё послание за считанные секунды.{' '}
      </p>
      <ul className={styles.aboutProject_items}>
        {aboutProjectInfo.map(({ id, titleItem, description }) => (
          <li className={styles.aboutProject_item} key={id}>
            <div className={styles.aboutProject_image}></div>
            <div>
              <h3 className={styles.aboutProject_titleItem}>{titleItem}</h3>
              <p className={styles.aboutProject_description}>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};


export default AboutProject ;
