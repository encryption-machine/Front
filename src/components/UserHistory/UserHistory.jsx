import styles from './UserHistory.module.scss';
import { AccordionHistory } from '../AccordionHistory/AccordionHistory';

export const UserHistory = () => {
  return (
    <section className={styles.userHistory}>
      <div className={styles.container}>
        <h2 className={styles.title}>История</h2>
        <div className={styles.table}>
          <ul className={styles.header}>
            <li className={styles.header_date}>Дата</li>
            <li className={styles.header_is_encryption}>
              Процесс преобразования
            </li>
            <li className={styles.header_algorithm}>Метод преобразования</li>
            <li className={styles.header_key}>Секретный ключ</li>
          </ul>
          <AccordionHistory />
        </div>
      </div>
    </section>
  );
};
