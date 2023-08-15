import styles from './TelegramButton.module.scss';
import IconTelegram from '../../assets/icons/telegram_btn.svg';
import { Modal } from '../Modal/Modal';

const TelegramButton = () => {
  return (
    <Modal.window className={styles.container}>
      <a className={styles.button} href="https://t.me/shifmash_bot">
        <img
          src={IconTelegram}
          alt="telegram_bot"
          className={styles.telegram_icon}
        />
        <div className={styles.shadow}>
          <span className={styles.telegram_span}>Телеграм бот</span>
        </div>
      </a>
    </Modal.window>
  );
};

export default TelegramButton;
