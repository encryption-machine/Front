import styles from './UserHistory.module.scss';
import { AccordionHistory } from '../AccordionHistory/AccordionHistory';

export const UserHistory = () => {
  return (
    <section className={styles.userHistory}>
      <div className={styles.container}>
        <h2 className={styles.title}>История</h2>
        <div className={styles.table}>
          <ul className={styles.header}>
            <li>Дата</li>
            <li>Процесс преобразования</li>
            <li>Метод преобразования</li>
            <li>Секретный ключ</li>
          </ul>
          <hr className={styles.hr} />
          <AccordionHistory />
        </div>
      </div>
    </section>
  );
};
