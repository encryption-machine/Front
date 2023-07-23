import { AccordionHistoryItem } from '../AccordionHistoryItem/AccordionHistoryItem';
import styles from './AccordionHistory.module.scss';

export const AccordionHistory = () => {
  return (
    <ul className={styles.accordionHistory}>
      <AccordionHistoryItem />
    </ul>
  );
};
