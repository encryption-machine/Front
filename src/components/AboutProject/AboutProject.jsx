import styles from './AboutProject.module.scss';

function AboutProject() {
  return (
    <section className={styles.about}>
      <div className={styles.about__frame}>
        <div className={styles.about__container}>
          <h1 className={styles.about__title}>О проекте</h1>
          <p className={styles.about__subtitle}>Шифровальная машина — это бесплатный сервис по шифрованию текста. С его помощью вы можете преобразовать своё послание за считанные секунды. </p>
          <ul className={styles.about__items}>
            <li className={styles.about__item}>
              <h3 className={styles.about__titleItem}>Безопасность и</h3>
              <h3 className={styles.about__titleItem}>конфеденциальность</h3>
              <p className={styles.about__description}>Сайт обеспечивает защиту ваших конфиденциальных данных и сообщений, обеспечивая безопасность передачи и хранения информации.</p>
            </li>
            <li className={styles.about__item}>
              <h3 className={styles.about__titleItemSecond}>Изучение и</h3>
              <h3 className={styles.about__titleItemSecond}>творчество</h3>
              <p className={styles.about__description}>Использование сайта позволяет изучать различные языки шифрования, расширять знания в области криптографии и использовать шифрование для создания загадок и головоломок.</p>
            </li>
            <li className={styles.about__item}>
              <h3 className={styles.about__titleItem}>Удобство и</h3>
              <h3 className={styles.about__titleItem}>доступность</h3>
              <p className={styles.about__description}>Удобство и доступность: Сайт предоставляет удобный и доступный способ шифрования текста, не требующий установки дополнительного программного обеспечения.</p>
            </li>
            <div className={styles.about__square}></div>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;